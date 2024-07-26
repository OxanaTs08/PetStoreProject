import { Typography, Stack } from '@mui/material';
import CartItem from './CartItem';
import CartItemMobile from './CartItemMobile';
import MainButton from '../../components/organisms/MainButton';
import { NavLink } from 'react-router-dom';
import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material';

const CartList = ({ cartList, updateCount }) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const isTabletScreen = useMediaQuery(theme.breakpoints.down('md'));
  const isMediumScreen = useMediaQuery(theme.breakpoints.down('lg'));

  return (
    <Stack sx={{ gap: '16px' }}>
      {cartList.length === 0 ? (
        <Stack
          sx={{
            flexDirection:
              isSmallScreen || isTabletScreen || isMediumScreen
                ? 'column'
                : 'row',
            gap: '30px',
          }}
        >
          <Typography>
            Looks like you have no items in your basket currently.
          </Typography>
          <NavLink to="/products/">
            <MainButton buttonText="Continue shopping" />
          </NavLink>
        </Stack>
      ) : (
        cartList.map((item) =>
          isSmallScreen ? (
            <CartItemMobile
              key={item.id}
              item={item}
              updateCount={updateCount}
            />
          ) : (
            <CartItem key={item.id} item={item} updateCount={updateCount} />
          ),
        )
      )}
    </Stack>
  );
};

export default CartList;
