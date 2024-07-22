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
    <Box sx={{display: "flex", flexDirection: "raw", padding: '20px 0', alignItems: "center", marginTop: '80px', justifyContent:'space-between' }}>
    <Typography variant='h3' sx={{fontWeight: "bold", flexWrap: 'nowrap', display: 'flex', paddingRight: '30px'}} >
      {title}
    </Typography>
    <Divider sx={{color: 'rgba(221, 221, 221, 1)',
        height: '2px',
        flexGrow: 1,
        borderColor: 'gba(221, 221, 221, 1)',
    }}/>
    <StyledNavLink to={buttonPath}> <ButtonInTitle buttonTitle={buttonTitle} /> </StyledNavLink>

    </Box>
  )
}

export default TitleDivider