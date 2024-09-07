import { BrowserRouter as Router } from 'react-router-dom';
import { Navbar } from '@/components/Navigation/Navbar';
import { ThemeProvider } from './providers/theme-provider';

import Routes from '@/routes';

import '@/stylesheets/index.css';

export default function App() {
  return (
    <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
      <Router>
        <Navbar />
        <Routes />
      </Router>
    </ThemeProvider>
  );
}
