import { ChevronDownIcon } from "@chakra-ui/icons"
import { Button, HStack, Menu, MenuButton, MenuItemOption, MenuList, MenuOptionGroup, Skeleton, Tag, Text } from "@chakra-ui/react"
import { FC, useEffect, useMemo, useState } from "react"
import { debounce, isEmpty } from "lodash"
import { Categories } from "ordercloud-javascript-sdk"
import { ICategoryProductAssignment } from "types/ordercloud/ICategoryProductAssignment"

interface ProductCategoryFilter {
    value: any
    catalogId: any
    onChange: (newValue: any) => void
}

interface IOptions {
    id: string;
    name: string;
}

const ProductCategoryFilter: FC<ProductCategoryFilter> = ({ value, catalogId, onChange }) => {

    const [options, setOptions] = useState<IOptions[]>([])
    const [loading, setLoading] = useState(true)

    const loadCategories = useMemo(
        () =>
            debounce(async () => {
                try {
                    setLoading(true)
                    if (catalogId != undefined && !isEmpty(catalogId)) {
                        const allCategories = await Categories.List<ICategoryProductAssignment>(catalogId)
                        setOptions(allCategories.Items.map((category) => ({ id: category.ID, name: category.Name })))
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
        loadCategories()
    }, [loadCategories])

    function customOnChange(value: string): void {
        let categoryId = value?.split(":", 1)[0];
        sessionStorage.setItem("categoryId", categoryId);
        onChange(value?.split(":", 1)[0])
    }

    return (
        <Menu>
            <MenuButton as={Button} variant="outline">
                <HStack alignContent="center" h="100%">
                    <Text>Product Category</Text>
                    <Skeleton isLoaded={!loading}>
                        <Tag colorScheme="default">{value && value.length ? value : "Any"}</Tag>
                        <ChevronDownIcon />
                    </Skeleton>
                </HStack>
            </MenuButton>

            <MenuList>
                <MenuOptionGroup defaultValue={value} title="Filter by category" type="radio" onChange={customOnChange}>
                    <MenuItemOption key={"Any"} value={""}>Any</MenuItemOption>

                    {Array(+options.length)
                        .fill("")
                        .map((n, i) => {
                            return <MenuItemOption key={options[i].id} value={options[i].id + ":" + options[i].name}>{options[i].name}</MenuItemOption>;
                        })}

                </MenuOptionGroup>
            </MenuList>
        </Menu>
    )
}

export default ProductCategoryFilter
