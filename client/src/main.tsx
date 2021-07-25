import { ChakraProvider } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools'
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

const queryClient = new QueryClient()

ReactDOM.render(
  <ChakraProvider>
    <QueryClientProvider client={queryClient}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
      <ReactQueryDevtools />
    </QueryClientProvider>
  </ChakraProvider>,
  document.getElementById('root')
);