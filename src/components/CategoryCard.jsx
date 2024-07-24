import {Box, styled, Typography} from '@mui/material/';
import { NavLink } from "react-router-dom";

const StyledNavLink = styled(NavLink)(() => ({
  color: 'rgba(40, 40, 40, 1)',
  textDecoration: 'none',
  '&:hover': {
    cursor: 'pointer',
    color: 'rgba(40, 40, 40, 0.5)',
  },
}))

const CategoryCard = ({category}) => {
  
  return (
    <StyledNavLink to={`/categories/${category.id}`}>
      <Box sx={{display: "flex", flexDirection: "column", gap: '16px'}}>
        <img src={`http://localhost:3333/${category.image}`} alt={category.title}/>
        <Typography sx={{textAlign: "center"}}>{category.title}</Typography>     
      </Box>
    </StyledNavLink>    
   )
}

export default CategoryCard