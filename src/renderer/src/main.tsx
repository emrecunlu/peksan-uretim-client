import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from '@/store';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import App from './App';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<Provider store={store}>
		<App />
		<ToastContainer position="bottom-right" draggable autoClose={5000} />
	</Provider>
);
