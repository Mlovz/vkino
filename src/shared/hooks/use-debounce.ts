import { useEffect, useState } from 'react';

export const useDebounce = <T>(value: T, delay: number): T => {
  const [v, setV] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setV(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return v;
};
