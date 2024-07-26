import { Button, Typography, styled, Stack, IconButton } from '@mui/material';
import { removeFromCart } from '../../redux/slice/CartSlice';
import Counter from '../../components/organisms/Counter';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material';
import closebutton from '../../assets/closebutton.svg';

const StyledNavLink = styled(NavLink)(() => ({
  color: 'rgba(40, 40, 40, 1)',
  textDecoration: 'none',
  '&:hover': {
    cursor: 'pointer',
  },
}));

const Image = styled('img')(() => ({
  width: '200px',
  height: '200px',
  objectFit: 'cover',
}));

const CartItem = ({ item, updateCount }) => {
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const deleteItem = (id) => {
    dispatch(removeFromCart(id));
    updateCount();
  };

  return (
    <Stack
      sx={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: '30px',
        padding: '10px',
        height: '180px',
        overflow: 'hidden',
        borderRadius: '10px',
        border: '1px solid #e0e0e0',
        justifyContent: 'space-between',
      }}
    >
      <Image src={`http://localhost:3333/${item.image}`} alt={item.title} />
      <Stack
        sx={{
          gap: isSmallScreen ? '10px' : '30px',
          alignItems: 'flex-start',
          flex: 1,
        }}
      >
        <Stack
          sx={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <StyledNavLink to={`/products/${item.id}`}>
            <Typography
              variant={isSmallScreen ? 'subtitle1' : 'h5'}
              sx={{
                lineHeight: '1.2',
                fontWeight: '300',
                '&:hover': {
                  fontWeight: 'bold',
                },
              }}
            >
              {item.title}
            </Typography>
          </StyledNavLink>
          <IconButton
            variant="outline-secondary"
            size="sm"
            onClick={() => deleteItem(item.id)}
            sx={{
              padding: 0,
              marginRight: '0 !important',
              marginLeft: 'auto',
              '&:hover': { color: 'blue' },
            }}
          >
            <img src={closebutton} alt="closebutton" />
          </IconButton>
        </Stack>
        <Stack
          sx={{
            flexDirection: isSmallScreen ? 'column' : 'row',
            gap: isSmallScreen ? '5px' : '30px',
            alignItems: 'center',
          }}
        >
          <Counter item={item} cart />
          {item.discont_price ? (
            <Stack
              sx={{ flexDirection: 'row', gap: '5px', alignItems: 'center' }}
            >
              <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                ${item.discont_price}
              </Typography>
              <Typography
                sx={{
                  color: 'rgba(139, 139, 139, 1)',
                  textDecoration: 'line-through',
                  fontSize: '20px',
                }}
              >
                ${item.price}
              </Typography>
            </Stack>
          ) : (
            <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
              ${item.price}
            </Typography>
          )}
        </Stack>
      </Stack>
    </Stack>
  );
};
export default CartItem;
