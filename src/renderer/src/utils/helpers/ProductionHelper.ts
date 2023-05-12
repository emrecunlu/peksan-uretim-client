import store from '@/store'
import { ProductionType } from '../interfaces/enums/ProductionType'
import {
  clearScale,
  fetchMinMaxValue,
  fetchRemaingValue,
  setAuth,
  setProductionType
} from '@/store/features/production'
import ToastHelper from './ToastHelper'
import { MESSAGES } from '../constants'

class ProductionHelper {
  static changeProductionType(productionType: ProductionType) {
    store.dispatch(setProductionType(productionType))
  }

  static login(password: string, productionType: ProductionType): boolean {
    if (password === '1') {
      this.changeProductionType(productionType)
      store.dispatch(setAuth(true))
      return true
    }

    ToastHelper.error(MESSAGES['invalid-password'])
    this.changeProductionType(ProductionType.Uretim)
    store.dispatch(setAuth(false))
    return false
  }

  static successProduction(ciid: number, workOrder: string) {
    store.dispatch(fetchMinMaxValue(workOrder))
    store.dispatch(fetchRemaingValue(ciid))
    store.dispatch(clearScale())
    store.dispatch(setProductionType(ProductionType.Uretim))

    ToastHelper.success(MESSAGES['success-production'])
  }
}

export default ProductionHelper
