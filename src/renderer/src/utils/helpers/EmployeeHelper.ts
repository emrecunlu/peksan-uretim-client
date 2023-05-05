import store from '@/store'
import { setEmployee, setMachine, setWorkOrder } from '@/store/features/employee'
import { IEmployee } from '@/utils/interfaces/Employee'
import { IMachine } from '@/utils/interfaces/Machine'
import { IWorkOrder } from '@/utils/interfaces/WorkOrder'

interface ILoginDto {
  machine: IMachine
  employee: IEmployee
  workOrder: IWorkOrder
}

class EmployeeHelper {
  static async login({ machine, employee, workOrder }: ILoginDto) {
    store.dispatch(setWorkOrder(workOrder))
    store.dispatch(setMachine(machine))
    store.dispatch(setEmployee(employee))
  }
}

export default EmployeeHelper
