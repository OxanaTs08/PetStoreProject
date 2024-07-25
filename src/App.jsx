import AppRouter from './AppRouter'
import { ThemeProvider } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';

function App() {

  return (
    <ThemeProvider theme={createTheme({})}>
    <>
      <AppRouter />
    </>
    </ThemeProvider>
  )
}

export default App
