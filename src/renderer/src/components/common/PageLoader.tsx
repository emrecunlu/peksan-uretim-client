import { Backdrop, CircularProgress } from '@mui/material'

interface IProps {
  isLoading: boolean
}

const PageLoader = ({ isLoading }: IProps) => {
  return (
    <Backdrop
      open={isLoading}
      sx={{
        zIndex: (theme) => theme.zIndex.modal + 1
      }}
    >
      <CircularProgress size={48} color="inherit" />
    </Backdrop>
  )
}

export default PageLoader
