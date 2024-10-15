import { useEffect, useRef } from 'react';

export const usePreviousValue = (value: number) => {
  const previousValue = useRef(value);

  useEffect(() => {
    return () => {
      previousValue.current = value;
    };
  }, [value]);

  return { value, previousValue: previousValue.current };
};
