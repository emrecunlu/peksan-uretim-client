import React from 'react'
import { Box } from '@mui/material'
import RemainingList from '@/pages/main/components/remaining/RemainingList'
import ProductInputGroups from '@/pages/main/components/groups/ProductionInputGroups'

const MainPage: React.FC = () => {
  return (
    <Box
      sx={{
        p: 2,
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        gap: 4
      }}
    >
      <RemainingList />
      <Box sx={{ flex: 1, display: 'flex', alignItems: 'center' }}>
        <ProductInputGroups />
      </Box>
    </Box>
  )
}

export default MainPage
