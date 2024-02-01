import {ChevronDownIcon} from "@chakra-ui/icons"
import {Button, HStack, Menu, MenuButton, MenuItemOption, MenuList, MenuOptionGroup, Tag, Text} from "@chakra-ui/react"
import {useAuth} from "hooks/useAuth"

interface OrderRegionFilterProps {
    value: any
    onChange: (newValue: string) => void
}

export function OrderRegionFilter({value, onChange}: OrderRegionFilterProps) {
    const { isSupplier } = useAuth()
    if (isSupplier) return null
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
                    <MenuItemOption value="AU">AU</MenuItemOption>
                    <MenuItemOption value="NZ">NZ</MenuItemOption>
                    <MenuItemOption value="UK">UK</MenuItemOption>
                </MenuOptionGroup>
            </MenuList>
        </Menu>
    )
}

export default OrderRegionFilter
