import GlobalQueue from '../GlobalQueue';
import deepCompare from '../utils/deepCompare';

const useMemo = (callback, listenStates, allowDeepCompare = false) => {
  if (!listenStates) {
    throw new Error('Listen states not null');
  }

  const currentId = GlobalQueue.getNextId();
  const component = GlobalQueue.component;
  const store = component.store;

  // Khởi đầu
  if (!(currentId in store)) {
    const value = callback();
    store[currentId] = { listenStates, value };
    return value;
  }

  const { listenStates: prevListenStates, value: prevValue } = store[currentId] || {};

  let equal = prevListenStates.length === listenStates.length;

  if (!allowDeepCompare) {
    for (let i = 0; i < prevListenStates.length; i++) {
      equal = equal && prevListenStates[i] === listenStates[i];
    }
  } else {
    equal = equal && deepCompare(prevListenStates, listenStates);
  }

  if (!equal) {
    const value = callback();
    store[currentId] = { value, listenStates };
    return value;
  } else {
    return prevValue;
  }
};

export default useMemo;
