import {
  AppBar,
  Badge,
  Box,
  styled,
  Toolbar,
  IconButton,
  Divider,
  Drawer,
  Stack,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import logo from '../assets/logo.svg';
import emptycart from '../assets/emptycart.svg';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material';

const StyledNavLink = styled(NavLink)(() => ({
  color: 'rgba(40, 40, 40, 1)',
  textDecoration: 'none',
  '&:hover': {
    cursor: 'pointer',
    fontWeight: 'bold',
  },
}));

const Header = () => {
  const cartCount = useSelector((state) => state.cart.cartCount);
  const [open, setOpen] = useState(false);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleMenu = () => {
    setOpen(!open);
  };

  return (
    <>
      <AppBar
        position="static"
        sx={{
          width: '100%',
          height: '128px',
          backgroundColor: 'rgb(255, 255, 255)',
          boxShadow: 'none',
          padding: '30px 0',
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Stack
            sx={{
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
              <StyledNavLink to="/">
                <img src={logo} alt="logo" />
              </StyledNavLink>
            </Box>
            {isSmallScreen ? (
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
                onClick={handleMenu}
                style={{ color: 'rgba(40, 40, 40, 1)' }}
              >
                <MenuIcon />
              </IconButton>
            ) : (
              <Stack
                sx={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: '20px',
                }}
              >
                <StyledNavLink to="/">Main Page</StyledNavLink>
                <StyledNavLink to="/categories">Categories</StyledNavLink>
                <StyledNavLink to="/products/">All Products</StyledNavLink>
                <StyledNavLink to="/products/sale">All Sales</StyledNavLink>
              </Stack>
            )}
            <Box>
              <Badge badgeContent={cartCount} color="primary">
                <StyledNavLink to="/cart">
                  <img src={emptycart} alt="cart" />
                </StyledNavLink>
              </Badge>
            </Box>
          </Stack>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="temporary"
        open={open}
        onClose={handleMenu}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: 200,
            paddingTop: '40px',
          },
        }}
      >
        <Stack
          sx={{
            p: 2,
            flexDirection: 'column',
            alignItems: 'center',
            gap: '20px',
          }}
        >
          <StyledNavLink to="/">Main Page</StyledNavLink>
          <StyledNavLink to="/categories">Categories</StyledNavLink>
          <StyledNavLink to="/products/">All Products</StyledNavLink>
          <StyledNavLink to="/products/sale">All Sales</StyledNavLink>
        </Stack>
      </Drawer>
      <Divider sx={{ marginLeft: '-40px', marginRight: '-40px' }} />
    </>
  );
};

export default Header;
