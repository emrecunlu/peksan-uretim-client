import RightButton from '@/components/buttons/RightButton'
import { RIGHT_MENU_WIDTH } from '@/utils/constants'
import { ProductionType } from '@/utils/interfaces/enums/ProductionType'
import { Box } from '@mui/material'
import UretimButton from '../buttons/UretimButton'
import NumuneButton from '../buttons/NumuneButton'
import FireButton from '../buttons/FireButton'

const RightButtonGroups = () => {
  return (
    <Box
      sx={{
        width: RIGHT_MENU_WIDTH,
        height: '100%',
        display: 'flex',
        gap: 2,
        flexDirection: 'column',
        p: 2
      }}
    >
      <UretimButton />
      <NumuneButton />
      <FireButton />
    </Box>
  )
}

export default RightButtonGroups
