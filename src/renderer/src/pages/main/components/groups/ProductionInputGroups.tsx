import store from '@/store'
import { setScale, setScaleCount, useProduction } from '@/store/features/production'
import { ProductionType } from '@/utils/interfaces/enums/ProductionType'
import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent
} from '@mui/material'
import { useEffect, useState } from 'react'

const ProductInputGroups = () => {
  const [ports, setPorts] = useState<IPortInfo[]>([])
  const [port, setPort] = useState<string>('')

  const { minMax, terazi, productionType } = useProduction()

  const getSerialPorts = async () => {
    const serialPorts = await window.api.getSerialPorts()
    /* const port = await window.api.getCurrentPort(); */

    setPorts(serialPorts)
  }

  const handleChange = (e: SelectChangeEvent<string>) => {
    setPort(e.target.value)

    window.electron.ipcRenderer.send('connect-com-port', e.target.value)
  }

  useEffect(() => {
    getSerialPorts()

    window.electron.ipcRenderer.on('scale-data', (_, data: { net: number; dara: number }) => {
      store.dispatch(setScale(data))
    })

    return () => {
      window.electron.ipcRenderer.removeAllListeners('scale-data');
    }
  }, [])

  return (
    <Box sx={{ width: 250, display: 'flex', flexDirection: 'column', gap: 5 }}>
      <FormControl>
        <InputLabel id="select-com-port-label">COM Port</InputLabel>
        <Select
          value={port}
          onChange={handleChange}
          labelId="select-com-port-label"
          label="COM"
          placeholder="Lütfen com port seçiniz."
        >
          {ports.map((port, index) => (
            <MenuItem sx={{ height: 50 }} key={index} value={port.path}>
              {port.path}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        sx={{ flex: 1 }}
        label="Gramaj"
        fullWidth
        value={minMax.birimAgirlik}
        placeholder="Birim ağırlık"
        InputProps={{
          readOnly: true,
          style: {
            fontWeight: 600
          }
        }}
      />
      <TextField
        sx={{ flex: 1 }}
        label="Brüt KG"
        fullWidth
        value={terazi.brut}
        placeholder="Brüt KG"
        InputProps={{
          readOnly: true,
          style: {
            textAlign: 'right',
            fontWeight: 600
          }
        }}
      />
      <TextField
        sx={{ flex: 1 }}
        label="Dara"
        fullWidth
        value={terazi.dara}
        placeholder="Dara"
        InputProps={{
          readOnly: true,
          style: {
            fontWeight: 600
          }
        }}
      />
      <TextField
        sx={{ flex: 1 }}
        label="KG"
        fullWidth
        value={terazi.net}
        placeholder="KG"
        InputProps={{
          readOnly: true,
          style: {
            fontWeight: 600
          }
        }}
      />
      <TextField
        label="Adet"
        fullWidth
        value={terazi.adet}
        onChange={(e) => store.dispatch(setScaleCount(e.target.value))}
        placeholder="Adet"
        InputProps={{
          readOnly: productionType !== ProductionType.Numune,
          style: {
            fontWeight: 600
          }
        }}
      />
    </Box>
  )
}

export default ProductInputGroups
