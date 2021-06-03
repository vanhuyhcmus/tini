import GlobalQueue from '../GlobalQueue';

const useState = (defaultValue) => {
  const currentId = GlobalQueue.getNextId();
  const component = GlobalQueue.component;
  const store = component.store;

  const { value: prevValue, setValue: prevSetValue } = store[currentId] || {};

  let value = null;
  let setValue = null;

  if (!(currentId in store)) {
    value = defaultValue;
  } else {
    value = prevValue;
    setValue = prevSetValue;
    if (!setValue) {
      setValue = (value, forceChange = true) => {
        let _value = value;
        if (typeof value === 'function') {
          _value = value(store[currentId].value);
        }

        store[currentId] = { value: _value, setValue };
        forceChange && component.triggerChange();
      };
    }
  }

  store[currentId] = { value, setValue };

  return [value, setValue];
};

export default useState;
