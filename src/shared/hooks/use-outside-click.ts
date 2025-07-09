import { useEffect, useRef } from 'react';

type UseOutsideClickProps = {
  fn: () => void;
  enabled?: boolean;
};

export const useOutsideClick = <T extends HTMLElement = HTMLElement>({
  fn,
  enabled = true,
}: UseOutsideClickProps) => {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (!enabled) return;

    const onOutsideClick = (event: MouseEvent) => {
      const c = ref.current;

      if (c && !c.contains(event.target as Node)) {
        fn();
      }
    };

    const onEscapeKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        fn();
      }
    };

    document.addEventListener('mousedown', onOutsideClick);
    document.addEventListener('keydown', onEscapeKey);

    return () => {
      document.removeEventListener('mousedown', onOutsideClick);
      document.removeEventListener('keydown', onEscapeKey);
    };
  }, [fn, enabled]);

  return ref;
};
