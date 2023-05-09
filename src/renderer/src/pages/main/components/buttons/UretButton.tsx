import BottomButton from '@/components/buttons/BottomButton'
import { green } from '@mui/material/colors'
import { MdGavel } from 'react-icons/md'

const UretButton = () => {
  return (
    <>
      <BottomButton
        delay
        refreshTime={5000}
        sx={{ bgcolor: green[800], '&:hover': { bgcolor: green[600] }, '&:disabled': green[300] }}
        icon={<MdGavel size={32} />}
      >
        ÜRET
      </BottomButton>
    </>
  )
}

export default UretButton
