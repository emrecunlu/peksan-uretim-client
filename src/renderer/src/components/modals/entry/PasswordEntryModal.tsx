import CustomDialog from '@/components/common/CustomDialog'
import { DialogActions, DialogContent, Button, TextField } from '@mui/material'
import { useEffect, useState } from 'react'

interface IProps {
  open: boolean
  onClose: (password: string) => void
}

const PasswordEntryModal = ({ open, onClose }: IProps) => {
  const [password, setPassword] = useState<string>('')

  useEffect(() => {
    setPassword('')
  }, [open])

  return (
    <CustomDialog
      title="Giriş Yap"
      fullWidth
      onClose={() => onClose(password)}
      open={open}
      maxWidth="sm"
    >
      <DialogContent>
        <TextField
          autoFocus
          sx={{ my: 3 }}
          label="Şifre"
          placeholder="Şifrenizi giriniz"
          fullWidth
          value={password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => onClose(password)}
          disabled={password.length === 0}
          size="large"
          variant="contained"
          color="primary"
        >
          GİRİŞ YAP
        </Button>
      </DialogActions>
    </CustomDialog>
  )
}

export default PasswordEntryModal
