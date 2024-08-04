import { FC } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClientProvider } from './providers/QueryClientProvider';
import { RoutesProvider } from './providers/RoutesProvider';

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
