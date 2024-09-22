import { Card } from '@/components/ui/card';
import type { ReactNode } from 'react';

export function Container({ children }: { children: ReactNode }) {
  return (
    <Card className='mx-auto flex h-[calc(80vw)] max-h-[620px] w-[calc(80vw)] transform flex-row rounded-lg border border-gray-200 bg-card text-card-foreground shadow transition-transform hover:border-gray-300 hover:shadow-lg md:w-auto'>
      {children}
    </Card>
  );
}
