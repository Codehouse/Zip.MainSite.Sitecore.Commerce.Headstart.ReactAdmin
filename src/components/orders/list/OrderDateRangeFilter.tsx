import { ChevronDownIcon } from "@chakra-ui/icons"
import { Button, HStack, Menu, MenuButton, MenuItemOption, MenuList, MenuOptionGroup, Tag, Text } from "@chakra-ui/react"
import { useAuth } from "hooks/useAuth"
import React from "react"

interface OrderDateRangeFilterProps {
    fromValue: any
    toValue: any
    rangeValue: any
    onChange: (value: string) => void
    updateQuery: (queryKey: string, resetPage?: boolean) => (value: string | boolean | number) => void
}

function fromDays(days: number) {
    const date = new Date();
    date.setDate(date.getDate() + days);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Adding 1 and padding with '0'    
    const day = date.getDate().toString().padStart(2, '0'); // Padding with '0'    
    return year + "-" + month + "-" + day + ":";
}

function thisYer() {
    const date = new Date();
    return date.getFullYear() + "-01-01:";
}

function lastYer() {
    const date = new Date();
    date.setFullYear(date.getFullYear() - 1);
    return date.getFullYear() + "-01-01" + ":" + date.getFullYear() + "-12-31";
}

var optionList = ["Any", "30 Days", "60 Days", "90 Days", "This Year", "Last Year"]

export function OrderDateRangeFilter({ fromValue, toValue, rangeValue, onChange, updateQuery }: OrderDateRangeFilterProps) {
    const { isSupplier } = useAuth()
    if (isSupplier) return null

    // set From
    var from = rangeValue?.split(":", 3)[1]
    if (fromValue !== from) {
        updateQuery("from", true)(from == "" ? undefined : from)
    }


    // set To    
    var to = rangeValue?.split(":", 3)[2]
    if (toValue !== to) {
        updateQuery("to", true)(to == "" ? undefined : to)
    }

    var selectedRange = optionList[rangeValue?.split(":", 1)]

    return (
        <Menu>
            <MenuButton as={Button} py={0} variant="outline">
                <HStack alignContent="center" h="100%">
                    <Text>Date Range</Text>
                    <Tag colorScheme="default">{selectedRange && selectedRange.length ? selectedRange : "Any"}</Tag>
                    <ChevronDownIcon />
                </HStack>
            </MenuButton>
            <MenuList>
                <MenuOptionGroup defaultValue={rangeValue} title="Filter by order date range" type="radio" onChange={onChange}>
                    <MenuItemOption value={"0::"}>{optionList[0]}</MenuItemOption>
                    <MenuItemOption value={"1:" + fromDays(-30)}>{optionList[1]}</MenuItemOption>
                    <MenuItemOption value={"2:" + fromDays(-60)}>{optionList[2]}</MenuItemOption>
                    <MenuItemOption value={"3:" + fromDays(-90)}>{optionList[3]}</MenuItemOption>
                    <MenuItemOption value={"4:" + thisYer()}>{optionList[4]}</MenuItemOption>
                    <MenuItemOption value={"5:" + lastYer()}>{optionList[5]}</MenuItemOption>
                </MenuOptionGroup>
            </MenuList>
        </Menu >
    )
}

export default OrderDateRangeFilter
