import { IApiGetListResult, IApiGetObjectResult, IApiPostObjectResult } from '@/utils/interfaces/ApiResult'
import { IMinMax, IToBeProduced, IWorkOrder } from '@/utils/interfaces/WorkOrder'
import { IWorkOrderInfo } from '@/utils/interfaces/WorkOrderInfo'
import { IGetWorkOrderDto } from '@/utils/interfaces/dto/GetWorkOrderDto'
import instance from '@/utils/services/ApiService'
import { AxiosResponse } from 'axios'

class WorkOrderRepository {
  private static _uri: string = '/workOrder'

  static async getByMachineId(machineId: string) {
    return instance.get<IApiGetListResult<IWorkOrder>>(`${this._uri}?machineId=${machineId}`)
  }

  static async getWorkOrderInfo(data: IGetWorkOrderDto) {
    return instance.post<IGetWorkOrderDto, AxiosResponse<IApiPostObjectResult<IWorkOrderInfo>>>(
      `${this._uri}/info`,
      data
    )
  }

  static async getMinMax(workOrder: string) {
    return instance.get<IApiPostObjectResult<IMinMax>>(
      `${this._uri}/min-max?workOrder=${workOrder}`
    )
  }

  static async getToBeProduced(ciid: number) {
    return instance.get<IApiGetObjectResult<IToBeProduced>>(
      `${this._uri}/to-be-produced?ciid=${ciid}`
    )
  }
}

export default WorkOrderRepository
