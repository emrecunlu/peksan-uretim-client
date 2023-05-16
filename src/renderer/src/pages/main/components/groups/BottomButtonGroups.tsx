import { Box } from '@mui/material'
import UygunsuzUrunButton from '../buttons/UygunsuzUrunButton'
import UretilenKolilerButton from '../buttons/UretilenKolilerButton'
import UretButton from '../buttons/UretButton'
import YardimButtom from '../buttons/YardimButton'

const BottomButtonGroups = () => {
  return (
    <Box sx={{ height: 100, p: 2, display: 'flex', justifyContent: 'space-between', gap: 3 }}>
      <UygunsuzUrunButton />
      <UretilenKolilerButton />
      <UretButton />
      <YardimButtom />
    </Box>
  )
}

export default BottomButtonGroups
