let __electron_toolkit_preload = require("@electron-toolkit/preload");
let electron = require("electron");
const api = {
	getBacklogGames: (queryOptions) => electron.ipcRenderer.invoke("get-backlog-games", queryOptions),
	getBacklogPageAmount: (itemsPerPage) => electron.ipcRenderer.invoke("get-backlog-page-amount", itemsPerPage),
	getBacklogGameById: (id) => electron.ipcRenderer.invoke("get-backlog-game-by-id", id),
	editBacklogGame: (game) => electron.ipcRenderer.invoke("edit-backlog-game", game),
	getSettings: () => electron.ipcRenderer.invoke("get-settings")
};
if (process.contextIsolated) try {
	electron.contextBridge.exposeInMainWorld("electron", __electron_toolkit_preload.electronAPI);
	electron.contextBridge.exposeInMainWorld("api", api);
} catch (error) {
	console.error(error);
}
else {
	window.electron = __electron_toolkit_preload.electronAPI;
	window.api = api;
}
