import { useState, useEffect } from 'react';
import throttle from 'lodash.throttle';

export const getDeviceConfig = (width) => {
  let size = 'xs';
  if (width >= 320 && width < 720) {
    size = 'sm';
  } if (width >= 720 && width < 1024) {
    size = 'md';
  } if (width >= 1024 && width < 1580) {
    size = 'lg';
  } if (width >= 1580) {
    size = 'xl';
  }
  return size;
};

const useBreakpoint = () => {
  const [brkPnt, setBrkPnt] = useState(() => getDeviceConfig(window.innerWidth));

  useEffect(() => {
    const calcInnerWidth = throttle(() => {
      setBrkPnt(getDeviceConfig(window.innerWidth));
    }, 200);
    window.addEventListener('resize', calcInnerWidth);
    return () => window.removeEventListener('resize', calcInnerWidth);
  }, []);

  return brkPnt;
};
export default useBreakpoint;
