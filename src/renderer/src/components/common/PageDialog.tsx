import { AppBar, Dialog, IconButton, Toolbar, Typography, Slide, Box } from '@mui/material'
import React from 'react'
import { MdClose } from 'react-icons/md'
import { TransitionProps } from '@mui/material/transitions'

interface IProps {
  onClose: () => void
  open: boolean
  title: string
  children?: React.ReactNode
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />
})

const PageDialog = ({ onClose, title, open, children }: IProps) => {
  return (
    <Dialog fullScreen open={open} onClose={() => onClose()} TransitionComponent={Transition}>
      <AppBar color="secondary" sx={{ position: 'relative' }}>
        <Toolbar>
          <IconButton onClick={onClose} edge="start" color="inherit" aria-label="close">
            <MdClose />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            {title}
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        sx={{
          p: 2,
          flex: 1,
          flexDirection: 'column',
          display: 'flex',
          overflow: 'hidden',
        }}
      >
        {children}
      </Box>
    </Dialog>
  )
}

export default PageDialog
