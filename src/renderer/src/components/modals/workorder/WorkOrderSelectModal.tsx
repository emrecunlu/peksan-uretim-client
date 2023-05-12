import { IModalProps } from '@/utils/interfaces/Base'
import { IWorkOrder } from '@/utils/interfaces/WorkOrder'
import { DialogContent, DialogActions, Button } from '@mui/material'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { useEffect, useState } from 'react'
import { AiFillSave } from 'react-icons/ai'
import CustomDialog from '@/components/common/CustomDialog'

interface IProps extends IModalProps {
  onClose: () => void
  onSave: (workOrder: IWorkOrder) => void
  data: IWorkOrder[]
}

const WorkOrderSelectModal = ({ open, data, onSave, onClose }: IProps) => {
  const [selected, setSelected] = useState<IWorkOrder | null>(null)

  useEffect(() => {
    setSelected(null)
  }, [open])

  const columns: GridColDef<IWorkOrder>[] = [
    {
      headerName: 'İşemri Numarası',
      field: 'isemrino',
      flex: 1
    },
    {
      headerName: 'Stok Kodu',
      field: 'stokKodu',
      flex: 1
    },
    {
      headerName: 'Yapı Kodu',
      field: 'yapkod',
      flex: 1
    }
  ]

  const handleClick = () => {
    onSave(selected!)
    onClose()
  }

  return (
    <CustomDialog fullWidth maxWidth="lg" onClose={onClose} open={open} title='İşemri Listesi'>
      <DialogContent dividers>
        <DataGrid
          rows={data}
          columns={columns}
          getRowId={(row) => row.isemrino}
          onRowClick={(params) => setSelected(params.row)}
        />
      </DialogContent>
      <DialogActions>
        <Button
          disabled={!selected}
          onClick={() => handleClick()}
          variant="contained"
          size="large"
          startIcon={<AiFillSave />}
        >
          Kaydet
        </Button>
      </DialogActions>
    </CustomDialog>
  )
}

export default WorkOrderSelectModal
