import { Button, Typography, Paper, Box, styled } from "@mui/material"
import { removeFromCart } from "../../redux/slice/CartSlice"
import Counter from "../../components/organisms/Counter"
import { useDispatch } from 'react-redux'
import { useState } from 'react'
import { NavLink } from "react-router-dom"
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

const Image = styled('img')(() => ({
    width: '200px',
    height: '200px',
    objectFit: 'cover',
}));

const CartItem = ({item, updateCount}) => {
  const [quantity, setQuantity] = useState(1)
  const dispatch = useDispatch()
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'))

  const deleteItem = (id) => {
    dispatch(removeFromCart(id))
    updateCount()
  }
  
  return (  
    <Paper sx={{display: 'flex', 
              flexDirection: 'row', 
              alignItems: 'center', 
              gap: '30px', 
              padding: '10px', 
              width: '100%',
              height: '180px',
              overflow: 'hidden',
              borderRadius: '10px'}}
              elevation={3}
              variant="outlined">
      <Image src={`http://localhost:3333/${item.image}`} alt={item.title}/>
      <Box sx={{display: 'flex', flexDirection: 'column', gap: isSmallScreen? '10px' : '30px'}}>
        <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%'}}>
          <StyledNavLink to={`/products/${item.id}`}>
            <Typography variant={isSmallScreen? 'subtitle1' : 'h5'} 
                sx={{ lineHeight: '1.2', fontWeight: '300'}}>
                {item.title}</Typography>
          </StyledNavLink>
          <Button variant="text" 
                  onClick={() => deleteItem(item.id)} 
                  sx={{width: '10px !important',
                  height: '10px !important',
                  padding: 0,
                  marginRight: '0 !important',
                  marginLeft: 'auto',
                  '&:hover': {color: 'rgba(255, 0, 0)'}}}>x</Button>
        </Box>
        <Box sx={{display: 'flex', flexDirection: isSmallScreen? 'column' : 'row', gap: isSmallScreen? '5px' : '30px', alignItems: 'center'}}>
          <Counter item={item} cart/>
          {item.discont_price ? (
          < Box sx={{display: 'flex', flexDirection: 'row', gap: '5px', alignItems: 'center'}}>
          <Typography variant='h4' sx={{ fontWeight: 'bold' }}>${item.discont_price}</Typography>
          <Typography sx={{ color: 'rgba(139, 139, 139, 1)', textDecoration: 'line-through', fontSize: '20px' }}>${item.price}</Typography>
          
          </Box>
          ) : (
          <Typography variant='h4' sx={{ fontWeight: 'bold' }}>${item.price}</Typography>
          )}
        </Box>
      </Box>
    </Paper>
  )
}
export default CartItem

