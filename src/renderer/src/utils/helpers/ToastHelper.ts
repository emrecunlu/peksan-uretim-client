import { toast } from 'react-toastify'

class ToastHelper {
  static success(message: String) {
    return toast.success(message)
  }

  static error(message: String) {
    return toast.error(message)
  }
}

export default ToastHelper
