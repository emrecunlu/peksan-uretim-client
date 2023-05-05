import { Dialog, DialogTitle, Box, IconButton, DialogProps } from '@mui/material'
import { AiFillCloseCircle } from 'react-icons/ai'

interface IProps extends DialogProps {
  children: React.ReactNode
  title: string
}

const BaseModal = ({ children, title, ...props }: IProps) => {
  return (
    <Dialog {...props}>
      <DialogTitle>
        <Box display="flex" alignItems="center">
          <Box flexGrow={1}>{title}</Box>
          <IconButton onClick={() => props.onClose ? props.onClose() : null}>
            <AiFillCloseCircle size={32} />
          </IconButton>
        </Box>
      </DialogTitle>
      {children}
    </Dialog>
  )
}

export default BaseModal
