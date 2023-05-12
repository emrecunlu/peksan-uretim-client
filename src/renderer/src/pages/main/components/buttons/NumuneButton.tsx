import RightButton from '@/components/buttons/RightButton'
import PasswordEntryModal from '@/components/modals/entry/PasswordEntryModal'
import ProductionHelper from '@/utils/helpers/ProductionHelper'
import { ProductionType } from '@/utils/interfaces/enums/ProductionType'
import { useState } from 'react'

const NumuneButton = () => {
  const [dialog, setDialog] = useState<boolean>(false)

  const handleClose = (password: string) => {
    ProductionHelper.login(password, ProductionType.Numune)
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
