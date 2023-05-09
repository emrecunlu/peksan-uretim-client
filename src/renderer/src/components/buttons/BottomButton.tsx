import React, { useState, useEffect } from 'react'
import { ButtonProps, Button } from '@mui/material'

interface IProps extends ButtonProps {
  children: React.ReactNode
  icon?: React.ReactElement
  refreshTime?: number
  delay?: boolean;
}

const BottomButton = ({ children, icon, sx, onClick, refreshTime = 3000, delay =  false }: IProps) => {
  const [disabled, setDisabled] = useState<boolean>(false)

  useEffect(() => {
    if (disabled) {
      setTimeout(() => {
        setDisabled(false)
      }, refreshTime)
    }
  }, [disabled])

  const handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (onClick) onClick(event)
    setDisabled(true)
  }

  return (
    <Button
      disabled={delay && disabled}
      onClick={(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => handleClick(event)}
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
