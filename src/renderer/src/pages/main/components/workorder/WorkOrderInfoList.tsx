import WorkOrderRepository from '@/repositories/WorkOrderRepository'
import { useEmployee } from '@/store/features/employee'
import { MESSAGES } from '@/utils/constants'
import ToastHelper from '@/utils/helpers/ToastHelper'
import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
  Skeleton,
  Stack
} from '@mui/material'
import { Box } from '@mui/material'
import { useEffect, useState } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'

const WorkOrderInfoList = () => {
  const [data, setData] = useState<Record<string, string> | null>(null)
  const { workOrder, machine } = useEmployee()

  const getWorkOrderInfo = async () => {
    const { data: results } = (
      await WorkOrderRepository.getWorkOrderInfo({
        machineId: parseInt(machine!.machineCode),
        workOrder: workOrder!.isemrino
      })
    ).data

    setData(results.workOrderInfo)
  }

  useEffect(() => {
    getWorkOrderInfo()
  }, [workOrder!.isemrino])

  return (
    <Box
      sx={{
        overflowY: 'auto',
        borderRight: 1,
        borderRightColor: (theme) => theme.palette.grey[200],
        width: 400
      }}
    >
      {(data !== null && (
        <List disablePadding>
          {Object.entries(data).map(([key, value], index) => (
            <ListItem
              sx={{
                '&.MuiListItem-root:nth-of-type(even)': {
                  bgcolor: (theme) => theme.palette.grey[100]
                },
                borderBottom: 1,
                borderBottomColor: (theme) => theme.palette.grey[400]
              }}
              disablePadding
              disableGutters
              key={index}
            >
              <CopyToClipboard
                text={value.split(':')[0]}
                onCopy={() => ToastHelper.success(MESSAGES['copy-to-clipboard'])}
              >
                <ListItemButton>
                  <ListItemText
                    primary={
                      <Typography sx={{ fontWeight: '600', fontSize: 18 }}>
                        {key}: {value}
                      </Typography>
                    }
                  ></ListItemText>
                </ListItemButton>
              </CopyToClipboard>
            </ListItem>
          ))}
        </List>
      )) || (
        <Stack direction="column" spacing={1}>
          {Array(18)
            .fill('')
            .map((val, index) => (
              <Skeleton
                key={index}
                height={40}
                width="100%"
                variant="rectangular"
                animation="wave"
              />
            ))}
        </Stack>
      )}
    </Box>
  )
}

export default WorkOrderInfoList
