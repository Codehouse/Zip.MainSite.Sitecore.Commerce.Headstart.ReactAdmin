import { ChevronDownIcon } from "@chakra-ui/icons"
import { Button, HStack, Menu, MenuButton, MenuItemOption, MenuList, MenuOptionGroup, Tag, Text } from "@chakra-ui/react"
import { FC } from "react"

interface IProductCategoryFilter {
    value: any
    onChange: (newValue: any) => void
}

const ProductCategoryFilter: FC<IProductCategoryFilter> = ({ value, onChange }) => {
    return (
        <Menu>
            <MenuButton as={Button} variant="outline">
                <HStack alignContent="center" h="100%">
                    <Text>Category</Text>
                    <Tag colorScheme="default">{value && value.length ? value : "Any"}</Tag>
                    <ChevronDownIcon />
                </HStack>
            </MenuButton>
            <MenuList>
                <MenuOptionGroup defaultValue={value} title="Filter by category" type="radio" onChange={onChange}>
                    <MenuItemOption value={""}>Any</MenuItemOption>
                    <MenuItemOption value="Uk Site>Chilled Water">Chilled Water</MenuItemOption>
                    <MenuItemOption value="Uk Site>Filters and CO2 Cartridges">Filters and CO2 Cartridges</MenuItemOption>
                    <MenuItemOption value="Uk Site>Hot Water">Hot Water</MenuItemOption>
                    <MenuItemOption value="Uk Site>Hot Water Accessories">Hot Water Accessories</MenuItemOption>
                    <MenuItemOption value="Uk Site>HydroChill">HydroChill</MenuItemOption>
                    <MenuItemOption value="Uk Site>HydroChill Accessories">HydroChill Accessories</MenuItemOption>
                    <MenuItemOption value="Uk Site>HydroTap Accessories">HydroTap Accessories</MenuItemOption>
                </MenuOptionGroup>
            </MenuList>
        </Menu>
    )
}

export default ProductCategoryFilter
