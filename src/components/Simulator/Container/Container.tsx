import { Card } from '@/components/ui/card';
import React from 'react';

export function Container({ children }: React.PropsWithChildren<{}>) {
  return (
    <Card className='m-5 mx-auto flex h-[calc(80vw)] max-h-[620px] w-[calc(80vw)] transform cursor-pointer flex-row rounded-lg border border-gray-200 bg-card p-5 text-card-foreground shadow shadow-md transition-transform hover:scale-105 hover:border-gray-300 hover:shadow-lg md:w-auto'>
      {children}
    </Card>
  );
}
