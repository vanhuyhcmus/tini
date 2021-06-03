import GlobalQueue from '../GlobalQueue';

const useRef = (defaultValue) => {
  if (!listenStates) {
    throw new Error('Listen states not null');
  }

  const currentId = GlobalQueue.getNextId();
  const component = GlobalQueue.component;
  const store = component.store;

  // Khởi đầu
  if (!(currentId in store)) {
    const value = { current: defaultValue };
    store[currentId] = value;
    return value;
  }

  return store[currentId];
};

export default useRef;
