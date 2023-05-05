import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '@/store'
import { useSelector } from 'react-redux'

export interface IState {
  isLoading: boolean
}

const initialState: IState = {
  isLoading: false
}

const loader = createSlice({
  name: 'loader',
  initialState,
  reducers: {
    set: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    }
  }
})

export default loader.reducer
export const { set } = loader.actions
export const useLoader = () => useSelector((state: RootState) => state.loader)
