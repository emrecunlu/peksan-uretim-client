import React from 'react'
import { Dialog, DialogTitle, Box, Typography, DialogProps, IconButton } from '@mui/material'
import { AiFillCloseSquare } from 'react-icons/ai'

interface IProps extends DialogProps {
  title: string
  children: React.ReactNode
}

const CustomDialog = ({ title, children, onClose, open, ...props }: IProps) => {
  return (
    <Dialog {...props} open={open} onClose={onClose}>
      <DialogTitle>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant='h5' sx={{ flexGrow: 1 }}>{title}</Typography>
          <IconButton onClick={() => onClose && onClose({}, 'escapeKeyDown')}>
            <AiFillCloseSquare size={48} />
          </IconButton>
        </Box>
      </DialogTitle>
      {children}
    </Dialog>
  )
}

export default CustomDialog
