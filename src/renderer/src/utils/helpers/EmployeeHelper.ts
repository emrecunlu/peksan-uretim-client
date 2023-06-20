import store from '@/store'
import { setEmployee, setMachine, setWorkOrder } from '@/store/features/employee'
import { IEmployee } from '@/utils/interfaces/Employee'
import { IMachine } from '@/utils/interfaces/Machine'
import { IWorkOrder } from '@/utils/interfaces/WorkOrder'
import moment from 'moment'

interface ILoginDto {
  machine: IMachine
  employee: IEmployee
  workOrder: IWorkOrder
}

class EmployeeHelper {
  static login({ machine, employee, workOrder }: ILoginDto) {
    store.dispatch(setWorkOrder(workOrder))
    store.dispatch(setMachine(machine))
    store.dispatch(setEmployee(employee))
  }

  static getShift(): number {
    const now = moment()

    // Sabah 8'i temsil eden bir moment nesnesi oluşturun
    const morning8 = moment().set({ hour: 8, minute: 0, second: 0 })

    // Akşam 8'i temsil eden bir moment nesnesi oluşturun
    const evening8 = moment().set({ hour: 20, minute: 0, second: 0 })

    if (now.isBetween(morning8, evening8)) {
      return 1
    }

    return 2
  }

  static getFormattedWorkorder(workOrder: string) {
    const pattern = /^0+/
    return workOrder.replace(pattern, '')
  }
}

export default EmployeeHelper
