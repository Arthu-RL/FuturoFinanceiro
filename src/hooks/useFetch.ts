import { useState, useEffect, useRef } from 'react';
import { toast } from 'sonner';

export const useFetch = <T>(promise: () => Promise<Response>) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const promiseRef = useRef<() => Promise<Response>>();
  const [data, setData] = useState<T | null>(null);

  useEffect(() => {
    promiseRef.current = promise;
  }, [promise]);

  useEffect(() => {
    (async () => {
      if (!promiseRef.current) return;
      setIsLoading(true);

      try {
        const response = await promiseRef.current();
        const data: T = await response.json();
        setData(data);
      } catch (error) {
        console.error(error);
        toast.error('Ocorreu um erro ao processar sua solicitação. Por favor, tente novamente.');
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  return { data, isLoading };
};
