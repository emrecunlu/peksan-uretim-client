import {
  IApiGetListResult,
  IApiGetObjectResult,
  IApiGetPaginationListResult,
  IApiPostObjectResult
} from '@/utils/interfaces/ApiResult'
import { IProducedItem } from '@/utils/interfaces/ProducedItem'
import { IProducedMaterial } from '@/utils/interfaces/ProducedMaterial'
import { IProductLabel } from '@/utils/interfaces/ProductLabel'
import { IGetProducedItemsDto } from '@/utils/interfaces/dto/GetProducedItemsDto'
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

  static async getProducedItems({ limit, page, workOrder }: IGetProducedItemsDto) {
    return instance.get<IApiGetPaginationListResult<IProducedItem>>(
      `${this._uri}/produced-item?workOrder=${workOrder}&page=${page}&limit=${limit}`
    )
  }

  static async getProducedMaterials(id: number) {
    return instance.get<IApiGetListResult<IProducedMaterial>>(
      `${this._uri}/produced-materials?uretId=${id}`
    )
  }

  static async getProducedLabel(serialNo: string, uretTip: number) {
    return instance.get<IApiGetObjectResult<IProductLabel>>(
      `${this._uri}/produced-label?serialNo=${serialNo}&uretTip=${uretTip}`
    )
  }
}

export default ProductionRepository
