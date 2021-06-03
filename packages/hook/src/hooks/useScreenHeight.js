import { useState, useEffect } from '@/lib/tini-hook';
let currentScreenHeight = 0;

const useScreenHeight = () => {
  const [screenHeight, setScreenHeight] = useState(currentScreenHeight);
  useEffect(() => {
    my &&
      my.getSystemInfo({
        success: (systemInfo) => {
          const nextScreenHeight = systemInfo.screenHeight;
          if (nextScreenHeight !== screenHeight) {
            currentScreenHeight = nextScreenHeight;
            setScreenHeight(systemInfo.screenHeight);
          }
        },
      });
  }, []);
  return screenHeight;
};

export default useScreenHeight;
