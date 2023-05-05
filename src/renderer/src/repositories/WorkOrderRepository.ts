import { IApiGetListResult } from '@/utils/interfaces/ApiResult'
import { IWorkOrder } from '@/utils/interfaces/WorkOrder'
import instance from '@/utils/services/ApiService'

class WorkOrderRepository {
  private static _uri: string = '/workOrder'

  static async getByMachineId(machineId: string) {
    return instance.get<IApiGetListResult<IWorkOrder>>(`${this._uri}?machineId=${machineId}`)
  }
}

export default WorkOrderRepository
