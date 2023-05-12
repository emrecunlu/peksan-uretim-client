import { ITerazi } from '../interfaces/Terazi'
import { IMinMax } from '../interfaces/WorkOrder'

class ScaleHelper {
  static minMaxControll(terazi: ITerazi, minMax: IMinMax) {
    return (
      terazi.dara > 0.1 &&
      terazi.net >= minMax.minkg &&
      terazi.net <= minMax.maxkg &&
      terazi.adet >= minMax.minad &&
      terazi.adet <= minMax.maxad
    )
  }
}

export default ScaleHelper
