import PropTypes from 'prop-types'
import { Button, Typography, Avatar, Paper, Box, styled } from "@mui/material"
import axios from "axios"
import { connect } from "react-redux"
import { removeFromCart } from "../../redux/slice/CartSlice"
import Counter from "../../components/organisms/Counter"
import { useDispatch } from 'react-redux'
import { useState } from 'react'
import { NavLink } from "react-router-dom"

const StyledNavLink = styled(NavLink)(() => ({
  color: 'rgba(40, 40, 40, 1)',
  textDecoration: 'none',
  '&:hover': {
    cursor: 'pointer',
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

  const deleteItem = (id) => {
        dispatch(removeFromCart(id))
        updateCount()
      }
  
  return (
    <Paper sx={{display: 'flex', 
              flexDirection: 'row', 
              alignItems: 'center', 
              justifyContent: 'space-between', 
              gap: '10px', 
              padding: '10px', 
              width: '100%',
              height: '180px', 
              overflow: 'hidden' }}>
      <Image src={`http://localhost:3333/${item.image}`} alt={item.title}/>
      <Box sx={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
        <Box sx={{display: 'flex', flexDirection: 'row', gap: '10px'}}>
        <StyledNavLink to={`/products/${item.id}`}><Typography>{item.title}</Typography></StyledNavLink>
           <Button variant="text" onClick={() => deleteItem(item.id)}>x</Button>
        </Box>
        <Box sx={{display: 'flex', flexDirection: 'row', gap: '10px', alignItems: 'center'}}>
          <Counter item={item} cart/>
          {item.discont_price ? (
          <>
          <Typography variant='h4' sx={{ fontWeight: 'bold' }}>${item.discont_price}</Typography>
          <Typography sx={{ color: 'rgba(139, 139, 139, 1)', textDecoration: 'line-through', fontSize: '20px' }}>${item.price}</Typography>
          
          </>
          ) : (
          <Typography>${item.price}</Typography>
          )}
        </Box>
      </Box>
    </Paper>
  )
}
export default CartItem

