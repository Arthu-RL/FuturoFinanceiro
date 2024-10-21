import { BrowserRouter as Router } from 'react-router-dom';
import { NavigationBar } from '@/components/Navigation/NavigationBar/NavigationBar';
import { Toaster } from './components/ui/sonner';
import { ThemeProvider } from './providers/themeProvider';
import { InvestmentAssetsProvider } from './providers/InvestmentAssetsProvider';
import { MarketRefreshProvider } from './providers/marketRefreshProvider';
import { UserAccountProvider } from './providers/userAccountProvider';

import Routes from '@/routes';

import '@/stylesheets/globals.css';

export default function App() {
  return (
    <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
      <InvestmentAssetsProvider>
        <UserAccountProvider>
          <MarketRefreshProvider>
            <Router>
              <NavigationBar />
              <main className='pb-12 pl-28 pr-14 pt-6 max-2xl:min-h-screen max-2xl:pl-24 max-2xl:pr-9 max-2xl:pt-8 max-sm:px-4 max-sm:pt-20 2xl:h-screen'>
                <Routes />
              </main>
            </Router>
            <Toaster position='top-right' richColors visibleToasts={3} />
          </MarketRefreshProvider>
        </UserAccountProvider>
      </InvestmentAssetsProvider>
    </ThemeProvider>
  );
}
