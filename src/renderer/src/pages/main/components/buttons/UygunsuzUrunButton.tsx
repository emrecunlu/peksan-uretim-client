import BottomButton from '@/components/buttons/BottomButton'
import { MdSmsFailed } from 'react-icons/md'
import { red } from '@mui/material/colors'

const UygunsuzUrunButton = () => {
  return (
    <>
      <BottomButton
        sx={{
          bgcolor: red[800],
          '&:hover': {
            bgcolor: red[600]
          }
        }}
        icon={<MdSmsFailed size={32} />}
      >
        Uygunsuz Ürün
      </BottomButton>
    </>
  )
}

export default UygunsuzUrunButton
