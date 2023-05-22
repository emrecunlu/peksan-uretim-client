import CustomDialog from '@/components/common/CustomDialog'
import store from '@/store'
import { useState, useEffect } from 'react'
import { DialogContent, DialogActions, Button, Typography } from '@mui/material'
import WorkOrderRepository from '@/repositories/WorkOrderRepository'
import { setMinMax, useProduction } from '@/store/features/production'
import { useEmployee } from '@/store/features/employee'
import { MdDone } from 'react-icons/md'

const MinMaxControlModal = () => {
  const [open, setOpen] = useState<boolean>(false)

  const { minMax } = useProduction()
  const { workOrder } = useEmployee()

  const minMaxControll = async () => {
    const { data: result } = (await WorkOrderRepository.getMinMax(workOrder?.isemrino ?? '')).data

    if (result.birimAgirlik !== minMax.birimAgirlik) {
      setOpen(true)
      store.dispatch(setMinMax(result))

      return
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      minMaxControll()
    }, 30000)

    return () => {
      clearInterval(interval)
    }
  }, [store.dispatch, minMax])

  return (
    <>
      <CustomDialog
        maxWidth="lg"
        fullWidth
        open={open}
        title="Uyarı!"
        onClose={() => setOpen(false)}
      >
        <DialogContent>
          <Typography variant="h6">
            Ürün gramajı kalite tarafından değiştirildi, teraziyi kontrol ediniz!
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setOpen(false)}
            size="large"
            variant="contained"
            startIcon={<MdDone />}
          >
            Tamam
          </Button>
        </DialogActions>
      </CustomDialog>
    </>
  )
}

export default MinMaxControlModal
