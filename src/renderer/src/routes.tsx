import { createHashRouter } from 'react-router-dom';
import MainLayout from './pages/main/layout/MainLayout';
import MainPage from './pages/main/MainPage';
import SelectMachineAndEmployeePage from './pages/auth/SelectMachineAndEmployeePage';
import QuestionsPage from './pages/questions/QuestionsPage';
import PrintPage from './pages/print/PrintPage';

const routes = createHashRouter([
	{
		path: '/',
		element: <MainLayout />,
		children: [
			{
				index: true,
				element: <MainPage />,
			},
		],
	},
	{
		path: '/auth',
		children: [
			{
				path: 'login',
				element: <SelectMachineAndEmployeePage />,
			},
		],
	},
	{
		path: '/questions',
		element: <QuestionsPage />,
	},
	{
		path: '/print',
		element: <PrintPage />,
	},
]);

export default routes;
