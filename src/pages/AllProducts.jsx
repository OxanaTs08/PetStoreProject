import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {allProducts} from "../redux/slice/productsSlice";
import {Box, Grid} from "@mui/material";
import PageTitle from "../components/organisms/PageTitle";
import {useState} from "react";
import FilterDefinition from "../components/organisms/FilterDefinition.jsx";
import ProductCard from "../components/ProductCard.jsx";
import BreadcrumbsComponent from "../components/organisms/BreadcrumbsComponent.jsx";

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

    const breadCrumbs = [
        {title: 'Main Page', link: '/'},
        {title: 'Categories', link: '/categories'},
        {title: 'All Products', link: location.pathname}
    ];

    return (
        <Box sx={{display: "flex", flexDirection: "column", gap: '40px', paddingTop: '40px'}}>
          <BreadcrumbsComponent breadcrumbs={breadCrumbs}/>
          <PageTitle title='All Products'/>
            <FilterDefinition filteredProducts={filteredProducts} setFilteredProducts={setFilteredProducts} products={products}/>
            <Grid container spacing={2} justifyContent="center" grid-auto-rows="1fr">
              {filteredProducts && filteredProducts.map((product) => (
              <Grid item xs={12} sm={6} md={3} key={product.id}>
                <ProductCard product={product}/>
              </Grid>  
            ))}
          </Grid>  
        </Box>
    );
}

export default AllProducts;