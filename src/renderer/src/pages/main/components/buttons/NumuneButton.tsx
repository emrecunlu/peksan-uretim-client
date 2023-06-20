import RightButton from '@/components/buttons/RightButton'
import PasswordEntryModal from '@/components/modals/entry/PasswordEntryModal'
import { useEmployee } from '@/store/features/employee'
import ProductionHelper from '@/utils/helpers/ProductionHelper'
import { ProductionType } from '@/utils/interfaces/enums/ProductionType'
import { useState } from 'react'

const NumuneButton = () => {
  const [dialog, setDialog] = useState<boolean>(false)

  const { workOrder } = useEmployee()

  const handleClose = (password: string) => {
    ProductionHelper.login(password, ProductionType.Numune, workOrder?.yapkod ?? '')
    setDialog(false)
  }

  return (
    <>
      <PasswordEntryModal open={dialog} onClose={handleClose} />
      <RightButton onClick={() => setDialog(true)} value={ProductionType.Numune}>
        NUMUNE
      </RightButton>
    </>
  )
}

export default NumuneButton
