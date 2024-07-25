import MainPage from './MainPage';
import HomePageCategories from './HomePageCategories';
import Discount from './Discount';
import HomePageSale from './HomePageSale';
import { Stack } from '@mui/material';

const HomePage = () => {
  return (
    <Stack sx={{ gap: '80px' }}>
      <MainPage />
      <HomePageCategories />
      <Discount />
      <HomePageSale />
    </Stack>
  );
};

export default HomePage;
