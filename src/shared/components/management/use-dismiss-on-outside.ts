"use client";

import { useCallback, useEffect, useRef } from "react";

export function useDismissOnOutside<T extends HTMLElement>(open: boolean, onDismiss: () => void) {
  const panelRef = useRef<T>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        panelRef.current &&
        !panelRef.current.contains(event.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        onDismiss();
      }
    }
    if (open) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open, onDismiss]);

  const handleEscape = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Escape") {
        onDismiss();
        triggerRef.current?.focus();
      }
    },
    [onDismiss],
  );

  return { panelRef, triggerRef, handleEscape };
}
