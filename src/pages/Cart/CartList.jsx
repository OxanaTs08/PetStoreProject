import { Box, Typography } from "@mui/material"
import CartItem from "./CartItem"
import MainButton from "../../components/organisms/MainButton"
import { NavLink } from "react-router-dom"

const CartList = ({cartList, updateCount}) => {
  return (
    <Box sx={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
      {cartList.length === 0 ? (
      <Box sx={{display: 'flex', flexDirection: 'row', gap: '30px', alignItems: 'center'}}>
        <Typography>Looks like you have no items in your basket currently.</Typography>
        <NavLink to="/products/"><MainButton  buttonText="Continue shopping" /></NavLink>
      </Box>
        ) : (
      cartList.map((item) => (
        <CartItem key={item.id} 
                  item={item}
                  updateCount={updateCount}
                   />
      )))}
    </Box>
  )
} 

export default CartList