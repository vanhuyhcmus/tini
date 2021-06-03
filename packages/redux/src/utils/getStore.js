const getStore = () => {
  const app = getApp();
  if (!app.store) throw new Error('Provider yêu cầu được cấu hình ở app.js');
  return app.store;
};

export default getStore;
