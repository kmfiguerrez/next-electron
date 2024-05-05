export interface IElectronAPI {
  getURL: () => Promise<any>,
}

declare global {
  interface Window {
    electronAPI: IElectronAPI
  }
}