import GlobalQueue from '../GlobalQueue';
import deepCompare from '../utils/deepCompare';

const useEffect = (callback, listenStates, allowDeepCompare = false) => {
  if (!listenStates) {
    throw new Error('Listen states not null');
  }

  const currentId = GlobalQueue.getNextId();
  const component = GlobalQueue.component;
  const store = component.store;

  // Khởi đầu
  if (!(currentId in store)) {
    store[currentId] = {};
    return null;
  }

  const { listenStates: prevListenStates, unmount: prevUnmount } = store[currentId] || {};

  let equal = !!prevListenStates && prevListenStates.length === listenStates.length;

  if (!allowDeepCompare) {
    if (prevListenStates) {
      for (let i = 0; i < prevListenStates.length; i++) {
        equal = equal && prevListenStates[i] === listenStates[i];
      }
    }
  } else {
    equal = equal && deepCompare(prevListenStates, listenStates);
  }

  if (!equal) {
    prevUnmount && prevUnmount();
    store[currentId] = { listenStates, unmount: () => {} };
    const unmount = callback();
    store[currentId] = { listenStates, unmount };
    component.lifeCircle.onWillUnmount(unmount);
  }
};

export default useEffect;
