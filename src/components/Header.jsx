import { AppBar, Badge, Box, styled, Toolbar } from '@mui/material'
import logo from '../assets/logo.svg'

const StyledNavLink = styled(NavLink)(() => ({
  color: 'rgba(40, 40, 40, 1)',
  textDecoration: 'none',
  '&:hover': {
    cursor: 'pointer',
  },
}))

const Header = () => {

  return (
    <AppBar
      position="static"
      sx={{
        width: '100%',
        backgroundColor: 'rgb(255, 255, 255)',
        boxShadow: 'none',  
      }}
    >
      <Toolbar sx={{justifyContent: 'space-between'}}>
        <img src={logo} alt="logo" />
        <Box sx={{
          display: 'flex',
          justifyContent: 'space-between',
          gap: '20px',
        }}>
          <StyledNavLink to="/">Main Page</StyledNavLink>
          <StyledNavLink to="/">Categories</StyledNavLink>
          <StyledNavLink to="/">All Products</StyledNavLink>
          <StyledNavLink to="/">All Sales</StyledNavLink>
        </Box>
        <Box>
          <Badge badgeContent={count}> <StyledNavLink to="/cart">Cart</StyledNavLink> </Badge>
        </Box>
      </Toolbar>

    </AppBar>
  )
}

export default Header
