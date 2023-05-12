import { IApiPostObjectResult } from '@/utils/interfaces/ApiResult'
import { IProductLabel } from '@/utils/interfaces/ProductLabel'
import { IProductionAddDto } from '@/utils/interfaces/dto/ProducitonAddDto'
import instance from '@/utils/services/ApiService'
import { AxiosResponse } from 'axios'

class ProductionRepository {
  private static _uri: string = '/Uretim'

  static async addProduction(data: IProductionAddDto) {
    return instance.post<IProductionAddDto, AxiosResponse<IApiPostObjectResult<IProductLabel>>>(
      `${this._uri}`,
      data
    )
  }
}

export default ProductionRepository
