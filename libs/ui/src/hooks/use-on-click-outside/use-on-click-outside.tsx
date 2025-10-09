import { useEffect, MutableRefObject } from 'react';

const MOUSEDOWN = 'mousedown';
const TOUCHSTART = 'touchstart';

type HandledEvents = [typeof MOUSEDOWN, typeof TOUCHSTART];

interface IUseOnClickOutside<T extends HTMLElement> {
  ref: MutableRefObject<T>;
  handler: (event?: MouseEvent | TouchEvent) => void;
}

const events: HandledEvents = [MOUSEDOWN, TOUCHSTART];

const useOnClickOutside = <T extends HTMLElement>({ ref, handler }: IUseOnClickOutside<T>) => {
  useEffect(
    () => {
      const listener = (event: MouseEvent | TouchEvent) => {
        if (!ref.current || ref.current.contains(event.target as Node)) {
          return;
        }

        handler(event);
      };

      events.map((event) => document.addEventListener(event, listener));

      return () => {
        events.map((event) => document.removeEventListener(event, listener));
      };
    },
    // Add ref and handler to effect dependencies
    // It's worth noting that because passed in handler is a new ...
    // ... function on every render that will cause this effect ...
    // ... callback/cleanup to run every render. It's not a big deal ...
    // ... but to optimize you can wrap handler in useCallback before ...
    // ... passing it into this hook.
    [ref, handler],
  );
};

export default useOnClickOutside;
