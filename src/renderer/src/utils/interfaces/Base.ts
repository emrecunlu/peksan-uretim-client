import { DialogProps } from '@mui/material'

export interface IModal extends DialogProps {
  title: string
  element: React.ReactNode
  open: boolean
}

export interface IModalProps {
  open: boolean
}
