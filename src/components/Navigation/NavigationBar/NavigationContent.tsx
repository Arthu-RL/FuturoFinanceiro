import { Link } from 'react-router-dom';
import { SheetHeader, SheetTitle, SheetClose } from '@/components/ui/sheet';

type NavigationContentProps = {
  heading: string;
  links: { title: string; href: string | (() => void) }[];
};

export const NavigationContent = ({ heading, links }: NavigationContentProps) => {
  return (
    <div className='flex w-full flex-col first:max-sm:mt-12'>
      <SheetHeader>
        <SheetTitle className='p-2 font-roboto text-xl font-semibold uppercase max-sm:text-left max-sm:text-lg'>
          {heading}
        </SheetTitle>
      </SheetHeader>
      <ul className='flex flex-col items-start gap-1'>
        {links.map(({ title, href }) => {
          return (
            <li key={title} className='w-full cursor-pointer text-nowrap rounded-sm hover:bg-accent'>
              {typeof href === 'function' ? (
                <button onClick={href} className='flex w-full'>
                  <SheetClose className='h-full w-full p-2 text-start font-poppins text-sm font-medium'>
                    {title}
                  </SheetClose>
                </button>
              ) : (
                <Link to={href} className='flex w-full'>
                  <SheetClose className='h-full w-full p-2 text-start font-poppins text-sm font-medium'>
                    {title}
                  </SheetClose>
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
