import { FC, PropsWithChildren } from 'react';
import {
  QueryClient,
  QueryClientProvider as LQueryClientProvider,
  QueryCache,
} from 'react-query';

import { ReactQueryDevtools } from 'react-query/devtools';

const client = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    },
  },
  queryCache: new QueryCache({}),
});

interface IQueryClientProviderProps extends PropsWithChildren {}

export const QueryClientProvider: FC<IQueryClientProviderProps> = ({
  children,
}) => {
  return (
    <LQueryClientProvider client={client}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </LQueryClientProvider>
  );
};
