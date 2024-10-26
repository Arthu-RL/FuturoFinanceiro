import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import type { ElementType, ReactNode } from 'react';

type NavMenuProps = {
  Icon: ElementType;
  children: ReactNode;
};

export const NavigationLinks = ({ Icon, children }: NavMenuProps) => {
  return (
    <Sheet>
      <div className='cursor-pointer'>
        <SheetTrigger asChild>
          <Button
            variant='outline'
            className='group size-10 rounded-full border-none bg-stone-900 p-2 hover:bg-stone-800 data-[state=open]:pointer-events-none data-[state=open]:bg-stone-800 max-sm:size-9'
          >
            <Icon className='stroke-stone-400 transition-all duration-300 ease-in-out group-hover:stroke-white group-data-[state=open]:stroke-white' />
          </Button>
        </SheetTrigger>
      </div>
      <SheetContent
        side='left'
        className='flex w-full flex-col gap-4 overflow-y-auto pl-20 max-sm:w-3/4 max-sm:pl-4'
      >
        {children}
      </SheetContent>
    </Sheet>
  );
};
