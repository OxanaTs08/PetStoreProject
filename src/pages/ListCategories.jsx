import {allCategories} from "../redux/slice/categoriesSlice";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import PageTitle from "../components/organisms/PageTitle";
import {Box, Grid, Typography, Divider, styled} from "@mui/material";
import {NavLink} from "react-router-dom";
import ButtonInTitle from "../components/organisms/ButtonInTitle";

const StyledNavLink = styled(NavLink)(() => ({
  color: 'rgba(40, 40, 40, 1)',
  textDecoration: 'none',
  '&:hover': {
    cursor: 'pointer',
  },
}))

const ListCategories = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(allCategories());
    }, [ dispatch]);

    const { categories, isLoading, isError, message } = useSelector((state) => state.categories);

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (isError) {
        return <div>{message.message}</div>
    }

    return (
        <Box sx={{display: "flex", flexDirection: "column", gap: '40px'}}>
          <Box sx={{display: "flex", flexDirection: "row", alignItems: "center" }}>
            <NavLink to='/'><ButtonInTitle buttonTitle='Main Page'/></NavLink>
            <Divider sx={{color: 'rgba(221, 221, 221, 1)', 
                  height: '2px',
                  width: '16px', 
                  borderColor: 'gba(221, 221, 221, 1)',
            }}/>
            <NavLink to='/categories'><ButtonInTitle buttonTitle='Categories'/></NavLink>
          </Box>
          <PageTitle title="Categories" buttonTitle="All Categories" />
            <Grid container spacing={2} justifyContent="center">
              {categories && categories.map((category) => (
              
              <Grid item xs={12} sm={6} md={3}>
                <StyledNavLink to={`/categories/${category.id}`} key={category.id}>
                <Box sx={{display: "flex", flexDirection: "column", gap: '16px'}}>
                    <img src={`http://localhost:3333/${category.image}`} 
                         alt={category.title}
                         sx={{borderRadius: '10px',
                              width: '100%',
                              height: 'auto'}} />
                    <Typography sx={{textAlign: "center"}}>{category.title}</Typography>     
                </Box>
                </StyledNavLink>    
              </Grid>
             
            ))}
          </Grid>  
        </Box>
    );
}

export default ListCategories;