import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Paper,
  Stack,
  Typography,
  Grid,
  Chip,
  Divider
} from '@mui/material'
import { useEffect } from 'react'
import { useEmployee } from '@/store/features/employee'
import { useProduction, fetchMinMaxValue, fetchRemaingValue } from '@/store/features/production'
import store from '@/store'

const RemainingList = () => {
  const { workOrder } = useEmployee()
  const { loading, minMax, produced } = useProduction()

  useEffect(() => {
    store.dispatch(fetchMinMaxValue(workOrder!.isemrino))
    store.dispatch(fetchRemaingValue(parseInt(workOrder!.yedek2)))
  }, [store.dispatch])

  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={4}>
      <Box
        sx={{ width: 400, borderColor: 'grey.200', borderWidth: 1, borderStyle: 'solid' }}
        component={Paper}
      >
        <List disablePadding>
          <Grid container>
            <Grid item xs={6}>
              <ListItem disableGutters disablePadding>
                <ListItemButton>
                  <ListItemText
                    primary={
                      <Typography fontWeight="700" variant="body2" color="red">
                        Min Adet: {minMax.minad}
                      </Typography>
                    }
                  />
                </ListItemButton>
              </ListItem>
            </Grid>
            <Grid item xs={6}>
              <ListItem disableGutters disablePadding>
                <ListItemButton>
                  <ListItemText
                    primary={
                      <Typography fontWeight="700" variant="body2" color="red">
                        Max Adet: {minMax.maxad}
                      </Typography>
                    }
                  />
                </ListItemButton>
              </ListItem>
            </Grid>
            <Grid item xs={6}>
              <ListItem disableGutters disablePadding>
                <ListItemButton>
                  <ListItemText
                    primary={
                      <Typography fontWeight="700" variant="body2" color="red">
                        Min Kg: {minMax.minkg}
                      </Typography>
                    }
                  />
                </ListItemButton>
              </ListItem>
            </Grid>
            <Grid item xs={6}>
              <ListItem disableGutters disablePadding>
                <ListItemButton>
                  <ListItemText
                    primary={
                      <Typography fontWeight="700" variant="body2" color="red">
                        Max Kg: {minMax.maxkg}
                      </Typography>
                    }
                  />
                </ListItemButton>
              </ListItem>
            </Grid>
          </Grid>
        </List>
      </Box>
      <Box sx={{ flex: 1 }}>
        <Grid container spacing={1}>
          <Grid item xs={4}>
            <Box textAlign="center">
              <Typography variant="h6" fontWeight={600} color="error">
                ÜRETİLECEK
              </Typography>
              <Divider sx={{ mt: 1, mb: 2 }} />
              <Chip
                variant="filled"
                color="info"
                label={produced.toBeProducedItem.value}
                sx={{ px: 4, fontSize: 20 }}
              />
            </Box>
          </Grid>

          <Grid item xs={4}>
            <Box textAlign="center">
              <Typography variant="h6" fontWeight={600} color="error">
                ÜRETİLEN
              </Typography>
              <Divider sx={{ mt: 1, mb: 2 }} />
              <Chip
                variant="filled"
                color="success"
                label={produced.produced}
                sx={{ px: 4, fontSize: 20 }}
              />
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box textAlign="center">
              <Typography variant="h6" fontWeight={600} color="error">
                KALAN
              </Typography>
              <Divider sx={{ mt: 1, mb: 2 }} />
              <Chip
                variant="filled"
                color="error"
                label={produced.remaining}
                sx={{ px: 4, fontSize: 20 }}
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Stack>
  )
}

export default RemainingList
