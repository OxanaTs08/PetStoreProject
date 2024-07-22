import { useDispatch } from "react-redux"
import { updateQuantity } from "../../redux/slice/CartSlice"

const Counter = ({item, updateCount}) => {
  if (!item) {
    return null
  }
  const dispatch = useDispatch()
  
  const increment = () => {
    dispatch(updateQuantity({id: item.id, quantity: item.quantity + 1}))
    updateCount()
  }
  const decrement = () => {
    if (item.quantity > 1) {
    dispatch(updateQuantity({id: item.id, quantity: item.quantity - 1}))
    updateCount()
  }}

  return (
    <> 
      <button onClick={increment} sx={{width: '58px', height: '58px'}}>+</button>
      <span sx={{width: '58px', height: '58px'}}>  {item.quantity}  </span>
      <button onClick={decrement} sx={{width: '58px', height: '58px'}}>-</button>
    </>
  )
}

export default Counter