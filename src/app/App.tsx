import { FC } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClientProvider, RoutesProvider } from './providers';

import './styles/model.scss';

export const App: FC = () => {
  return (
    <BrowserRouter>
      <QueryClientProvider>
        <RoutesProvider />
      </QueryClientProvider>
    </BrowserRouter>
  );
};
