import { Box, Typography } from "@mui/material"
import mainimg from "../assets/mainimg.jpg"
import MainButton from "./organisms/MainButton"

const MainPage = () => {
  return (
    <Box sx={{backgroundImage: 'url(' + mainimg + ')', 
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              width: '100vw',
              height: '600px',
              marginLeft: '-40px',
              marginRight: '-40px', 
              padding: '80px 40px',
            }}>
      <Box sx={{display: 'flex', flexDirection: 'column', gap: '40px'}}>    
        <Typography variant="h1" sx={{color: 'rgba(255, 255, 255, 1)', fontWeight: 'bold', width: '70%' }}>Amazing Discounts on Pets Products</Typography>
        <MainButton buttonText="Check Out" sx={{maxWidth: 'max-content'}}  />
      </Box>    
    </Box>
  ) 
}

export default MainPage