import axios, { AxiosError } from 'axios';
import store from '@/store';
import { _add, _remove, set as setLoader } from '@/store/features/loader';
import { IApiErrorResult } from '../interfaces/ApiResult';
import ToastHelper from '../helpers/ToastHelper';

const instance = axios.create({
	baseURL: 'http://192.168.2.251:5066/api',
});

instance.interceptors.request.use(
	(config) => {
		store.dispatch(_add(config?.url ?? ''));
		store.dispatch(setLoader(true));
		return config;
	},
	(err) => {
		return Promise.reject(err);
	}
);

instance.interceptors.response.use(
	(res) => {
		store.dispatch(_remove(res.config?.url ?? ''));
		store.dispatch(setLoader(false));
		return res;
	},
	(err: AxiosError<IApiErrorResult>) => {
		//deadlock

		if (err.response) {
			if (err.response.data.Message || err.response.data.Message !== '') {
				const message = err.response.data.Message ?? '';

				if (message.toLowerCase().includes('deadlock')) {
					ToastHelper.error('Hata Meydana Geldi, Lütfen Tekrar Üretiniz');
				} else {
					ToastHelper.error(err.response.data.Message ?? 'Hata Meydana Geldi');
				}
			}
		} else {
			ToastHelper.error('Hata Meydana Geldi');
		}

		store.dispatch(_remove(err.config?.url ?? ''));
		store.dispatch(setLoader(false));
		return Promise.reject(err);
	}
);

export default instance;
