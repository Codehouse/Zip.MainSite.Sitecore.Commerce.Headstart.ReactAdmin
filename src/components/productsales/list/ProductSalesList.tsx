import {DataTableColumn} from "@/components/shared/DataTable/DataTable"
import ListView, {ListViewTableOptions} from "@/components/shared/ListView/ListView"
import {Box, Container, Text, useDisclosure, VStack, Flex, SimpleGrid} from "@chakra-ui/react"
import {LineItems, OrderDirection, Orders} from "ordercloud-javascript-sdk"
import {FC, useCallback, useEffect, useState} from "react"
import {ILineItem} from "types/ordercloud/ILineItem"
import {dateHelper, priceHelper} from "utils"
import {useAuth} from "hooks/useAuth"
import axios from 'axios';
import { NextSeo } from "next-seo"
import Cookies from "universal-cookie"
import ocConfig from "config/ordercloud-config"
import ProductCategoryFilter from "@/components/shared/OrderCloud/ProductCategoryFilter"
import DashboardRegionFilter from "@/components/dashboard/dashboardRegionFilter"

interface LineItem {
  OrderID: string;
  ProductID: string;
  Quantity: number;
  UnitPrice: number;
  PromotionDiscount: number;
  LineTotal: number;
  LineSubtotal: number;
  Product: { 
    Name: string; 
    xp: { 
      Catalogue: string; 
      ItemCode: string;
    }; 
  };
}

const ProductSalesList: FC = () => {
  const [actionOrder, setActionOrder] = useState<ILineItem>()
  const editDisclosure = useDisclosure()
  const deleteDisclosure = useDisclosure()
  const {isSupplier} = useAuth()
  const [originalRows, setOriginalRows] = useState<LineItem[]>([]);
  const cookies = new Cookies()
  const [region, setRegion] = useState('Au-Site')
  const [category, setCategory] = useState('')
  const token = cookies.get("ordercloud.access-token");
  const baseApiUrl = ocConfig.baseApiUrl;
  
  const handleRegionChange = (value) => {
    setRegion(value);
  };

  const handleCategoryChange = (value) => {
    setCategory(value);
  };

  const createData = (lineItem: LineItem) => {
    return { ...lineItem };
  };

  useEffect(() => {
    async function fetchFilters() {
        try {

            const response = await axios.get(`${baseApiUrl}/v1/lineitems/Incoming?Order.DateSubmitted=>=2024-01-01&Order.DateSubmitted=<=2024-03-24&pageSize=100&Order.xp.CatalogID=${region}`, { headers: {"Authorization" : `Bearer ${token}`}});
            const lineItemData: LineItem[] = response.data.Items.map((item: LineItem) => createData(item));
            setOriginalRows(lineItemData);
        } catch (error) {
            console.error('Error fetching filters', error);
        }
    }

    fetchFilters();
}, [region]);
 
  return (
    <>
    <NextSeo title="Dashboard" />
    <VStack flexGrow={1} gap={4} p={[4, 6, 8]} h="100%" w="100%" bg={"st.mainBackgroundColor"}>
      <Flex w="100%">
        <DashboardRegionFilter value={region} onChange={handleRegionChange} />
        <ProductCategoryFilter catalogId={region} value={category} onChange={handleCategoryChange} />
      </Flex>
    </VStack>
    {originalRows?.map((lineItem) => {
      console.log(lineItem.Product.Name, lineItem.Product.xp.ItemCode, lineItem.Quantity, lineItem.LineTotal)
      })}
    </>
  )
}

export default ProductSalesList