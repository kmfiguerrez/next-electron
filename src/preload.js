const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  getURL: () => ipcRenderer.invoke("getURL"),
  getCookie: () => ipcRenderer.invoke("getCookie")
})
