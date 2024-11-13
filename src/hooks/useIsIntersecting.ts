import { useEffect, useRef, useState } from 'react';

type UseIsIntersection = {
  isResetEnabled?: boolean;
  options: { threshold: number; rootMargin: `${number}px` };
};

export const useIsIntersecting = <T extends HTMLElement>({
  options,
  isResetEnabled = false,
}: UseIsIntersection) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef<T>(null);

  useEffect(() => {
    const elementRef = ref.current;
    if (!elementRef) return;

    const callback = ([entry]: IntersectionObserverEntry[]) => {
      if (isResetEnabled) setIsIntersecting(entry.isIntersecting);
      if (!isResetEnabled && entry.isIntersecting) setIsIntersecting(true);
    };

    const intersectionObserver = new IntersectionObserver(callback, { ...options, root: null });

    intersectionObserver.observe(elementRef);
    return () => intersectionObserver.unobserve(elementRef);
  }, [options, isResetEnabled, isIntersecting]);

  return { ref, isIntersecting };
};
