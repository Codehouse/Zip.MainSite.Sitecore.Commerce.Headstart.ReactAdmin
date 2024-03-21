import ProductSalesList from "@/components/productsales/list/ProductSalesList"
import ProtectedContent from "components/auth/ProtectedContent"
import {appPermissions} from "config/app-permissions.config"

const ProtectedProductSalesPage = () => (
  <ProtectedContent hasAccess={[appPermissions.OrderViewer, appPermissions.OrderManager]}>
    <ProductSalesList />
  </ProtectedContent>
)

export default ProtectedProductSalesPage
