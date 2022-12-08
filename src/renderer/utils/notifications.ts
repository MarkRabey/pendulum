const sendNotification = (message: string) => {
  window.electron.sendMessage(message);
};

export default {
  sendNotification,
};
