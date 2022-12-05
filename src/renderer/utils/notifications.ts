const sendNotification = (message: string) => {
  electron.ipcRenderer.sendMessage('notify', { message });
};

export default {
  sendNotification,
};
