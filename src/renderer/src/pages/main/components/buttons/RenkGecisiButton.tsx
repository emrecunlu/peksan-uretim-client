import RightButton from '@/components/buttons/RightButton'
import { useEmployee } from '@/store/features/employee'
import ProductionHelper from '@/utils/helpers/ProductionHelper'
import { ProductionType } from '@/utils/interfaces/enums/ProductionType'

const RenkGecisiButton = () => {
  const { workOrder } = useEmployee()

  return (
    <>
      <RightButton
        disabled={ProductionHelper.isRenkGecisi(workOrder?.yapkod ?? '', workOrder?.isemrino ?? '')}
        value={ProductionType.RenkGecisi}
      >
        RENK GEÇİŞİ
      </RightButton>
    </>
  )
}

export default RenkGecisiButton
