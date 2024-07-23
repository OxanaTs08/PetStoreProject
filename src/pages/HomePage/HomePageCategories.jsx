import {allCategories} from "../../redux/slice/categoriesSlice";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import TitleDivider from "../../components/organisms/TitleDivider";
import {Box, Grid, Typography, styled} from "@mui/material";
import {NavLink} from "react-router-dom";

const StyledNavLink = styled(NavLink)(() => ({
  color: 'rgba(40, 40, 40, 1)',
  textDecoration: 'none',
  '&:hover': {
    cursor: 'pointer',
  },
}))

const HomePageCategories = () => {
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
          <TitleDivider title="Categories" buttonTitle="All Categories" buttonPath="/categories" />
            <Grid container spacing={2} justifyContent="center">
              {categories && categories.slice(0, 4).map((category) => (
              <Grid item xs={12} sm={6} md={3}>
                 <StyledNavLink to={`/categories/${category.id}`} key={category.id}>
                <Box key={category.id} sx={{display: "flex", flexDirection: "column", gap: '16px'}}>
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

export default HomePageCategories;