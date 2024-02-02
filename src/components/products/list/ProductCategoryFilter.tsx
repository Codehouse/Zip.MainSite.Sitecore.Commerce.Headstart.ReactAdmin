import {ChevronDownIcon} from "@chakra-ui/icons"
import {Button, HStack, Menu, MenuButton, MenuItemOption, MenuItemOptionProps, MenuList, MenuOptionGroup, Skeleton, Tag, Text} from "@chakra-ui/react"
import {debounce, isEmpty} from "lodash"
import {Categories} from "ordercloud-javascript-sdk"
import {FC, useEffect, useMemo, useState} from "react"
import {ICategory} from "types/ordercloud/ICategoryXp"

interface IProductCategoryFilter {
    value: any
    catalogId: any
    onChange: (newValue: any) => void
}

interface IOptions {
    id: string;
    name: string;
}

const ProductCategoryFilter: FC<IProductCategoryFilter> = ({value, catalogId, onChange}) => {

    const [options, setOptions] = useState<IOptions[]>([])
    const [loading, setLoading] = useState(true)

    const loadCatalogs = useMemo(
        () =>
            debounce(async () => {
                try {
                    setLoading(true)
                    if (catalogId != undefined && !isEmpty(catalogId)) {
                        const allCatalogs = await Categories.List<ICategory>(catalogId)
                        setOptions(allCatalogs.Items.map((catalog) => ({id: catalog.ID, name: catalog.Name})))
                    }
                    else {
                        setOptions([])
                    }
                } finally {
                    setLoading(false)
                }
            }, 500),
        [catalogId]
    )

    useEffect(() => {
        loadCatalogs()
    }, [loadCatalogs])

    return (
        <Menu>
            <MenuButton as={Button} variant="outline">
                <HStack alignContent="center" h="100%">
                    <Text>Category</Text>
                    <Skeleton isLoaded={!loading}>
                        <Tag colorScheme="default">{value && value.length ? value : "Any"}</Tag>
                        <ChevronDownIcon />
                    </Skeleton>
                </HStack>
            </MenuButton>
            <MenuList>
                <MenuOptionGroup defaultValue={value} title="Filter by category" type="radio" onChange={onChange}>
                    <MenuItemOption key={"Any"} value={""}>Any</MenuItemOption>

                    {Array(+options.length)
                        .fill("")
                        .map((n, i) => {
                            return <MenuItemOption key={options[i].id} value={options[i].name}>{options[i].name}</MenuItemOption>;
                        })}

                </MenuOptionGroup>
            </MenuList>
        </Menu>
    )
}

export default ProductCategoryFilter
