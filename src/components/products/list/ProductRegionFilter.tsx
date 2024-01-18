import { ChevronDownIcon } from "@chakra-ui/icons"
import { Button, HStack, Menu, MenuButton, MenuItemOption, MenuList, MenuOptionGroup, Tag, Text } from "@chakra-ui/react"
import { FC } from "react"

interface IProductRegionFilter {
    value: any
    onChange: (newValue: any) => void
}

const ProductRegionFilter: FC<IProductRegionFilter> = ({ value, onChange }) => {
    return (
        <Menu>
            <MenuButton as={Button} variant="outline">
                <HStack alignContent="center" h="100%">
                    <Text>Region</Text>
                    <Tag colorScheme="default">{value && value.length ? value : "Any"}</Tag>
                    <ChevronDownIcon />
                </HStack>
            </MenuButton>
            <MenuList>
                <MenuOptionGroup defaultValue={value} title="Filter by region" type="radio" onChange={onChange}>
                    <MenuItemOption value={""}>Any</MenuItemOption>
                    <MenuItemOption value="AU Site">AU</MenuItemOption>
                    <MenuItemOption value="NZ Site">NZ</MenuItemOption>
                    <MenuItemOption value="UK Site">UK</MenuItemOption>
                </MenuOptionGroup>
            </MenuList>
        </Menu>
    )
}

export default ProductRegionFilter
