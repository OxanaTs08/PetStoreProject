import {allProducts} from "../../redux/slice/productsSlice";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import TitleDivider from "../../components/organisms/TitleDivider";
import {Box, Grid} from "@mui/material";
import ProductCard from "../../components/ProductCard";

const HomePageSale = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(allProducts());
    }, [ dispatch]);

    const {products, isLoading, isError, message } = useSelector((state) => state.products);

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (isError) {
        return <div>{message.message}</div>
    }

    const discountedProducts = products ? products.filter(product => product.discont_price): [];
    return (
      <Box sx={{display: "flex", flexDirection: "column", gap: '40px'}}>
        <TitleDivider title="Sales" buttonTitle="All Sales" buttonPath="/products/sale" />
          <Grid container spacing={2} justifyContent="center">
          {discountedProducts && discountedProducts.slice(0, 4).map((product) => (
            <Grid item xs={12} sm={6} md={3}>
              <ProductCard product={product} />
            </Grid>  
          ))}
          </Grid>  
      </Box>
    );
}

export default HomePageSale;