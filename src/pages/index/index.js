import withTiniHook, { useState, useCallback, useEffect, useMemo } from '../../../packages/hook';

Page(
  withTiniHook(() => {
    const [abc, setAbc] = useState(1);
    const onTap = useCallback(() => {
      setAbc((abc) => abc + 1);
    }, []);

    const obj = useMemo(() => ({ abc }), [abc]);

    useEffect(() => {
      console.log('didMount');
      return () => {
        console.log('didUnmount');
      };
    }, []);
    return [{ abc, obj }, { onTap }];
  })(),
);
