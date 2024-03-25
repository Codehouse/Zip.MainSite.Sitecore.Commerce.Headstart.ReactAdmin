import { ChevronDownIcon } from "@chakra-ui/icons"
import { Button, HStack, Menu, MenuButton, MenuItemOption, MenuList, MenuOptionGroup, Skeleton, Tag, Text } from "@chakra-ui/react"
import { FC, useEffect, useMemo, useState } from "react"
import { debounce } from "lodash"
import { Catalogs } from "ordercloud-javascript-sdk"
import { ICatalog } from "types/ordercloud/ICatalog"

interface DashboardRegionFilter {
    value: any
    onChange: (newValue: any) => void
}

interface IOptions {
    id: string;
    name: string;
}

const DashboardRegionFilter: FC<DashboardRegionFilter> = ({ value, onChange }) => {

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

    function customOnChange(value: string): void {
        let catalogId = value?.split(":", 1)[0];
        sessionStorage.setItem("catalogId", catalogId);
        onChange(value?.split(":", 1)[0])
    }

    return (
        <Menu>
            <MenuButton as={Button} variant="outline">
                <HStack alignContent="center" h="100%">
                    <Text>Region</Text>
                    <Skeleton isLoaded={!loading}>
                        <Tag colorScheme="default">{value && value.length ? value : "Any"}</Tag>
                        <ChevronDownIcon />
                    </Skeleton>
                </HStack>
            </MenuButton>

            <MenuList>
                <MenuOptionGroup defaultValue={value} title="Filter by region" type="radio" onChange={customOnChange}>
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

export default DashboardRegionFilter
