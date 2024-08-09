import React from 'react';
import { Box, createTheme, ThemeProvider } from '@mui/material';
import { LangProvider } from './components/context/LangProvider';
import { QueryClientProvider, QueryClient } from 'react-query';
import Header from './components/layout/Header';
import PlayField from './components/layout/PlayField';

function App() {
  const queryClient = new QueryClient();

  const THEME = createTheme({
    typography: {
      "fontFamily": '"Raleway", sans-serif',
      "fontSize": 14,
      "fontWeightRegular": 400
    },
  });

  return (
    <ThemeProvider theme={THEME}>
      <QueryClientProvider client={queryClient}>
        <LangProvider>
          <Box className="app">
            <Header />
            <PlayField />
          </Box>
        </LangProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
