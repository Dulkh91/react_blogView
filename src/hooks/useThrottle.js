import { useRef, useCallback } from 'react';

const useThrottleCallback = (callback, delay = 1000) => {
  const isThrottled = useRef(false);

  const throttledFn = useCallback(
    (...args) => {
      if (isThrottled.current) return;

      isThrottled.current = true;

      try {
        const result = callback(...args);
        // Support async callback
        if (result instanceof Promise) {
          result.finally(() => {
            setTimeout(() => {
              isThrottled.current = false;
            }, delay);
          });
        } else {
          setTimeout(() => {
            isThrottled.current = false;
          }, delay);
        }
      } catch (err) {
        isThrottled.current = false;
        throw err;
      }
    },
    [callback, delay]
  );

  return throttledFn;
};

export default useThrottleCallback;