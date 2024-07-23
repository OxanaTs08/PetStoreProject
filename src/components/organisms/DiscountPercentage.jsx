import {Box} from "@mui/material";
const DiscountPercentage = ({price, discountPrice }) => {
  const getDiscountPercentage = (price, discountPrice) => {
    if (discountPrice == null) {
     return null;
    }
    return Math.round(((price - discountPrice) / price) * 100);
  }
  return (
    <Box sx={{position: 'absolute',
      top: '10px',
      right: '10px',
      backgroundColor: 'blue',
      color: 'white',
      padding: '5px 10px',
      borderRadius: '5px'}}>
      -{getDiscountPercentage(price, discountPrice)}%
    </Box> 
  )
}

export default DiscountPercentage
