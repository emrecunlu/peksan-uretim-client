import WorkOrderRepository from '@/repositories/WorkOrderRepository'
import { ProcessType } from '@/utils/enums/ProcessType'
import { IMinMax, IToBeProduced } from '@/utils/interfaces/WorkOrder'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'

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
}

const initialState: IState = {
  loading: ProcessType.Idle,
  minMax: {
    birimAgirlik: 0,
    maxad: 0,
    maxkg: 0,
    minad: 0,
    minkg: 0,
    serino: ''
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
  reducers: {},
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
export const useProduction = () => useSelector((state: RootState) => state.production)
