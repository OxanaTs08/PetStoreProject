import { Typography, Box, Divider, styled} from "@mui/material"
import ButtonInTitle from "./organisms/ButtonInTitle"
import { NavLink } from "react-router-dom"

const StyledNavLink = styled(NavLink)(() => ({
  color: 'rgba(40, 40, 40, 1)',
  textDecoration: 'none',
  '&:hover': {
      cursor: 'pointer',
  },
}));

const TitleDivider = ({title, buttonTitle, buttonPath}) => {
  return (
    <Box sx={{display: "flex", flexDirection: "raw", padding: '20px 0', gap: '30px', alignItems: "center", marginTop: '80px' }}>
    <Typography variant='h3' sx={{fontWeight: "bold"}} >
      {title}
    </Typography>
    <Box sx={{display: "flex", flexDirection: "raw", alignItems: "center", width: '95%' }}>
      <Divider sx={{color: 'rgba(221, 221, 221, 1)', 
                  height: '2px',
                  width: '85%', 
                  borderColor: 'gba(221, 221, 221, 1)',
      }}/>
      <StyledNavLink to={buttonPath}> <ButtonInTitle buttonTitle={buttonTitle} /> </StyledNavLink>
    </Box>
    
    </Box>
  )
}

export default TitleDivider