class PortHelper {
  static async getSerialPorts() {
    return await window.api.getSerialPorts()
  }
}

export default PortHelper
