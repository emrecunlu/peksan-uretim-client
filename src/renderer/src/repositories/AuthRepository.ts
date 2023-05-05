import {
  IApiGetListResult,
  IApiGetObjectResult,
  IApiPostResult
} from '@/utils/interfaces/ApiResult'
import { IEmployee } from '@/utils/interfaces/Employee'
import { IMachine } from '@/utils/interfaces/Machine'
import { IQuestion } from '@/utils/interfaces/Question'
import { ISaveQuestionsDto } from '@/utils/interfaces/dto/SaveQuestionsDto'
import instance from '@/utils/services/ApiService'
import { AxiosResponse } from 'axios'

class AuthRepository {
  private static _uri: string = '/giris'

  static async getEmployeeAndMachines() {
    return instance.get<IApiGetObjectResult<{ machines: IMachine[]; staffs: IEmployee[] }>>(
      this._uri
    )
  }

  static async getHygenieQuestions(workingArea: number) {
    return instance.get<IApiGetListResult<IQuestion>>(
      `${this._uri}/questions?workingArea=${workingArea}`
    )
  }

  static async sendQuestionsAnwers(data: ISaveQuestionsDto) {
    return instance.post<ISaveQuestionsDto, AxiosResponse<IApiPostResult>>(
      `${this._uri}/hygiene-add`,
      data
    )
  }
}

export default AuthRepository
