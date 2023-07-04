import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/store';
import { useSelector } from 'react-redux';

export interface IState {
	isLoading: boolean;
	process: string[];
}

const initialState: IState = {
	isLoading: false,
	process: [],
};

const loader = createSlice({
	name: 'loader',
	initialState,
	reducers: {
		set: (state, action: PayloadAction<boolean>) => {
			state.isLoading = action.payload;
		},
		_add: (state, action: PayloadAction<string>) => {
			const exists = action.payload.includes('min-max');

			if (!exists) state.process.push(action.payload);
		},
		_remove: (state, action: PayloadAction<string>) => {
			state.process = state.process.filter((e) => e !== action.payload);
		},
	},
});

export default loader.reducer;
export const { set, _add, _remove } = loader.actions;
export const useLoader = () => useSelector((state: RootState) => state.loader);
