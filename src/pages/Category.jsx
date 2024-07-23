import {useParams} from "react-router-dom";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {categoryById} from "../redux/slice/categoriesSlice";
import {Box, styled, Grid, Typography, Divider, Checkbox, FormGroup, FormControlLabel, FormControl, Select, MenuItem, InputLabel, TextField} from "@mui/material";
import {NavLink} from "react-router-dom";
import PageTitle from "../components/organisms/PageTitle";
import ButtonInTitle from "../components/organisms/ButtonInTitle";
import {useState} from "react";
import ProductCard from "../components/ProductCard";
import FilterDefinition from "../components/FilterDefinition.jsx";

const StyledNavLink = styled(NavLink)(() => ({
    color: 'rgba(40, 40, 40, 1)',
    textDecoration: 'none',
    '&:hover': {
      cursor: 'pointer',
    },
  }))

const Category = () => {
    const { categoryId } = useParams();
    const dispatch = useDispatch();
    const [filteredProducts, setFilteredProducts] = useState([]);

    useEffect(() => {
        dispatch(categoryById(categoryId));
    }, [categoryId, dispatch]);

    const { categoryData, isLoading, isError, message } = useSelector((state) => state.categories);

    const categoryTitle = categoryData?.category?.title;
    const categoryProducts = categoryData?.data ? [...categoryData.data] : [];




    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>{message.message}</div>;
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
            <Divider sx={{color: 'rgba(221, 221, 221, 1)', 
                  height: '2px',
                  width: '16px', 
                  borderColor: 'gba(221, 221, 221, 1)',
            }}/>
            <NavLink to={location.pathname}><ButtonInTitle buttonTitle={categoryTitle}/></NavLink>
          </Box>
          <PageTitle title={categoryTitle}/>
            <FilterDefinition filteredProducts={filteredProducts} setFilteredProducts={setFilteredProducts} products={categoryProducts}/>

            <Grid container spacing={2} justifyContent="center">
              {filteredProducts && filteredProducts.map((product) => (
              <Grid item xs={12} sm={6} md={3}>
                <ProductCard product={product} />
              </Grid>  
            ))}
          </Grid>  
        </Box>
    );
}

export default Category;