import { FC } from 'react';
import { RoutesProvider, QueryClientProvider } from './routes';
import { BrowserRouter } from 'react-router-dom';

import './App.scss';

export const App: FC = () => {
  return (
    <BrowserRouter>
      <QueryClientProvider>
        <RoutesProvider />
      </QueryClientProvider>
    </BrowserRouter>
  );
};
