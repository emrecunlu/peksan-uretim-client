import RightButton from '@/components/buttons/RightButton'
import { useEmployee } from '@/store/features/employee'
import ProductionHelper from '@/utils/helpers/ProductionHelper'
import { ProductionType } from '@/utils/interfaces/enums/ProductionType'

const UretimButton = () => {
  const { workOrder } = useEmployee()
  return (
    <>
      <RightButton
        disabled={!ProductionHelper.isRenkGecisi(workOrder?.yapkod ?? '', workOrder?.isemrino ?? '')}
        value={ProductionType.Uretim}
      >
        ÜRETİM
      </RightButton>
    </>
  )
}

export default UretimButton
