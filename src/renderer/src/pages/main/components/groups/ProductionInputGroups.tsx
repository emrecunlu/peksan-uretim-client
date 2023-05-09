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

  const getSerialPorts = async () => {
    const serialPorts = await window.api.getSerialPorts()

    setPorts(serialPorts)
  }

  const handleChange = (e: SelectChangeEvent<string>) => {
    setPort(e.target.value)

    window.electron.ipcRenderer.send('connect-com-port', e.target.value)
  }

  useEffect(() => {
    getSerialPorts()
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
        value={500}
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
        label="Brüt"
        fullWidth
        value={500}
        placeholder="Birim ağırlık"
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
        value={500}
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
        label="Net"
        fullWidth
        value={500}
        placeholder="Net"
        InputProps={{
          readOnly: true,
          style: {
            fontWeight: 600
          }
        }}
      />
      <TextField
        sx={{ flex: 1 }}
        label="Adet"
        fullWidth
        value={500}
        placeholder="Adet"
        InputProps={{
          readOnly: true,
          style: {
            fontWeight: 600
          }
        }}
      />
    </Box>
  )
}

export default ProductInputGroups
