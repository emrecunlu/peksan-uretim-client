import BottomButton from '@/components/buttons/BottomButton'
import { MdOutbox } from 'react-icons/md'
import { grey } from '@mui/material/colors'

const UretilenKolilerButton = () => {
  return (
    <>
      <BottomButton
        onClick={
          () =>
            window.electron.ipcRenderer.send(
              'send-serial-data',
              'TOTAL\r\nNET: 6.36 kg\r\nU / W:     4.99343  g\r\nPCS: 1274\r\nTare: 1 kg\r\n\n\n\n\n\n'
            )

          /* b.ağırlık * 1000 / kg = Adet */
        }
        sx={{ bgcolor: grey[800], '&:hover': { bgcolor: grey[600] } }}
        icon={<MdOutbox size={32} />}
      >
        ÜRETİLEN KOLİLER
      </BottomButton>
    </>
  )
}

export default UretilenKolilerButton
