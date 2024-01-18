import { ChevronDownIcon } from "@chakra-ui/icons"
import { Button, HStack, Menu, MenuButton, MenuItemOption, MenuList, MenuOptionGroup, Tag, Text } from "@chakra-ui/react"
import { useAuth } from "hooks/useAuth"

interface OrderPaymentStatusFilterProps {
    value: any
    onChange: (newValue: string) => void
}

export function OrderPaymentStatusFilter({ value, onChange }: OrderPaymentStatusFilterProps) {
    const { isSupplier } = useAuth()
    if (isSupplier) return null
    return (
        <Menu>
            <MenuButton as={Button} py={0} variant="outline">
                <HStack alignContent="center" h="100%">
                    <Text>Payment Status</Text>
                    <Tag colorScheme="default">{value && value.length ? value : "Any"}</Tag>
                    <ChevronDownIcon />
                </HStack>
            </MenuButton>
            <MenuList>
                <MenuOptionGroup defaultValue={value} title="Filter by order payment status" type="radio" onChange={onChange}>
                    <MenuItemOption value={""}>Any</MenuItemOption>
                    <MenuItemOption value="Pending">Pending</MenuItemOption>
                    <MenuItemOption value="Paid">Paid</MenuItemOption>
                </MenuOptionGroup>
            </MenuList>
        </Menu>
    )
}

export default OrderPaymentStatusFilter
