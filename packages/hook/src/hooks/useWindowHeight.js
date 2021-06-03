import { useState, useEffect } from '@/lib/tini-hook';
let currentWindowHeight = 0;

const useWindowHeight = () => {
  const [windowHeight, setWindowHeight] = useState(currentWindowHeight);
  useEffect(() => {
    my &&
      my.getSystemInfo({
        success: (systemInfo) => {
          const nextWindowHeight = systemInfo.windowHeight;
          if (nextWindowHeight !== windowHeight) {
            currentWindowHeight = nextWindowHeight;
            setWindowHeight(systemInfo.windowHeight);
          }
        },
      });
  }, []);
  return windowHeight;
};

export default useWindowHeight;
