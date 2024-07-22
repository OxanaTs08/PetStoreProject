import { AppBar, Badge, Box, styled, Toolbar } from '@mui/material'
import logo from '../assets/logo.svg'
import emptycart from '../assets/emptycart.svg'
import { NavLink } from "react-router-dom"
import { useSelector } from 'react-redux'

const StyledNavLink = styled(NavLink)(() => ({
  color: 'rgba(40, 40, 40, 1)',
  textDecoration: 'none',
  '&:hover': {
    cursor: 'pointer',
  },
}))

const Header = () => {
  const cartCount = useSelector((state) => state.cart.cartCount)

  return (
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
      <Toolbar sx={{justifyContent: 'space-between'}}>
        <Box sx={{width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
        <StyledNavLink  to="/"><img src={logo} alt="logo" /></StyledNavLink>
          <Box sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '20px',
              }}>
            <StyledNavLink  to="/">Main Page</StyledNavLink >
            <StyledNavLink  to="/categories">Categories</StyledNavLink >
            <StyledNavLink  to='/products/'>All Products</StyledNavLink >
            <StyledNavLink  to="/products/sale">All Sales</StyledNavLink >
          </Box>
          <Box>
            <Badge 
            badgeContent={cartCount} color="primary"
            > <StyledNavLink  to="/cart"><img src={emptycart} alt="cart" /></StyledNavLink > </Badge>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Header
