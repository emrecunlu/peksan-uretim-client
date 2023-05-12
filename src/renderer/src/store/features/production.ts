import WorkOrderRepository from '@/repositories/WorkOrderRepository'
import { ProcessType } from '@/utils/enums/ProcessType'
import { IMinMax, IToBeProduced } from '@/utils/interfaces/WorkOrder'
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'
import { ITerazi } from '@/utils/interfaces/Terazi'
import { ProductionType } from '@/utils/interfaces/enums/ProductionType'

export const fetchMinMaxValue = createAsyncThunk('production/minMax', async (workOrder: string) => {
  const { data: result } = (await WorkOrderRepository.getMinMax(workOrder)).data

  return result
})

export const fetchRemaingValue = createAsyncThunk('production/remaining', async (ciid: number) => {
  const { data: result } = (await WorkOrderRepository.getToBeProduced(ciid)).data

  return result
})

export interface IState {
  loading: ProcessType
  minMax: IMinMax
  produced: IToBeProduced
  terazi: ITerazi
  productionType: ProductionType
  isAuth: boolean
}

const initialState: IState = {
  loading: ProcessType.Idle,
  productionType: ProductionType.Uretim,
  isAuth: false,
  minMax: {
    birimAgirlik: 0,
    maxad: 0,
    maxkg: 0,
    minad: 0,
    minkg: 0,
    serino: ''
  },
  terazi: {
    adet: 0,
    brut: 0,
    dara: 0,
    gramaj: 0,
    net: 0
  },
  produced: {
    remaining: 0,
    produced: 0,
    toBeProducedItem: {
      ciid: 0,
      did: 0,
      value: 0
    }
  }
}

const production = createSlice({
  name: 'production',
  initialState,
  reducers: {
    setProductionType: (state, action: PayloadAction<ProductionType>) => {
      state.productionType = action.payload
    },
    setAuth: (state, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload
    },
    clearScale: (state) => {
      state.terazi = {
        adet: 0,
        brut: 0,
        dara: 0,
        gramaj: 0,
        net: 0
      }
    },
    setScaleCount: (state, action: PayloadAction<string>) => {
      const val = parseFloat(action.payload)

      if (isNaN(val)) {
        state.terazi.adet = 0
        state.terazi.net = 0
      } else {
        state.terazi.adet = val
        state.terazi.net = (val / 1000) * state.terazi.gramaj
      }
    },
    setScale: (state, action: PayloadAction<{ net: number; dara: number }>) => {
      const { dara, net } = action.payload
      state.terazi = {
        adet: Math.floor((net * 1000) / state.minMax.birimAgirlik),
        brut: net + dara,
        dara,
        gramaj: state.minMax.birimAgirlik,
        net
      }
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchMinMaxValue.fulfilled, (state, action) => {
      const { birimAgirlik, maxad, maxkg, minad, minkg, serino } = action.payload
      state.minMax = {
        birimAgirlik,
        maxad,
        maxkg,
        minad,
        minkg,
        serino
      }
      state.loading = ProcessType.Succedded
    })
    builder.addCase(fetchMinMaxValue.pending, (state) => {
      state.loading = ProcessType.Pending
    })
    builder.addCase(fetchRemaingValue.fulfilled, (state, action) => {
      state.produced = action.payload
      state.loading = ProcessType.Succedded
    })
    builder.addCase(fetchRemaingValue.pending, (state) => {
      state.loading = ProcessType.Pending
    })
  }
})

export default production.reducer
export const { setProductionType, setAuth, setScale, setScaleCount, clearScale } =
  production.actions
export const useProduction = () => useSelector((state: RootState) => state.production)
