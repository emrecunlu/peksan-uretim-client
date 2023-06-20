import { IEmployee } from '@/utils/interfaces/Employee';
import { IMachine } from '@/utils/interfaces/Machine';
import { IWorkOrder } from '@/utils/interfaces/WorkOrder';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

export interface IState {
	employee: IEmployee | null;
	machine: IMachine | null;
	workOrder: IWorkOrder | null;
	isLoggedIn: boolean;
}

const initialState: IState = {
	employee: null,
	machine: null,
	workOrder: null,
	isLoggedIn: false,
};

const employee = createSlice({
	name: 'employee',
	initialState,
	reducers: {
		setEmployee: (state, action: PayloadAction<IEmployee | null>) => {
			state.employee = action.payload;
		},
		setMachine: (state, action: PayloadAction<IMachine | null>) => {
			state.machine = action.payload;
		},
		setWorkOrder: (state, action: PayloadAction<IWorkOrder | null>) => {
			state.workOrder = action.payload;
		},
		login: (state) => {
			state.isLoggedIn = true;
		},
	},
});

export default employee.reducer;
export const { setEmployee, setMachine, setWorkOrder, login } =
	employee.actions;
export const useEmployee = () =>
	useSelector((state: RootState) => state.employee);
