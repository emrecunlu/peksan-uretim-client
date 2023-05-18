import PageDialog from '@/components/common/PageDialog'
import ProductionRepository from '@/repositories/ProductionRepository'
import { useEmployee } from '@/store/features/employee'
import { useLoader } from '@/store/features/loader'
import producedItemColumns from '@/utils/columns/producedItemColumn'
import { IProducedItem } from '@/utils/interfaces/ProducedItem'
import { IProducedMaterial } from '@/utils/interfaces/ProducedMaterial'
import { Box, Divider, Button } from '@mui/material'
import { DataGrid, GridPaginationModel, GridRowParams } from '@mui/x-data-grid'
import producedMaterialColumns from '@/utils/columns/producedMaterialColumn'
import { useEffect, useState, useMemo } from 'react'
import { AiFillPrinter } from 'react-icons/ai'

interface IProps {
  onClose: () => void
  open: boolean
}

const ProducedPackagesModal = ({ onClose, open }: IProps) => {
  const [totalPage, setTotalPage] = useState<number>(0)
  const [producedItems, setProducedItems] = useState<IProducedItem[]>([])
  const [producedMaterials, setProducedMaterials] = useState<IProducedMaterial[]>([])
  const [selected, setSelected] = useState<IProducedItem | null>(null)
  const [disabled, setDisabled] = useState<boolean>(false)

  const { workOrder } = useEmployee()
  const { isLoading } = useLoader()

  const getMaterials = async (id: number) => {
    const { data: results } = (await ProductionRepository.getProducedMaterials(id)).data

    setProducedMaterials(results)
  }

  const getProducedItems = async (page: number, limit: number) => {
    const results = (
      await ProductionRepository.getProducedItems({
        workOrder: workOrder?.isemrino ?? '',
        limit,
        page
      })
    ).data

    setTotalPage(results.totalRecords)
    setProducedItems(results.data)
  }

  const handleChange = (options: GridPaginationModel) => {
    getProducedItems(options.page, options.pageSize)
  }

  const handleRowClick = (params: GridRowParams<IProducedItem>) => {
    getMaterials(params.row.id)
    setSelected(params.row)
  }

  const handlePrintClick = async () => {
    setDisabled(true)
    if (selected) {
      const { data: result } = await ProductionRepository.getProducedLabel(
        selected.seriNo,
        selected.uretTip
      )

      if (!result.success) {
        return
      }

      window.electron.ipcRenderer.send('print-label', result.data)
    }

    setTimeout(() => {
      setDisabled(false)
    }, 2000)
  }

  useEffect(() => {
    if (open) {
      getProducedItems(1, 10)
    } else {
      setSelected(null)
      setProducedMaterials([])
    }
  }, [open])

  return (
    <PageDialog onClose={onClose} title="Üretilen Koliler" open={open}>
      <Box sx={{ display: 'flex', justifyContent: 'end' }}>
        <Button
          onClick={handlePrintClick}
          disabled={!selected || disabled}
          sx={{ mb: 2, ml: 'auto' }}
          startIcon={<AiFillPrinter />}
          variant="contained"
          size="large"
        >
          Yazdır
        </Button>
      </Box>
      <Box sx={{ flex: 1, overflow: 'hidden' }}>
        <DataGrid
          pagination
          columns={producedItemColumns}
          rows={producedItems}
          getRowId={(row) => row.id}
          paginationMode="server"
          loading={isLoading}
          rowCount={totalPage}
          onRowClick={handleRowClick}
          onPaginationModelChange={handleChange}
        />
      </Box>
      <Divider sx={{ my: 2 }} />
      <Box sx={{ flex: 1, overflow: 'hidden' }}>
        <DataGrid
          loading={isLoading}
          getRowId={(row) => row?.id}
          rows={producedMaterials}
          columns={producedMaterialColumns}
        />
      </Box>
    </PageDialog>
  )
}

export default ProducedPackagesModal
