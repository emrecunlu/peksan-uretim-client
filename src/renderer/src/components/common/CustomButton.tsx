import { Button, ButtonProps } from '@mui/material'
import React from 'react'

interface IProps extends ButtonProps {
  children: React.ReactNode
  icon?: React.ReactNode
}

const CustomButton = ({ children, ...props }: IProps) => {
  return <Button {...props}>{children}</Button>
}

export default CustomButton
