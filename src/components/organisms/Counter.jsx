import { useDispatch } from "react-redux"
import { updateQuantity } from "../../redux/slice/CartSlice"
import {Button, Typography,styled, Box} from "@mui/material";
import { useMediaQuery } from '@mui/material'
import { useTheme } from '@mui/material';

const StyledButton = styled(Button)(() => ({
  border: '1px solid rgba(221, 221, 221, 1)',
  color: 'rgba(221, 221, 221, 1)',
  padding: '5px',
  '&:hover': {
  backgroundColor: 'rgba(255, 255, 255, 1)',
  color: 'rgba(40, 40, 40, 1)',
  boxShadow: 'none',
  borderColor: "rgba(139, 139, 139, 1)",
  }
}));

const Counter = ({item, setQuantity, quantity, cart}) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'))

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
      <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
        <StyledButton variant="outlined" onClick={increment} sx={{
            width: isSmallScreen ? '30px' : '58px',
            height: isSmallScreen ? '30px' : '58px',
        }}>+</StyledButton>
        <Box sx={{width: isSmallScreen? '30px' : '58px', 
            height: isSmallScreen? '30px' : '58px', 
            borderTop: '1px solid rgba(221, 221, 221, 1)', 
            borderBottom: '1px solid rgba(221, 221, 221, 1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        }}>
        <Typography> {quantity ? quantity : item.quantity}  </Typography>
      </Box>
      <StyledButton variant="outlined" onClick={decrement} sx={{
          width: isSmallScreen ? '30px' : '58px',
          height: isSmallScreen ? '30px' : '58px',
      }}>-</StyledButton>
    </Box>
  )
}

export default Counter
