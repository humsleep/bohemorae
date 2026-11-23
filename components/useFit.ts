"use client";

import { useCallback, useRef, useSyncExternalStore } from "react";

// 고정 폭(base)으로 그린 화면을 담는 상자 폭에 맞춰 줄일 배율.
// 붙자마자 한 번 재고(첫 화면부터 맞는 크기), 상자 폭이 바뀌면 다시 잰다. 서버에서는 guess를 쓴다
export function useFit<T extends HTMLElement>(base: number, guess = 0.45) {
  const ref = useRef<T>(null);
  const subscribe = useCallback((onChange: () => void) => {
    const el = ref.current;
    if (!el) return () => {};
    const ro = new ResizeObserver(onChange);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  const z = useSyncExternalStore(
    subscribe,
    () => (ref.current ? ref.current.clientWidth / base : guess),
    () => guess,
  );
  return [ref, z] as const;
}
