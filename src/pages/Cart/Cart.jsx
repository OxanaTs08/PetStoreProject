import CartList from "./CartList"
import CartSummary from "./CartSummary"
import { Box } from '@mui/system'
import TitleDivider from "../../components/TitleDivider"
import { useDispatch, useSelector } from "react-redux"


const Cart = () => {
  const cartList = useSelector((state) => state.cart.cart)
  const dispatch = useDispatch()

  const handleUpdateCount = (itemId, quantity) => {
    dispatch(addToCart({id: itemId, quantity}));
  }

  return (
    <Box>
      <TitleDivider title="Shopping cart" buttonTitle="Back to the store" buttonPath="/products/" />
      <Box sx={{display: 'flex', flexDirection: 'row', gap: '20px'}}>
        <CartList cartList={cartList} updateCount={handleUpdateCount} />
        <CartSummary cartList={cartList} />
      </Box>
    </Box>
  )
}

export default Cart




