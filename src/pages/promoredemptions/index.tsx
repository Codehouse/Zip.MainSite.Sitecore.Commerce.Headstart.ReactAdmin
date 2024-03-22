import PromoRedemptionList from "@/components/promoredemptions/list/PromoRedemptionList"
import ProtectedContent from "components/auth/ProtectedContent"
import {appPermissions} from "config/app-permissions.config"

const ProtectedPromoRedemptions = () => {
  return (
    <ProtectedContent hasAccess={[appPermissions.PromotionViewer, appPermissions.PromotionManager]}>
      <PromoRedemptionList />
    </ProtectedContent>
  )
}

export default ProtectedPromoRedemptions
