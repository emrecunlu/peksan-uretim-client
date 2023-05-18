import BottomButton from '@/components/buttons/BottomButton'
import { ProductionType } from '@/utils/interfaces/enums/ProductionType'
import { green } from '@mui/material/colors'
import { MdGavel } from 'react-icons/md'
import { useMemo } from 'react'
import ProductionRepository from '@/repositories/ProductionRepository'
import { useEmployee } from '@/store/features/employee'
import moment from 'moment'
import EmployeeHelper from '@/utils/helpers/EmployeeHelper'
import ProductionHelper from '@/utils/helpers/ProductionHelper'
import ScaleHelper from '@/utils/helpers/ScaleHelper'
import { useProduction } from '@/store/features/production'

const UretButton = () => {
  const { productionType, terazi, minMax } = useProduction()
  const { employee, machine, workOrder } = useEmployee()

  const handleClick = async () => {
    const shift = EmployeeHelper.getShift()
    const hostName = await window.api.getHostName()

    const result = (
      await ProductionRepository.addProduction({
        adet: terazi.adet,
        bAgirlik: minMax.birimAgirlik,
        brut: terazi.brut,
        ciid: workOrder!.yedek2,
        dara: terazi.dara,
        isemriNo: workOrder!.isemrino,
        lotNo: `${moment().format('YYYYMMDD')}${shift}${EmployeeHelper.getFormattedWorkorder(
          workOrder!.isemrino
        )}`,
        makId: parseInt(machine!.machineCode),
        net: terazi.net,
        personelId: parseInt(employee!.staffCode),
        stokKodu: workOrder!.stokKodu,
        terazi: hostName,
        uretTip: productionType,
        vardiya: shift.toString(),
        yapKod: workOrder!.yapkod,
        sipNo: null
      })
    ).data

    if (!result.success) {
      return
    }

    ProductionHelper.successProduction(parseInt(workOrder!.yedek2), workOrder!.isemrino)
    window.electron.ipcRenderer.send('print-label', result.data)
  }

  const isEnabled = useMemo(() => {
    let enabled = false

    switch (productionType) {
      case ProductionType.Uretim:
        return ScaleHelper.minMaxControll(terazi, minMax)
      case ProductionType.Numune:
        return true
      case ProductionType.YarimKoli:
        return true
      case ProductionType.Fire:
        return terazi.dara > 0.1
    }

    return enabled
  }, [productionType, terazi])

  return (
    <>
      <BottomButton
        onClick={handleClick}
        disabled={!isEnabled}
        sx={{ bgcolor: green[800], '&:hover': { bgcolor: green[600] }, '&:disabled': green[300] }}
        icon={<MdGavel size={32} />}
      >
        ÜRET
      </BottomButton>
    </>
  )
}

export default UretButton
