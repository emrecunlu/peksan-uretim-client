export interface IApiGetListResult<T> {
  data: T[]
  success: boolean
}
export interface IApiGetObjectResult<T> {
  data: T
  success: boolean
}
export interface IApiPostObjectResult<T> {
  data: T
  success: boolean
  message: string
}
export interface IApiPostListResult<T> {
  data: T[]
  success: boolean
  message: string
}
export interface IApiErrorResult {
  Success: boolean
  Message: string
}
export interface IApiPostResult {
  success: boolean
  message: string
}
