import { GridColDef } from '@mui/x-data-grid'
import ProductionHelper from '../helpers/ProductionHelper'
import moment from 'moment'
import { TIME_FORMAT } from '../constants'
import { IProducedMaterial } from '../interfaces/ProducedMaterial'

const producedItemColumns: GridColDef[] = [
  {
    headerName: 'Seri Numarası',
    field: 'seriNo',
    flex: 1
  },
  {
    headerName: 'Birim Ağırlık',
    field: 'bAgirlik',
    flex: 1
  },
  {
    headerName: 'Dara',
    field: 'dara',
    flex: 1
  },
  {
    headerName: 'Brüt Ağırlık',
    field: 'brut',
    flex: 1
  },
  {
    headerName: 'Üretim Tipi',
    field: 'uretTip',
    valueFormatter: ({ value }) => ProductionHelper.getProductionName(value),
    flex: 1
  },
  {
    headerName: 'Tarih',
    field: 'created',
    valueFormatter: ({ value }) => moment(value).format(TIME_FORMAT),
    flex: 1
  },
  {
    headerName: 'Belge Numarası',
    field: 'suskNo',
    flex: 1
  }
]

export default producedItemColumns
