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
              'TOTAL NET: 11.57 kg U / W:     4501  g PCS: 1274 Tare: 1.23 kg         '
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
