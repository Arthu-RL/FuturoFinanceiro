import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import type { ElementType } from 'react';

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from '@/components/ui/sheet';

type NavMenuProps = {
  title: string;
  links: { title: string; href: string }[];
  Icon: ElementType;
};

export const NavigationLinks = ({ title, links, Icon }: NavMenuProps) => {
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
      <SheetContent side='left' className='pl-20 max-sm:w-3/4 max-sm:pl-4'>
        <SheetHeader className='mb-2 max-sm:mb-0'>
          <SheetTitle className='p-2 font-roboto text-xl font-semibold uppercase max-sm:mt-14 max-sm:text-left max-sm:text-lg'>
            {title}
          </SheetTitle>
        </SheetHeader>
        <ul className='flex flex-col items-start gap-1'>
          {links.map(({ title, href }) => (
            <li
              key={title}
              className='w-full cursor-pointer text-nowrap rounded-sm hover:bg-stone-100 hover:dark:bg-slate-900'
            >
              <Link to={href} className='flex w-full'>
                <SheetClose className='h-full w-full p-2 text-start font-poppins text-sm font-medium'>
                  {title}
                </SheetClose>
              </Link>
            </li>
          ))}
        </ul>
      </SheetContent>
    </Sheet>
  );
};
