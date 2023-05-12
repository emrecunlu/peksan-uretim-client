import React from 'react'
import { ButtonProps, Button } from '@mui/material'

interface IProps extends ButtonProps {
  children: React.ReactNode
  icon?: React.ReactElement
}

const BottomButton = ({ children, icon, sx, ...props }: IProps) => {
  return (
    <Button
      {...props}
      sx={{ height: '100%', flex: 1, fontWeight: '600', fontSize: 18, ...sx }}
      variant="contained"
      size="large"
      startIcon={icon}
    >
      {children}
    </Button>
  )
}

export default BottomButton
