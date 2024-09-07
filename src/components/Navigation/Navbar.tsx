import { ThemeButton } from './ThemeButton';
import { NavMenu } from './NavMenu';
import { NavLogo } from './NavLogo';

export const Navbar = () => {
  return (
    <header className='sticky top-0 z-50 w-full border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
      <div className='container mx-auto flex h-14 max-w-screen-2xl items-center px-8'>
        <NavLogo />
        <NavMenu />
        <ThemeButton />
      </div>
    </header>
  );
};
