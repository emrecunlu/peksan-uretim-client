import React, { useEffect, useState } from 'react'
import {
  Box,
  Container,
  Card,
  CardContent,
  CardActions,
  CardHeader,
  Divider,
  Button,
  Avatar,
  Autocomplete,
  TextField,
  Stack
} from '@mui/material'
import { MdOutlineLogin } from 'react-icons/md'
import { IMachine } from '@/utils/interfaces/Machine'
import { IEmployee } from '@/utils/interfaces/Employee'
import AuthRepository from '@/repositories/AuthRepository'
import WorkOrderRepository from '@/repositories/WorkOrderRepository'
import EmployeeHelper from '@/utils/helpers/EmployeeHelper'
import WorkOrderSelectModal from '@/components/modals/workorder/WorkOrderSelectModal'
import ToastHelper from '@/utils/helpers/ToastHelper'
import { IWorkOrder } from '@/utils/interfaces/WorkOrder'
import { MESSAGES } from '@/utils/constants'
import { useNavigate } from 'react-router-dom'

interface ISelected {
  machine: IMachine | null
  employee: IEmployee | null
}

const SelectMachineAndEmployeePage: React.FC = () => {
  const [machines, setMachines] = useState<IMachine[]>([])
  const [employees, setEmployees] = useState<IEmployee[]>([])
  const [dialog, setDialog] = useState<boolean>(false)
  const [workOrders, setWorkOrders] = useState<IWorkOrder[]>([])
  const [selected, setSelected] = useState<ISelected>({
    machine: null,
    employee: null
  })

  const navigate = useNavigate()

  useEffect(() => {
    const fetchMachinesAndEmployees = async () => {
      const { data } = (await AuthRepository.getEmployeeAndMachines()).data

      setMachines(data.machines)
      setEmployees(data.staffs)
    }

    fetchMachinesAndEmployees()
  }, [])

  const loginAndNextPage = (workOrder: IWorkOrder) => {
    EmployeeHelper.login({
      employee: selected.employee!,
      machine: selected.machine!,
      workOrder
    })

    navigate('/questions')
  }

  const handleClick = async () => {
    const { data: results } = (
      await WorkOrderRepository.getByMachineId(selected.machine!.machineCode)
    ).data

    if (results.length === 1) {
      loginAndNextPage(results[0])
    } else if (results.length > 1) {
      setWorkOrders(results)
      setDialog(true)
    } else {
      ToastHelper.error(MESSAGES['workorder-notfound'])
    }
  }

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        bgcolor: (theme) => theme.palette.grey[100]
      }}
    >
      <Container maxWidth="md">
        <Card>
          <CardHeader
            title="Giriş Yap"
            subheader="Personel ve Makine seç"
            avatar={<Avatar sx={{ bgcolor: (theme) => theme.palette.primary.main }} />}
          />
          <Divider />
          <CardContent>
            <Stack spacing={4}>
              <Autocomplete
                options={employees}
                renderOption={(props, option) => (
                  <Box
                    sx={{ height: 50 }}
                    component="li"
                    {...props}
                  >{`${option.staffCode} - ${option.firstName} ${option.lastName}`}</Box>
                )}
                getOptionLabel={(option) =>
                  `${option.staffCode} - ${option.firstName} ${option.lastName}`
                }
                renderInput={(params) => (
                  <TextField {...params} label="Personel" placeholder="Personel seçiniz" />
                )}
                value={selected.employee}
                onChange={(_, val) => setSelected((selected) => ({ ...selected, employee: val }))}
              />
              <Autocomplete
                options={machines}
                renderOption={(props, option) => (
                  <Box sx={{ height: 50 }} component="li" {...props}>
                    {option.machineCode} - {option.description1}
                  </Box>
                )}
                getOptionLabel={(option) => `${option.machineCode} - ${option.description1}`}
                renderInput={(params) => (
                  <TextField {...params} label="Makine" placeholder="Makine seçiniz" />
                )}
                value={selected.machine}
                onChange={(_, val) => setSelected((selected) => ({ ...selected, machine: val }))}
              />
            </Stack>
          </CardContent>
          <CardActions>
            <Button
              sx={{ ml: 'auto' }}
              variant="contained"
              size="large"
              disabled={!selected.machine || !selected.employee}
              endIcon={<MdOutlineLogin />}
              onClick={handleClick}
            >
              Giriş Yap
            </Button>
          </CardActions>
        </Card>
      </Container>
      <WorkOrderSelectModal
        onSave={(workorder) => loginAndNextPage(workorder)}
        data={workOrders}
        open={dialog}
        onClose={() => setDialog(false)}
      />
    </Box>
  )
}

export default SelectMachineAndEmployeePage
