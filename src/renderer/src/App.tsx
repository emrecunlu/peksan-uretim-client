import { RouterProvider } from 'react-router-dom';
import routes from './routes';
import PageLoader from './components/common/PageLoader';
import { useLoader } from './store/features/loader';

export default function App() {
	const { process } = useLoader();

	return (
		<>
			<PageLoader isLoading={process.length > 0} />
			<RouterProvider router={routes} />
		</>
	);
}
