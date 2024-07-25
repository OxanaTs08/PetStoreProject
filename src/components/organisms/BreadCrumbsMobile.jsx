import {NavLink} from "react-router-dom";
import {Box, Divider, Stack, Typography, styled} from "@mui/material";

const StyledNavLink = styled(NavLink)(() => ({
  color: 'rgba(40, 40, 40, 1)',
  textDecoration: 'none',
  '&:hover': {
    cursor: 'pointer',
    color: 'rgba(40, 40, 40, 0.5)',
  },
}))
const BreadCrumbsMobile = ({breadcrumbs}) => {
    return (
        <Box sx={{display: "flex", flexDirection: "column", alignItems: "center"}}>
            {breadcrumbs.map((breadcrumb, index) => (
                <Stack key={breadcrumb.title} flexDirection={"column"} alignItems={"center"}>
                    {index !== breadcrumbs.length - 1 && (
                    <StyledNavLink to={breadcrumb.link}>
                        <Typography sx={{color: index === breadcrumbs.length - 1 ? 'rgb(0,0,0)' : 'rgba(139, 139, 139, 1)',
                            textAlign: "center"}}>{breadcrumb.title}
                        </Typography></StyledNavLink>
                    )}    
                    {index !== breadcrumbs.length - 1 && (
                        <Divider sx={{
                            color: 'rgba(221, 221, 221, 1)',
                            height: '2px',
                            width: '50px',
                            borderColor: 'gba(221, 221, 221, 1)',
                        }}/>
                    )}
                </Stack>
            ))}
        </Box>
    )
}

export default BreadCrumbsMobile;