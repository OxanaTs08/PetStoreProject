import { AppBar, Badge, Box, styled, Toolbar, IconButton, Divider} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
import logo from '../assets/logo.svg'
import emptycart from '../assets/emptycart.svg'
import { NavLink } from "react-router-dom"
import { useSelector } from 'react-redux'
import { useState } from 'react'
import { useMediaQuery } from '@mui/material'
import { useTheme } from '@mui/material';

const StyledNavLink = styled(NavLink)(() => ({
  color: 'rgba(40, 40, 40, 1)',
  textDecoration: 'none',
  '&:hover': {
    cursor: 'pointer',
    color: 'rgba(40, 40, 40, 0.5)',
  },
}))

const Header = () => {
  const cartCount = useSelector((state) => state.cart.cartCount)
  const [open, setOpen] = useState(false)
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'))
  

  const handleMenu = () => {
    setOpen(!open)
  }

  return (
    <>
    <AppBar
      position="static"
      sx={{
        width: '100%',
        height: isSmallScreen? (open? '180px' : '128px') : '128px',
        backgroundColor: 'rgb(255, 255, 255)',
        boxShadow: 'none',
        padding: '30px 0',
      }}
    >
      <Toolbar sx={{justifyContent: 'space-between'}}>
        <Box sx={{width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            <StyledNavLink  to="/"><img src={logo} alt="logo" /></StyledNavLink>
          </Box> 
          {isSmallScreen ? (
          <Box>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={handleMenu}
              style={{color: 'rgba(40, 40, 40, 1)'}}>
              <MenuIcon />
            </IconButton>
          {open && (
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: isSmallScreen ? '5px' : '20px' }}>
                  <StyledNavLink  to="/">Main Page</StyledNavLink>
                  <StyledNavLink  to="/categories">Categories</StyledNavLink>
                  <StyledNavLink  to="/products/">All Products</StyledNavLink>
                  <StyledNavLink  to="/products/sale">All Sales</StyledNavLink>
                </Box>
              )}
            </Box>
          ) : (
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '20px' }}>
              <StyledNavLink to="/">Main Page</StyledNavLink>
              <StyledNavLink to="/categories">Categories</StyledNavLink>
              <StyledNavLink to="/products/">All Products</StyledNavLink>
              <StyledNavLink to="/products/sale">All Sales</StyledNavLink>
            </Box>
          )}
          <Box>
            <Badge 
            badgeContent={cartCount} color="primary"
            > <StyledNavLink  to="/cart"><img src={emptycart} alt="cart" /></StyledNavLink > </Badge>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
    <Divider  sx={{marginLeft: '-40px', marginRight: '-40px'}}/>
    </>
  )
}

export default Header
