import { ISendMailDto } from '@/utils/interfaces/dto/SendMailDto'
import instance from '@/utils/services/ApiService'
import { AxiosResponse } from 'axios'

class MailRepository {
  private static _uri: string = '/mail'

  static send(data: ISendMailDto) {
    return instance.post<ISendMailDto, AxiosResponse<boolean>>(`${this._uri}`, data)
  }
}

export default MailRepository
