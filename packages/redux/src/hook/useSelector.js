import { useState, useEffect } from '@tini/hook';
import getStore from '../utils/getStore';

const useSelector = (selector) => {
  const store = getStore();
  const [value, setValue] = useState(selector(store.getState()));
  useEffect(() => {
    setValue(selector(store.getState()));
    return store.subscribe(() => {
      setValue(selector(store.getState()));
    });
  }, []);
  return value;
};

export default useSelector;
