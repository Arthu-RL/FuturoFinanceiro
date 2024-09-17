import { Card } from '@/components/ui/card';
import React from 'react';

export function Container({ children }: React.PropsWithChildren<{}>) {
  return (
    <Card
      style={{
        width: '80vw',
        height: '60vh',
      }}
      className='m-5 mx-auto flex transform cursor-pointer flex-row rounded-lg border border-gray-200 bg-card p-5 text-card-foreground shadow shadow-md transition-transform hover:scale-105 hover:border-gray-300 hover:shadow-lg'
    >
      {children}
    </Card>
  );
}
