import {Box, Button, Stack} from "@chakra-ui/react"
import Link from "next/link"
import {FC} from "react"
import DebouncedSearchInput from "../../shared/DebouncedSearchInput/DebouncedSearchInput"
import {ListViewChildrenProps} from "../../shared/ListView/ListView"
import ListViewMetaInfo from "../../shared/ListViewMetaInfo/ListViewMetaInfo"
import PromoRedemptionListActions from "./PromoRedemptionListActions"
import ProtectedContent from "@/components/auth/ProtectedContent"
import {appPermissions} from "config/app-permissions.config"

interface PromotionListToolbarProps extends Omit<ListViewChildrenProps, "renderContent"> {}

const PromoRedemptionListToolbar: FC<PromotionListToolbarProps> = ({
  meta,
  viewModeToggle,
  updateQuery,
  filterParams,
  queryParams
}) => {
  return (
    <>
      <Stack direction="row" mb={5}>
        <Stack direction={["column", "column", "column", "row"]}>
          <DebouncedSearchInput
            label="Search promotions"
            value={queryParams["Search"]}
            onSearch={updateQuery("s", true)}
          />
          <Stack direction="row">
            <PromoRedemptionListActions />
          </Stack>
        </Stack>
        <Box as="span" flexGrow="1"></Box>
      </Stack>
    </>
  )
}

export default PromoRedemptionListToolbar
