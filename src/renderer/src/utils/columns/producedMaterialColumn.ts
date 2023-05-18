import { GridColDef } from '@mui/x-data-grid'

const producedMaterialColumns: GridColDef[] = [
  {
    field: 'uretId',
    headerName: 'Id',
    flex: 1
  },
  {
    field: 'stokKodu',
    headerName: 'Stok Kodu',
    flex: 1
  },
  {
    field: 'seriNo',
    headerName: 'Seri Numarası',
    flex: 1
  },
  {
    field: 'depoKod',
    headerName: 'Depo Kodu',
    flex: 1
  },
  {
    field: 'miktar',
    headerName: 'Miktar',
    flex: 1
  }
]

export default producedMaterialColumns
