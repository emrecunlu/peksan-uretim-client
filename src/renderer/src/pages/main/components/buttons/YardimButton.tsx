import BottomButton from '@/components/buttons/BottomButton'
import HelpFormModal from '@/components/modals/help/HelpFormModal'
import { useState } from 'react'
import { MdHelpOutline } from 'react-icons/md'

const YardimButtom = () => {
  const [dialog, setDialog] = useState<boolean>(false)

  return (
    <>
      {dialog && <HelpFormModal onClose={() => setDialog(false)} open={dialog} />}
      <BottomButton
        onClick={() => setDialog(true)}
        icon={<MdHelpOutline size={32} />}
        color="secondary"
      >
        YARDIM
      </BottomButton>
    </>
  )
}

export default YardimButtom
