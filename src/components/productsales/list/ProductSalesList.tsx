import {DataTableColumn} from "@/components/shared/DataTable/DataTable"
import ListView, {ListViewTableOptions} from "@/components/shared/ListView/ListView"
import {Box, Container, Text, useDisclosure} from "@chakra-ui/react"
import {LineItems, OrderDirection, Orders} from "ordercloud-javascript-sdk"
import {FC, useCallback, useEffect, useState} from "react"
import {ILineItem} from "types/ordercloud/ILineItem"
import {dateHelper, priceHelper} from "utils"
import {useAuth} from "hooks/useAuth"
import axios from 'axios';
import Cookies from "universal-cookie"
import ocConfig from "config/ordercloud-config"


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

  const token = cookies.get("ordercloud.access-token");
  const baseApiUrl = ocConfig.baseApiUrl;

  const createData = (lineItem: LineItem) => {
    return { ...lineItem };
};

  useEffect(() => {
    async function fetchFilters() {
        try {
            const response = await axios.get(`${baseApiUrl}/v1/lineitems/Incoming?Order.DateSubmitted=>=2024-01-01&Order.DateSubmitted=<=2024-03-18&pageSize=100`, { headers: {"Authorization" : `Bearer ${token}`}}); //Order.xp.Catalog=region
            const lineItemData: LineItem[] = response.data.Items.map((item: LineItem) => createData(item));
            setOriginalRows(lineItemData);
        } catch (error) {
            console.error('Error fetching filters', error);
        }
    }

    fetchFilters();
}, []);

 
  return (
    <>{
      console.log(originalRows)}</>
  )
}

export default ProductSalesList