import { IApiPostResult } from '@/utils/interfaces/ApiResult'
import { ISendSlipDetailDto } from '@/utils/interfaces/dto/SendSlipDetailDto'
import instance from '@/utils/services/ApiService'
import { AxiosResponse } from 'axios'

class LogRepository {
  private static _uri: string = '/Logs'

  static printLog(data: ISendSlipDetailDto) {
    return instance.post<ISendSlipDetailDto, AxiosResponse<IApiPostResult>>(
      `${this._uri}/product-print`,
      data
    )
  }
}

export default LogRepository
