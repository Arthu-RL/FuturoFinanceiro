import { useEffect, useRef, useState } from 'react';

type UseIsIntersection = {
  delay?: number;
  isResetEnabled?: boolean;
  options: { threshold: number; rootMargin: `${number}px` };
};

export const useIsIntersecting = <T extends HTMLElement>({
  options,
  delay = 0,
  isResetEnabled = false,
}: UseIsIntersection) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef<T>(null);

  useEffect(() => {
    const elementRef = ref.current;
    if (!elementRef) return;

    function handleUpdateIntersectingState(entry: IntersectionObserverEntry) {
      if (isResetEnabled) setIsIntersecting(entry.isIntersecting);
      if (!isResetEnabled && entry.isIntersecting) setIsIntersecting(true);
    }

    const callback = ([entry]: IntersectionObserverEntry[]) => {
      if (delay <= 0) handleUpdateIntersectingState(entry);
      else setTimeout(() => handleUpdateIntersectingState(entry), delay);
    };

    const intersectionObserver = new IntersectionObserver(callback, { ...options, root: null });

    intersectionObserver.observe(elementRef);
    return () => intersectionObserver.unobserve(elementRef);
  }, [delay, options, isResetEnabled, isIntersecting]);

  return { ref, isIntersecting };
};
