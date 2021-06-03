import getStore from '../utils/getStore';

const useDispatch = () => () => {
  return getStore().dispatch;
};

export default useDispatch;
