import RightButton from '@/components/buttons/RightButton'
import { ProductionType } from '@/utils/interfaces/enums/ProductionType'

const UretimButton = () => {
  return (
    <>
      <RightButton value={ProductionType.Uretim}>ÜRETİM</RightButton>
    </>
  )
}

export default UretimButton
