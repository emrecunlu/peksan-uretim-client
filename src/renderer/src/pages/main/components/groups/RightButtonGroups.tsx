import { RIGHT_MENU_WIDTH } from '@/utils/constants'
import { Box } from '@mui/material'
import UretimButton from '../buttons/UretimButton'
import NumuneButton from '../buttons/NumuneButton'
import FireButton from '../buttons/FireButton'
import YarimKoliButton from '../buttons/YarimKoliButon'
import RenkGecisiButton from '../buttons/RenkGecisiButton'

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
      <YarimKoliButton />
      <RenkGecisiButton />
    </Box>
  )
}

export default RightButtonGroups
