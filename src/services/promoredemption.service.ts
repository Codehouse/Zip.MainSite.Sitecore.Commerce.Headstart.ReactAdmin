import {appSettings} from "config/app-settings"
import {Orders} from "ordercloud-javascript-sdk"
import {IOrder} from "types/ordercloud/IOrder"
import {IOrderPromotion} from "types/ordercloud/IOrderPromotion"
import {PromoRedemption} from "types/ordercloud/IPromoRedemption"

import {endOfToday, endOfWeek, endOfYesterday, startOfMonth, startOfToday, startOfWeek, startOfYesterday, subWeeks} from "date-fns"
import {filter, uniq} from "lodash"
import pLimit from "p-limit"
import { resourceLimits } from "worker_threads"
const mockData = require("../mockdata/dashboard_data.json")

export const promoRedemptionService = {
    getOrdersWithPromoForRange,
}

async function getOrdersWithPromoForRange(region: string, startDate: string, endDate: string): PromoRedemption {

  const orderFilters = {
    filters: {
      'xp.CatalogID': region,
      'PromotionDiscount': `>0`
    },
    pageSize: 100
  }

  const orderPromoFilters = {
    pageSize: 100
  }

  const orders = await Orders.List<IOrder>("All", orderFilters);

  const filteredOrders = orders.Items.filter((order) => {
    return order.DateSubmitted >= startDate && order.DateSubmitted <= endDate
  })
    
  let orderPromotionList: PromoRedemption[] = [];

  filteredOrders.map((order) => {
    Orders.ListPromotions<IOrderPromotion>("Incoming", order.ID, orderPromoFilters)
      .then((result) => {
        result.Items.map((promotion) => {
          orderPromotionList.push({Code: promotion.Code, Name:promotion.Name, Region: region, NoofRedemption:1 })
      })
      })
  })

  console.log(orderPromotionList);

  return orderPromotionList;
}