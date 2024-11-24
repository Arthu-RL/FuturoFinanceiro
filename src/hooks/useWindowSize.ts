import { useEffect, useState } from 'react';

export const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState(window.innerWidth);

  function onWindowResize() {
    setWindowSize(window.innerWidth);
  }

  useEffect(() => {
    window.addEventListener('resize', onWindowResize);
    return () => window.removeEventListener('resize', onWindowResize);
  }, []);

  return { windowSize };
};
