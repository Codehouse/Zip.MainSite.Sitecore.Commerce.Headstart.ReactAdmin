import {Box, Code, Container, Tag, Text, useDisclosure} from "@chakra-ui/react"
import Link from "next/link"
import {Promotions} from "ordercloud-javascript-sdk"
import {useCallback, useEffect, useState} from "react"
import {IOrder} from "types/ordercloud/IOrder"
import {dateHelper} from "utils"
import {DataTableColumn} from "../../shared/DataTable/DataTable"
import ListView, {ListViewGridOptions, ListViewTableOptions} from "../../shared/ListView/ListView"
import PromoRedemptionListActionMenu from "./PromoRedemptionListActionMenu"
import PromoRedemptionListToolbar from "./PromoRedemptionListToolbar"
import {promoRedemptionService} from "services/promoredemption.service"
import {IPromoRedemption} from "types/ordercloud/IPromoRedemption"
import {endOfToday, endOfWeek, endOfYesterday, startOfMonth, startOfToday, startOfWeek, startOfYesterday, subWeeks} from "date-fns"

const PromoRedemptionQueryMap = {
}

const PromoRedemptionFilterMap = {
}

const RegionColumn: DataTableColumn<IPromoRedemption> = {
  header: "Region",
  accessor: "Region",
  width: "10%",
  cell: ({value}) => (
    <Text noOfLines={2} wordBreak="break-all" title={value}>
      {value}
    </Text>
  ),
  sortable: true
}
const NameColumn: DataTableColumn<IPromoRedemption> = {
  header: "Name",
  accessor: "Name",
  width: "15%",
  cell: ({value}) => (
    <Text noOfLines={2} title={value}>
      {value}
    </Text>
  ),
  sortable: true
}
const CodeColumn: DataTableColumn<IPromoRedemption> = {
  header: "Code",
  accessor: "Code",
  width: "15%",
  cell: ({value}) => (
    <Text noOfLines={3} fontSize="sm" title={value}>
      {value || "N/A"}
    </Text>
  ),
  sortable: true
}

const NoofRedemptionColumn: DataTableColumn<IPromoRedemption> = {
  header: "Code",
  accessor: "Code",
  width: "15%",
  cell: ({value}) => (
    <Text noOfLines={2} title={value}>
      {value}
    </Text>
  ),
  sortable: true
}

const PromotionTableOptions: ListViewTableOptions<IPromoRedemption> = {
  responsive: {
    base: [RegionColumn, CodeColumn, NoofRedemptionColumn],
    md: [RegionColumn, CodeColumn, NoofRedemptionColumn],
    lg: [RegionColumn, NameColumn, CodeColumn, NoofRedemptionColumn],
    xl: [RegionColumn, NameColumn, CodeColumn, NoofRedemptionColumn],
    "2xl": [RegionColumn, NameColumn, CodeColumn, NoofRedemptionColumn]
  }
}

const resolvePromotionDetailHref = () => {
  return `/promotions`
}

const renderPromotionActionsMenu = () => { 
    return (<></>)
}

const PromoRedemptionList = () => {
  const region = "Au-Site";

  const now = new Date()
  const previousWeek = subWeeks(now, 1)
  const startOfPreviousWeekIso = startOfWeek(previousWeek).toISOString()
  const endOfPreviousWeekIso = endOfToday().toISOString()

  return (
    <>
    {console.log(promoRedemptionService.getOrdersWithPromoForRange(region, startOfPreviousWeekIso, endOfPreviousWeekIso))}
    </>
  )
}

export default PromoRedemptionList
