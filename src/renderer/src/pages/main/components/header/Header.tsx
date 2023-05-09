import { useEmployee } from '@/store/features/employee'
import { TIME_FORMAT } from '@/utils/constants'
import EmployeeHelper from '@/utils/helpers/EmployeeHelper'
import {
  AppBar,
  Toolbar,
  Typography,
} from '@mui/material'
import moment from 'moment'
import { useMemo, useState, useEffect } from 'react'

const Header = () => {
  const [time, setTime] = useState<moment.Moment>(moment())
  const { machine, employee } = useEmployee()
  const shift: number = useMemo(() => {
    return EmployeeHelper.getShift()
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((time) => time.add(1, 'seconds'))
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [])

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography sx={{ flexGrow: 1 }} variant="h6">
          {`${shift}. VARDIYA`} | {`${machine?.machineCode} - ${machine?.description1}`}
          {`${employee?.staffCode} | ${employee?.staffCode} - ${employee?.firstName} ${employee?.lastName}`}
        </Typography>
        <Typography variant="h6">{time.format(TIME_FORMAT)}</Typography>
      </Toolbar>
    </AppBar>
  )
}

export default Header
