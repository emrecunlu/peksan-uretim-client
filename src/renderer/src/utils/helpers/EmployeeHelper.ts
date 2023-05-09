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
    const start = moment().hour(8)
    const end = moment().hour(20)

    if (now.isBetween(start, end, 'hour', '[]')) {
      return 1
    }

    return 2
  }
}

export default EmployeeHelper
