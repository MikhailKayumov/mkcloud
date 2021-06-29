import { useEffect, useRef } from 'react';

export const usePrevious = <T = unknown>(value: T): T => {
  const previous = useRef<T>(value);

  useEffect(() => {
    previous.current = value;
  }, [value]);

  return previous.current;
};
