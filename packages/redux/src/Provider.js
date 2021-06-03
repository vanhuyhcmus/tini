const Provider = (createStore) => (options) => {
  const store = createStore();
  options.store = store;
  return options;
};

export default Provider;
