import React, {useCallback, useEffect, useRef, useState} from "react";

export const useClickOutside = (onClickOutside:()=>void) => {
  const menuRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const current = menuRef.current;
      if (current && !current.contains(event.target as HTMLElement)) {
        onClickOutside();
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef, onClickOutside]);

  return menuRef;
}

export const useLongPress = (
  onLongPress:(times:number)=>void,
  onClick:(times:number)=>void,
  { shouldPreventDefault = true, delay = 300 } = {}
) => {
  const [longPressTriggered, setLongPressTriggered] = useState(false);
  const timeout = useRef<number|null>();
  const target = useRef<HTMLElement>();
  const times = useRef<number>(1);
  const start = useCallback(
    event => {
      if (shouldPreventDefault && event.target) {
        event.target.addEventListener("touchend", preventDefault, {
          passive: false
        });
        target.current = event.target;
      }
      times.current = 1;
      timeout.current = window.setInterval(() => {
        onLongPress(times.current);
        times.current = times.current + 1;
        setLongPressTriggered(true);
      }, delay);
    },
    [onLongPress, delay, shouldPreventDefault, times]
  );

  const clear = useCallback(
    (event, shouldTriggerClick = true) => {
      timeout.current && clearInterval(timeout.current);
      shouldTriggerClick && !longPressTriggered && onClick(1);
      setLongPressTriggered(false);
      if (shouldPreventDefault && target.current) {
        target.current?.removeEventListener("touchend", preventDefault);
      }
    },
    [shouldPreventDefault, onClick, longPressTriggered]
  );

  return {
    onMouseDown: (e:React.MouseEvent) => start(e),
    onTouchStart: (e:React.TouchEvent) => start(e),
    onMouseUp: (e:React.MouseEvent) => clear(e),
    onMouseLeave: (e:React.MouseEvent) => clear(e, false),
    onTouchEnd: (e:React.TouchEvent) => clear(e)
  };
};

const isTouchEvent = (event:Event) => {
  return "touches" in event;
};

const preventDefault = (event:Event) => {
  if (!isTouchEvent(event)) return;

  if ((event as unknown as React.TouchEvent).touches.length < 2 && event.preventDefault) {
    event.preventDefault();
  }
};

export function useSetting<T>(settingName:string, defaultValue:T):T{
  const value = JSON.parse(window.localStorage.getItem('settings') || "{}")[settingName];
  const [state] = useState(typeof value === "undefined"? defaultValue: value);
  return state;
}