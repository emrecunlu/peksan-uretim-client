import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SelectMachineAndEmployeePage from '@/pages/auth/SelectMachineAndEmployeePage';
import MainPage from '@/pages/main/MainPage';
import PageLoader from '@/components/common/PageLoader';
import { useLoader } from '@/store/features/loader';
import QuestionsPage from '@/pages/questions/QuestionsPage';
import MainLayout from '@/pages/main/layout/MainLayout';
import PrintPage from './pages/print/PrintPage';
import '@/assets/main.css';

const App: React.FC = () => {
	const { process } = useLoader();

	/* useEffect(() => {
    document.addEventListener('keydown', (event) => {
      if (event.keyCode === 13) {
        window.electron.ipcRenderer.send(
          'send-serial-data',
          'TOTAL\r\nNET:  9.971 kg\r\nU / W:     7.67  g\r\nPCS: 1300\r\nTare: 1.00 kg\r\n\n\n\n\n\n'
        )
      }
    })
  }, []) */

	return (
		<>
			<Routes>
				<Route path="/" element={<MainLayout />}>
					<Route index element={<MainPage />} />
				</Route>
				<Route path="/questions" element={<QuestionsPage />}></Route>
				<Route path="/auth">
					<Route path="login" element={<SelectMachineAndEmployeePage />} />
				</Route>
				<Route path="/print">
					<Route index element={<PrintPage />} />
				</Route>
			</Routes>
			<PageLoader isLoading={process.length > 0} />
		</>
	);
};

export default App;
