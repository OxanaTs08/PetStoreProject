import CartList from "./CartList"
import CartSummary from "./CartSummary"
import { Box } from '@mui/system'
import TitleDivider from "../../components/organisms/TitleDivider"
import { useDispatch, useSelector } from "react-redux"
import {Grid} from "@mui/material";


const Cart = () => {
  const cartList = useSelector((state) => state.cart.cart)
  const dispatch = useDispatch()

  const handleUpdateCount = (itemId, quantity) => {
    dispatch(addToCart({id: itemId, quantity}));
  }

  return (
    <Box sx={{paddingTop: '40px'}}>
      <TitleDivider title="Shopping cart" buttonTitle="Back to the store" buttonPath="/products/" />
        <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12} md={8}>
        <CartList cartList={cartList} updateCount={handleUpdateCount} />
        </Grid>
        <Grid item xs={12} md={4}>
        <CartSummary cartList={cartList}/>
        </Grid>
        </Grid>
    </Box>
  )
}

export default Cart




