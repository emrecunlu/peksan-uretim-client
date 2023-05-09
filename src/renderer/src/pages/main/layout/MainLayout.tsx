import { useEmployee } from '@/store/features/employee'
import { Box } from '@mui/material'
import { Navigate, Outlet } from 'react-router-dom'
import WorkOrderInfoList from '@/pages/main/components/workorder/WorkOrderInfoList'
import Header from '@/pages/main/components/header/Header'
import RightButtonGroups from '@/pages/main/components/groups/RightButtonGroups'
import BottomButtonGroups from '@/pages/main/components/groups/BottomButtonGroups'

const MainLayout = () => {
  const { isLoggedIn } = useEmployee()

  if (!isLoggedIn) return <Navigate to="/auth/login" />

  return (
    <Box
      sx={{
        height: '100vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <Header />
      <Box sx={{ flexGrow: 1, overflow: 'hidden', display: 'flex' }}>
        <WorkOrderInfoList />
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'row' }}>
          <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <Box
              sx={{
                flex: 1,
                display: 'flex'
              }}
            >
              <Outlet />
            </Box>
            <Box sx={{ width: '100%' }}>
              <BottomButtonGroups />
            </Box>
          </Box>
          <Box>
            <RightButtonGroups />
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default MainLayout
