import {ChevronDownIcon} from "@chakra-ui/icons"
import {Button, HStack, Menu, MenuButton, MenuItemOption, MenuList, MenuOptionGroup, Tag, Text} from "@chakra-ui/react"
import {useEffect, useMemo, useState} from "react"
import {debounce} from "lodash"
import {Catalogs} from "ordercloud-javascript-sdk"
import {ICatalog} from "types/ordercloud/ICatalog"

interface OrderRegionFilterProps {
    value: any
    onChange: (newValue: string) => void
}

interface IOptions {
    id: string;
    name: string;
}

export function OrderRegionFilter({value, onChange}: OrderRegionFilterProps) {
    
    const [options, setOptions] = useState<IOptions[]>([])
    const [loading, setLoading] = useState(true)

    const loadCatalogs = useMemo(
        () =>
            debounce(async () => {
                try {
                    setLoading(true)
                    const allCatalogs = await Catalogs.List<ICatalog>()
                    setOptions(allCatalogs.Items.map((catalog) => ({ id: catalog.ID, name: catalog.Name })))
                } finally {
                    setLoading(false)
                }
            }, 500),
        []
    )

    useEffect(() => {
        loadCatalogs()
    }, [loadCatalogs])

    return (
        <Menu>
            <MenuButton as={Button} py={0} variant="outline">
                <HStack alignContent="center" h="100%">
                    <Text>Region</Text>
                    <Tag colorScheme="default">{value && value.length ? value : "Any"}</Tag>
                    <ChevronDownIcon />
                </HStack>
            </MenuButton>
            <MenuList>
                <MenuOptionGroup defaultValue={value} title="Filter by order region" type="radio" onChange={onChange}>
                    <MenuItemOption value={""}>Any</MenuItemOption>

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

export default OrderRegionFilter
