import CustomDialog from '@/components/common/CustomDialog'
import { useState } from 'react'
import { Button, DialogActions, DialogContent, Stack, TextField } from '@mui/material'
import { MdSend } from 'react-icons/md'
import MailRepository from '@/repositories/MailRepository'
import ToastHelper from '@/utils/helpers/ToastHelper'
import { MESSAGES } from '@/utils/constants'
import { useEmployee } from '@/store/features/employee'

interface IProps {
  open: boolean
  onClose: () => void
}

interface IMail {
  subject: string
  content: string
}

const HelpFormModal = ({ onClose, open }: IProps) => {
  const [mail, setMail] = useState<IMail>({
    subject: '',
    content: ''
  })

  const { machine } = useEmployee()

  const handleClick = async () => {
    const hostName = await window.api.getHostName()
    MailRepository.send({
      subject: `${machine?.machineCode ?? 0} - ${hostName} - ${mail.subject}`,
      body: mail.content
    }).then((_) => {
      ToastHelper.success(MESSAGES['send-mail'])
      onClose()
    })
  }

  return (
    <CustomDialog fullWidth maxWidth="lg" open={open} onClose={onClose} title="Yardım">
      <DialogContent dividers>
        <Stack direction="column" gap={4}>
          <TextField
            value={mail.subject}
            onChange={(e) => setMail((mail) => ({ ...mail, subject: e.target.value }))}
            fullWidth
            label="Konu"
            placeholder="Lütfen konu giriniz."
          />
          <TextField
            value={mail.content}
            onChange={(e) => setMail((mail) => ({ ...mail, content: e.target.value }))}
            fullWidth
            label="Açıklama"
            placeholder="Lütfen açıklama giriniz."
            multiline
            rows={5}
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleClick}
          disabled={mail.content === '' || mail.content === ''}
          startIcon={<MdSend />}
          size="large"
          variant="contained"
        >
          Gönder
        </Button>
      </DialogActions>
    </CustomDialog>
  )
}

export default HelpFormModal
