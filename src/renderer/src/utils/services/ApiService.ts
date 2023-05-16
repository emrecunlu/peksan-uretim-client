import axios from 'axios'
import store from '@/store'
import { set as setLoader } from '@/store/features/loader'

const instance = axios.create({
  baseURL: 'http://192.168.2.250:5005/api'
})

instance.interceptors.request.use(
  (config) => {
    store.dispatch(setLoader(true))
    return config
  },
  (err) => {
    return Promise.reject(err)
  }
)

instance.interceptors.response.use(
  (res) => {
    store.dispatch(setLoader(false))
    return res
  },
  (err) => {
    store.dispatch(setLoader(false))
    return Promise.reject(err)
  }
)

export default instance
