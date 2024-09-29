import { Button } from '@/components/ui/button';
import { useTheme } from '@/hooks/useTheme';
import { Moon, Sun } from 'lucide-react';

import { DropdownMenu, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

export const ThemeButton = () => {
  const { theme, updateTheme } = useTheme();

  function toggleTheme() {
    updateTheme(theme === 'dark' ? 'light' : 'dark');
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger onClick={toggleTheme} className='mt-auto max-sm:ml-auto max-sm:mt-0'>
        <Button
          variant='outline'
          className='group size-10 rounded-full border-none bg-stone-900 p-2 hover:bg-stone-800 data-[state=open]:pointer-events-none data-[state=open]:bg-stone-800 max-sm:size-9'
        >
          <Sun className='h-[1.4rem] w-[1.4rem] rotate-0 scale-100 stroke-stone-400 transition-all duration-300 ease-in-out group-hover:stroke-white dark:-rotate-90 dark:scale-0' />
          <Moon className='absolute h-[1.4rem] w-[1.4rem] rotate-90 scale-0 stroke-stone-400 transition-all duration-300 ease-in-out group-hover:stroke-white dark:rotate-0 dark:scale-100' />
        </Button>
      </DropdownMenuTrigger>
    </DropdownMenu>
  );
};
