import { FC } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClientProvider, RoutesProvider } from './providers';
import { ScrollToTop } from 'shared/hooks/scrollToTop';
import './styles/global.scss';

export const App: FC = () => {
  return (
    <BrowserRouter basename="/snet">
      <ScrollToTop />
      <QueryClientProvider>
        <RoutesProvider />
      </QueryClientProvider>
    </BrowserRouter>
  );
};
