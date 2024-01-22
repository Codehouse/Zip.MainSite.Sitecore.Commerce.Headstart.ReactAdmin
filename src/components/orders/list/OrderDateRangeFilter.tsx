import { ChevronDownIcon } from "@chakra-ui/icons"
import { Button, HStack, Menu, MenuButton, MenuItemOption, MenuList, MenuOptionGroup, Tag, Text } from "@chakra-ui/react"
import { useAuth } from "hooks/useAuth"

interface OrderDateRangeFilterProps {
    value: any
    onChange: (value: string) => void
}

function fromDays(days: number) {
    const date = new Date();
    date.setDate(date.getDate() + days);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Adding 1 and padding with '0'    
    const day = date.getDate().toString().padStart(2, '0'); // Padding with '0'    
    return year + "-" + month + "-" + day;
}

function fromYear(years: number) {
    const date = new Date();
    date.setFullYear(date.getFullYear() + years);
    return date.getFullYear() + "-01-01";
}

export function OrderDateRangeFilter({ value, onChange }: OrderDateRangeFilterProps) {
    const { isSupplier } = useAuth()
    if (isSupplier) return null
    return (
        <Menu>
            <MenuButton as={Button} py={0} variant="outline">
                <HStack alignContent="center" h="100%">
                    <Text>Date Range</Text>
                    <Tag colorScheme="default">{value && value.length ? value : "Any"}</Tag>
                    <ChevronDownIcon />
                </HStack>
            </MenuButton>
            <MenuList>
                <MenuOptionGroup defaultValue={value} title="Filter by order date range" type="radio" onChange={onChange}>
                    <MenuItemOption value={""}>Any</MenuItemOption>
                    <MenuItemOption value={fromDays(-30)}>30 Days</MenuItemOption>
                    <MenuItemOption value={fromDays(-60)}>60 Days</MenuItemOption>
                    <MenuItemOption value={fromDays(-90)}>90 Days</MenuItemOption>
                    <MenuItemOption value={fromYear(0)}>This Year</MenuItemOption>
                    <MenuItemOption value={fromYear(-1)}>Last Year</MenuItemOption>
                </MenuOptionGroup>
            </MenuList>
        </Menu >
    )
}

export default OrderDateRangeFilter
