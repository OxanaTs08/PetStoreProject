import { Box, styled, Typography, Stack } from '@mui/material/';
import { NavLink } from 'react-router-dom';
import MainButton from './organisms/MainButton';
import { addToCart, removeFromCart } from '../redux/slice/CartSlice';
import { useDispatch } from 'react-redux';
import DiscountPercentage from './organisms/DiscountPercentage';
import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material';
import { useState } from 'react';

const Image = styled('img')(() => ({
  borderRadius: '10px',
  width: '100%',
  height: '280px',
  objectFit: 'cover',
  position: 'absolute',
  top: 0,
  left: 0,
}));
const StyledNavLink = styled(NavLink)(() => ({
  color: 'rgba(40, 40, 40, 1)',
  textDecoration: 'none',
  '&:hover': {
    cursor: 'pointer',
  },
}));

const ProductCardBox = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
  border: '1px solid rgba(221, 221, 221, 1)',
  borderRadius: '10px',
  position: 'relative',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    '& .add-to-cart-button': {
      opacity: 1,
      visibility: 'visible',
    },
  },
}));

const CartButtonBox = styled(Box)(() => ({
  position: 'absolute',
  bottom: '16px',
  padding: '0 16px',
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  opacity: 0,
  visibility: 'hidden',
  transition: 'opacity 0.3s ease, visibility 0.3s ease',
  zIndex: 1,
}));

const CartMobileButtonBox = styled(Box)(() => ({
  position: 'absolute',
  bottom: '16px',
  padding: '0 16px',
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  zIndex: 1,
}));

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const isTabletScreen = useMediaQuery(theme.breakpoints.down('md'));
  const isBigTabletScreen = useMediaQuery(theme.breakpoints.down('lg'));

  const [inCart, setInCart] = useState(false);

  const handleAddToCartClick = (product) => (event) => {
    event.preventDefault();
    const item = {
      id: product.id,
      title: product.title,
      price: product.price,
      discont_price: product.discont_price,
      image: product.image,
      quantity: 1,
    };
    dispatch(addToCart(item));
    setInCart(true);
  };

  const handleDeleteItem = (product) => (event) => {
    event.preventDefault();
    dispatch(removeFromCart(product.id));
    setInCart(false);
  };

  return (
    <StyledNavLink to={`/products/${product.id}`}>
      <ProductCardBox>
        <Stack
          key={product.id}
          sx={{
            gap: '20px',
            border: ' 1px solid rgba(221, 221, 221, 1)',
            borderRadius: '10px',
            position: 'relative',
          }}
        >
          <Box
            sx={{
              position: 'relative',
              width: '100%',
              height: '284px',
              overflow: 'hidden',
              borderRadius: '10px',
            }}
          >
            <Image
              src={`http://localhost:3333/${product.image}`}
              alt={product.title}
            />
            {product.discont_price && (
              <DiscountPercentage
                price={product.price}
                discountPrice={product.discont_price}
                card
              />
            )}
            {isSmallScreen || isTabletScreen || isBigTabletScreen ? (
              <CartMobileButtonBox>
                <MainButton
                  onClick={
                    inCart
                      ? handleDeleteItem(product)
                      : handleAddToCartClick(product)
                  }
                  buttonText={inCart ? 'Remove from Cart' : 'Add to Cart'}
                  sx={{ width: '100%' }}
                />
              </CartMobileButtonBox>
            ) : (
              <CartButtonBox className="add-to-cart-button">
                <MainButton
                  onClick={
                    inCart
                      ? handleDeleteItem(product)
                      : handleAddToCartClick(product)
                  }
                  buttonText={inCart ? 'Remove from Cart' : 'Add to Cart'}
                  sx={{ width: '100%' }}
                />
              </CartButtonBox>
            )}
          </Box>
          <Box sx={{ padding: '0 32px' }}>
            <Typography
              sx={{
                textAlign: 'center',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                '&:hover': {
                  fontWeight: 'bold',
                },
              }}
            >
              {product.title}
            </Typography>
            <Stack
              sx={{
                flexDirection: 'row',
                gap: '16px',
                alignItems: 'end',
              }}
            >
              {product.discont_price ? (
                <Stack
                  sx={{
                    flexDirection: 'row',
                    gap: '10px',
                    alignItems: 'center',
                  }}
                >
                  <Typography sx={{ fontSize: '40px', fontWeight: 'bold' }}>
                    ${product.discont_price}
                  </Typography>
                  <Typography
                    sx={{
                      color: 'rgba(139, 139, 139, 1)',
                      textDecoration: 'line-through',
                      fontSize: '20px',
                    }}
                  >
                    ${product.price}
                  </Typography>
                </Stack>
              ) : (
                <Typography sx={{ fontSize: '40px', fontWeight: 'bold' }}>
                  ${product.price}
                </Typography>
              )}
            </Stack>
          </Box>
        </Stack>
      </ProductCardBox>
    </StyledNavLink>
  );
};

export default ProductCard;
