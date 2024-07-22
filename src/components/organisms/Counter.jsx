import { useDispatch } from "react-redux"
import { updateQuantity } from "../../redux/slice/CartSlice"
import {Button, Typography} from "@mui/material";

const Counter = ({item, setQuantity, quantity, cart}) => {
  if (!item) {
    return null
  }
  const dispatch = useDispatch()
  
  const increment = () => {
    cart ? dispatch(updateQuantity({id: item.id, quantity: item.quantity + 1})) : setQuantity(quantity + 1)
  }
  const decrement = () => {
    if (item.quantity > 1) {
      cart ? dispatch(updateQuantity({id: item.id, quantity: item.quantity - 1})) : setQuantity(quantity - 1)
  }}

  return (
      <>
        <Button onClick={increment} sx={{width: '58px', height: '58px'}}>+</Button>
        <Typography sx={{width: '58px', height: '58px'}}>  {quantity ? quantity : item.quantity}  </Typography>
        <Button onClick={decrement} sx={{width: '58px', height: '58px'}}>-</Button>
      </>
  )
}

export default Counter
