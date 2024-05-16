export interface IElectronAPI {
  getURL: () => Promise<any>,
  getCookie: () => Promise<any>,
}

declare global {
  interface Window {
    electronAPI: IElectronAPI
  }
}