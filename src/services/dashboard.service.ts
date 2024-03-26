import { appSettings } from "config/app-settings"
import { Orders, Products, Promotions } from "ordercloud-javascript-sdk"
import { IOrder } from "types/ordercloud/IOrder"
import { endOfToday, endOfWeek, endOfYesterday, startOfMonth, startOfToday, startOfWeek, startOfYesterday, subWeeks } from "date-fns"
import { filter, uniq } from "lodash"
import pLimit from "p-limit"
import { getDateForRegion, getTimezoneForRegion } from "utils/getDateForRegion"
const mockData = require("../mockdata/dashboard_data.json")

export const dashboardService = {
  getTodaysMoney,
  getPreviousTodaysMoney,
  getWeeklySales,
  getPreviousWeeklySales,
  getWeekUniqueUsers,
  getPreviousWeekUniqueUsers,
  listAllOrdersSincePreviousWeek,
  getTotalPromosCount,
  getTotalProductsCount
}

function getTodaysMoney(orders: IOrder[], region: string): number {
  if (!appSettings.useRealDashboardData) {
    return mockData.todaysmoney.totalamount
  }
  const { start, end } = getDateForRegion({ startDate: startOfToday(), endDate: endOfToday(), region: getTimezoneForRegion(region) });

  return getTotalSalesForRange(orders, region, start, end)
}

function getPreviousTodaysMoney(orders: IOrder[], region: string): number {
  if (!appSettings.useRealDashboardData) {
    return mockData.todaysmoney.previoustotalamount
  }
  // const startOfYesterdayIso = startOfYesterday().toISOString()
  // const endOfYesterdayIso = endOfYesterday().toISOString()
  const { start, end } = getDateForRegion({ startDate: startOfYesterday(), endDate: endOfYesterday(), region: getTimezoneForRegion(region) });

  return getTotalSalesForRange(orders, region, start, end)
}

function getWeeklySales(orders: IOrder[], region: string): number {
  if (!appSettings.useRealDashboardData) {
    return mockData.weeksales.totalamount
  }
  const now = new Date();
  // const startOfWeekIso = now.toISOString(); 
  // const endOfWeekIso = now.toISOString(); 
  const { start, end } = getDateForRegion({ startDate: now, endDate: now, region: getTimezoneForRegion(region) });
  return getTotalSalesForRange(orders, region, start, end)
}

function getPreviousWeeklySales(orders: IOrder[], region: string): number {
  if (!appSettings.useRealDashboardData) {
    return mockData.weeksales.previoustotalamount
  }
  const now = new Date()
  const previousWeek = subWeeks(now, 1)
  const startOfPreviousWeekIso = startOfWeek(previousWeek)
  const endOfPreviousWeekIso = endOfWeek(previousWeek)

  const { start, end } = getDateForRegion({ startDate: startOfPreviousWeekIso, endDate: endOfPreviousWeekIso, region: getTimezoneForRegion(region) });

  return getTotalSalesForRange(orders, region, start, end)
}

function getWeekUniqueUsers(orders: IOrder[], region: string): number { // TODO region filtering
  if (!appSettings.useRealDashboardData) {
    return mockData.uniqueusers.totalamount
  }
  const now = new Date()
  // const startOfWeekIso = startOfWeek(now).toISOString()
  // const endOfWeekIso = endOfWeek(now).toISOString()
  const { start, end } = getDateForRegion({ startDate: startOfWeek(now), endDate: endOfWeek(now), region: getTimezoneForRegion(region) });

  const userList = uniq(
    orders
      .filter((order) => {
        return order.DateSubmitted > start.toISOString() && order.DateSubmitted < end.toISOString()
      })
      .map((order) => order.FromUserID)
  )

  return userList.length
}

function getPreviousWeekUniqueUsers(orders: IOrder[], region: string): number {  // TODO region filtering
  if (!appSettings.useRealDashboardData) {
    return mockData.uniqueusers.previoustotalamount
  }
  const now = new Date()
  const previousWeek = subWeeks(now, 1)
  // const startOfPreviousWeekIso = startOfWeek(previousWeek).toISOString()
  // const endOfPreviousWeekIso = endOfWeek(previousWeek).toISOString()
  const { start, end } = getDateForRegion({ startDate: startOfWeek(previousWeek), endDate: endOfWeek(previousWeek), region: getTimezoneForRegion(region) });

  const userList = uniq(
    orders
      .filter((order) => {
        return order.DateSubmitted > start.toISOString() && order.DateSubmitted < end.toISOString()
      })
      .map((order) => order.FromUserID)
  )

  return userList.length
}

function getTotalSalesForRange(orders: IOrder[], region: string, startDate: Date, endDate: Date): number {

  const { start, end } = getDateForRegion({ startDate: startDate, endDate: endDate, region: getTimezoneForRegion(region) });

  const filteredRegionOrders = orders.filter((order) => {
    if (region) {
      return order?.xp?.CatalogID == region;
    }
  })

  const filteredOrders = filteredRegionOrders.filter((order) => {
    return order.DateSubmitted > start.toISOString() && order.DateSubmitted < end.toISOString()
  })


  const result = filteredOrders.reduce((accumulator, obj) => {
    return accumulator + obj.Total
  }, 0)

  return result;
}

async function getTotalPromosCount(region: string): Promise<number> {
  if (!appSettings.useRealDashboardData) {
    return mockData.totalpromos.totalamount
  }

  const filters = {
    filters: {
      //'xp.Catalogue': region
    }
  }

  const response = await Promotions.List(filters)
  return response.Meta.TotalCount
}

async function getTotalProductsCount(region: string): Promise<number> {
  if (!appSettings.useRealDashboardData) {
    return mockData.totalproducts.totalamount
  }

  const filters = {
    filters: {
      'catalogID': region
    }
  }

  const response = await Products.List(filters);

  return response.Meta.TotalCount
}

async function listAllOrdersSincePreviousWeek(region: string) {
  if (!appSettings.useRealDashboardData) {
    return {
      Meta: {
        TotalCount: 120
      }
    }
  }
  const now = new Date()
  const previousWeek = subWeeks(now, 1)
  // const startOfPreviousWeek = startOfWeek(previousWeek).toISOString()
  const { start, end } = getDateForRegion({ startDate: startOfWeek(previousWeek), endDate: startOfWeek(previousWeek), region: getTimezoneForRegion(region) });

  const filters = {
    sortBy: ["DateSubmitted" as "DateSubmitted"],
    filters: {
      DateSubmitted: `>${start.toISOString()}`,
      'xp.CatalogID': region
    },
    pageSize: 100
  }
  const response1 = await Orders.List<IOrder>("All", filters)
  if (response1.Meta.TotalPages <= 1) {
    return response1
  }

  // max allowed by Chrome for same domain
  // consider aggregating totals on server at some interval (daily or hourly) if this is too slow
  const maxConcurrent = 6
  const limitToMaxConcurrent = pLimit(maxConcurrent)
  const requests = new Array(response1.Meta.TotalPages - 1).fill("").map(async (_, i) =>
    limitToMaxConcurrent(() => {
      console.timeStamp(`Requesting page ${i + 2} of ${response1.Meta.TotalPages}`)
      return Orders.List("All", { ...filters, page: i + 2 })
    })
  )
  const responses = await Promise.all(requests)
  const allOrders = responses.reduce((accumulator, response) => {
    return accumulator.concat(response.Items)
  }, response1.Items)

  return {
    Meta: {
      Page: 1,
      PageSize: allOrders.length,
      TotalCount: allOrders.length,
      TotalPages: 1,
      ItemRange: [0, allOrders.length - 1]
    },
    Items: allOrders
  }
}
