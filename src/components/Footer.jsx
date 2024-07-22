import { AppBar, Box, Toolbar, styled, Typography, Link, Grid} from "@mui/material"
import socialicon1 from '../assets/socialicon1.svg'
import iconwhatsapp from '../assets/iconwhatsapp.svg'

const StyledLink = styled(Link)(() => ({
  color: 'rgba(40, 40, 40, 1)',
  textDecoration: 'none',
  '&:hover': {
    cursor: 'pointer',
}}))

const StyledItem = styled(Box)(() => ({
  backgroundColor: 'rgba(241, 243, 244, 1)',
  borderRadius: '8px',
  padding: '32px',
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
  minHeight: '100px',
  justifyContent: 'center',
}))

const Footer = () => {
  return (
    <AppBar
      position="static"
      sx={{
        width: '100%',
        backgroundColor: 'rgba(255, 255, 255, 1)',
        boxShadow: 'none',
        top: 'auto',
        bottom: 0,
        mt: 'auto',
        padding: '30px 0 80px 0',
      }}>
      <Toolbar  sx={{width: '100%'}}>
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: '40px',
          width: '100%',
        }}>
          <Typography variant='h3' sx={{ color: 'rgba(40, 40, 40, 1)', fontWeight: 'bold' }} > Contacts </Typography>
          <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid item xs={12} sm={6} md={6}>
              <StyledItem>
                <Typography sx={{color: 'rgba(139, 139, 139, 1)'}} > Phone </Typography>
                <Typography variant='h4' sx={{color: 'rgba(40, 40, 40, 1)', fontWeight: 'bold', fontSize: '1.2rem' }}> +49 30 915-88492 </Typography>
              </StyledItem>
            </Grid>  

            <Grid item xs={12} sm={6} md={6}>
              <StyledItem>
                <Typography sx={{color: 'rgba(139, 139, 139, 1)'}} > Socials </Typography>
                <Box sx={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <StyledLink><img src={socialicon1} alt="socialicon1" /></StyledLink> 
                  <StyledLink><img src={iconwhatsapp} alt="iconwhatsapp" /></StyledLink>
                </Box>
              </StyledItem>
            </Grid> 

            <Grid item xs={12} sm={6} md={6} >
              <StyledItem>
                <Typography sx={{color: 'rgba(139, 139, 139, 1)'}} > Address </Typography>
                <Typography variant='h4' sx={{color: 'rgba(40, 40, 40, 1)', fontWeight: 'bold', fontSize: '1.2rem' }}> Wallstraẞe 9-13, 10179 Berlin, Deutschland </Typography>
              </StyledItem>
            </Grid>  

            <Grid item xs={12} sm={6} md={6} >
              <StyledItem>
                <Typography sx={{color: 'rgba(139, 139, 139, 1)'}} > Working Hours </Typography>
                <Typography variant='h4' sx={{color: 'rgba(40, 40, 40, 1)',  fontWeight: 'bold', fontSize: '1.2rem' }}> 24 Hours a Day </Typography>
              </StyledItem>
            </Grid>              
          </Grid>
          
          <Box sx={{ width: '100%', height: '300px', mt: '20px' }}>
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2686.327280270726!2d9.50351997613212!3d47.678063671196455!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x479b00a2fc6dc6df%3A0x78688b7174a7ebcd!2sMesse%20Friedrichshafen!5e0!3m2!1sru!2sde!4v1721429468166!5m2!1sru!2sde" 
            style={{width: '100%', height: '350px', borderRadius: '8px'}}/>
          </Box>  
        </Box>
      </Toolbar>
    </AppBar>
    
  )
}

export default Footer