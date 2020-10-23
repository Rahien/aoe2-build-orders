import {useEffect, useRef} from "react";

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