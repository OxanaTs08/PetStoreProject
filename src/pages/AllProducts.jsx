import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {allProducts} from "../redux/slice/productsSlice";
import {Box, styled, Grid, Divider} from "@mui/material";
import {NavLink} from "react-router-dom";
import PageTitle from "../components/organisms/PageTitle";
import ButtonInTitle from "../components/organisms/ButtonInTitle";
import {useState} from "react";
import FilterDefinition from "../components/FilterDefinition.jsx";
import ProductCard from "../components/ProductCard.jsx";


const StyledNavLink = styled(NavLink)(() => ({
    color: 'rgba(40, 40, 40, 1)',
    textDecoration: 'none',
    '&:hover': {
      cursor: 'pointer',
    },
  }))

const AllProducts = () => {
    const dispatch = useDispatch();
    const [filteredProducts, setFilteredProducts] = useState([]);


    useEffect(() => {
        dispatch(allProducts());
    }, [ dispatch]);

    const { products, isLoading, isError, message } = useSelector((state) => state.products);

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
            <NavLink to={location.pathname}><ButtonInTitle buttonTitle='All Products'/></NavLink>
          </Box>
          <PageTitle title='All Products'/>
            <FilterDefinition filteredProducts={filteredProducts} setFilteredProducts={setFilteredProducts} products={products}/>
            <Grid container spacing={2} justifyContent="center" grid-auto-rows="1fr">
              {filteredProducts && filteredProducts.map((product) => (
              <Grid item xs={12} sm={6} md={3}>
                <ProductCard product={product}/>
              </Grid>  
            ))}
          </Grid>  
        </Box>
    );
}

export default AllProducts;