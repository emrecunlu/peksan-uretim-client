import RightButton from '@/components/buttons/RightButton'
import PasswordEntryModal from '@/components/modals/entry/PasswordEntryModal'
import { useEmployee } from '@/store/features/employee'
import ProductionHelper from '@/utils/helpers/ProductionHelper'
import { ProductionType } from '@/utils/interfaces/enums/ProductionType'
import { useState } from 'react'

const FireButton = () => {
  const [dialog, setDialog] = useState<boolean>(false)

  const { workOrder } = useEmployee()

  const handleClose = (password: string) => {
    ProductionHelper.login(password, ProductionType.Fire, workOrder?.yapkod ?? '')
    setDialog(false)
  }

  return (
    <>
      <PasswordEntryModal open={dialog} onClose={handleClose} />
      <RightButton
        disabled={ProductionHelper.isRenkGecisi(workOrder?.yapkod ?? '')}
        onClick={() => setDialog(true)}
        value={ProductionType.Fire}
      >
        FİRE
      </RightButton>
    </>
  )
}

export default FireButton
