import { useEffect, useRef, useState } from 'react';

const observerOptions: IntersectionObserverInit = {
  root: null,
  threshold: 1,
  rootMargin: '0px',
};

export const useIsIntersecting = <T extends HTMLElement>() => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef<T>(null);

  useEffect(() => {
    const elementRef = ref.current;
    if (!elementRef || isIntersecting) return;

    const callback = ([entry]: IntersectionObserverEntry[]) => setIsIntersecting(entry.isIntersecting);
    const intersectionObserver = new IntersectionObserver(callback, observerOptions);

    intersectionObserver.observe(elementRef);
    return () => intersectionObserver.unobserve(elementRef);
  }, [isIntersecting]);

  return { ref, isIntersecting };
};
