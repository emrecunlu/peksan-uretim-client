import RightButton from '@/components/buttons/RightButton'
import PasswordEntryModal from '@/components/modals/entry/PasswordEntryModal'
import ProductionHelper from '@/utils/helpers/ProductionHelper'
import { ProductionType } from '@/utils/interfaces/enums/ProductionType'
import { useState } from 'react'

const FireButton = () => {
  const [dialog, setDialog] = useState<boolean>(false)

  const handleClose = (password: string) => {
    ProductionHelper.login(password, ProductionType.Fire)
    setDialog(false)
  }

  return (
    <>
      <PasswordEntryModal open={dialog} onClose={handleClose} />
      <RightButton onClick={() => setDialog(true)} value={ProductionType.Fire}>
        FİRE
      </RightButton>
    </>
  )
}

export default FireButton
