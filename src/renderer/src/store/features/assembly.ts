import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '@/store';
import { IAssemblyMaterial } from '@/utils/interfaces/Material';
import { useSelector } from 'react-redux';
import AssemblyRepository from '@/repositories/AssemblyRepository';
import { IGetSerialDto } from '@/utils/interfaces/dto/GetSerialDto';

export const fetchAssemblySeries = createAsyncThunk(
	'assembly/series',
	async (workOrder: string) => {
		const { data: result } = (await AssemblyRepository.getAllSeries(workOrder))
			.data;

		return result;
	}
);

export const fetchAssemblySerial = createAsyncThunk(
	'assembly/serial',
	async (obj: IGetSerialDto) => {
		const { data: result } = await (
			await AssemblyRepository.getSerial(obj)
		).data;

		return result;
	}
);

export interface IState {
	materials: IAssemblyMaterial | null;
}

const initialState: IState = {
	materials: null,
};

const assembly = createSlice({
	name: 'assembly',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchAssemblySeries.fulfilled, (state, action) => {
			state.materials = action.payload;
		});
		builder.addCase(fetchAssemblySerial.fulfilled, (state, action) => {
			state.materials = action.payload;
		});
	},
});

export const useAssembly = () =>
	useSelector((state: RootState) => state.assembly);
export default assembly.reducer;
