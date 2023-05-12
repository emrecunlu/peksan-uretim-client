import store from '@/store'
import { setAuth, setProductionType, useProduction } from '@/store/features/production'
import { ProductionType } from '@/utils/interfaces/enums/ProductionType'
import { ButtonProps, Button } from '@mui/material'
import React from 'react'

interface IProps extends ButtonProps {
  children: React.ReactNode
  value: ProductionType
}

const RightButton = ({ children, sx, value, onClick }: IProps) => {
  const { productionType } = useProduction()

  const handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    store.dispatch(setProductionType(value));
    store.dispatch(setAuth(false));
    onClick && onClick(event)
  }

  return (
    <Button
      onClick={(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => handleClick(event)}
      sx={{ flex: 1, fontWeight: '600', ...sx }}
      size="large"
      variant="contained"
      color={value === productionType ? 'info' : 'inherit'}
    >
      {children}
    </Button>
  )
}

export default RightButton
