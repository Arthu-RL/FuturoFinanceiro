import { cn } from '@/lib/utils';
import { ElementType } from 'react';

export const Feature = ({
  title,
  description,
  Icon,
  index,
}: {
  title: string;
  description: string;
  Icon: ElementType;
  index: number;
}) => {
  return (
    <div
      className={cn(
        'group/feature relative flex h-full w-full cursor-pointer select-none flex-col py-10 dark:border-neutral-800 max-sm:py-6 lg:border-r',
        (index === 0 || index === 4) && 'dark:border-neutral-800 lg:border-l',
        index < 4 && 'dark:border-neutral-800 lg:border-b',
      )}
    >
      {index < 4 && (
        <div className='pointer-events-none absolute inset-0 h-full w-full bg-gradient-to-t from-neutral-100 to-transparent opacity-0 transition duration-200 group-hover/feature:opacity-100 dark:from-neutral-800' />
      )}
      {index >= 4 && (
        <div className='pointer-events-none absolute inset-0 h-full w-full bg-gradient-to-b from-neutral-100 to-transparent opacity-0 transition duration-200 group-hover/feature:opacity-100 dark:from-neutral-800' />
      )}
      <div className='relative z-10 mb-4 px-10 text-neutral-600 dark:text-neutral-400'>
        <Icon />
      </div>
      <div className='relative z-10 mb-2 px-10 text-lg font-bold max-sm:px-6'>
        <div className='absolute inset-y-0 left-0 h-6 w-1 origin-center rounded-br-full rounded-tr-full bg-neutral-300 transition-all duration-200 group-hover/feature:h-8 group-hover/feature:bg-foreground dark:bg-neutral-700' />
        <span className='inline-block text-neutral-800 transition duration-200 group-hover/feature:translate-x-2 dark:text-neutral-100 max-sm:pl-0 max-sm:pr-6'>
          {title}
        </span>
      </div>
      <p className='relative z-10 max-w-xs px-10 text-sm text-neutral-600 dark:text-neutral-300 max-sm:max-w-full max-sm:px-6'>
        {description}
      </p>
    </div>
  );
};
