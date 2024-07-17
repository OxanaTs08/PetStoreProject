import { BrowserRouter, Routes, Route } from 'react-router-dom'
import styled from '@emotion/styled'
import {Box} from '@mui/material'
import Header from './components/Header'

const MainContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
});

const Content = styled(Box)({
  flex: '1 0 auto',
});

const AppRouter = () => {
  return (
    <BrowserRouter>
      <MainContainer>
        <Header />
        <Content>
          <Routes>
            {/* <Route path="/" element={<ProductList setCount={setCount} />} /> */}
            </Routes>
        </Content>
        {/* <Footer /> */}
      </MainContainer>
    </BrowserRouter>
  )
}

export default AppRouter

