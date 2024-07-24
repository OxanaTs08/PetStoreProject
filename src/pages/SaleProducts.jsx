import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {allProducts, resetState} from "../redux/slice/productsSlice";
import {Box, Grid} from "@mui/material";
import PageTitle from "../components/organisms/PageTitle";
import {useState} from "react";
import FilterDefinition from "../components/organisms/FilterDefinition.jsx";
import ProductCard from "../components/ProductCard.jsx";
import BreadcrumbsComponent from "../components/organisms/BreadcrumbsComponent.jsx";

const SaleProducts = () => {
  const dispatch = useDispatch();

  useEffect(() => {
      dispatch(resetState());
      dispatch(allProducts());
  }, [dispatch]);

  const { products, isLoading, isError, message } = useSelector((state) => state.products);
  const [filteredProducts, setFilteredProducts] = useState(products);

  if (isLoading) {
      return <div>Loading...</div>;
  }

  if (isError) {
      return <div>{message.message}</div>;
  }

  const breadCrumbs = [
        {title: 'Main Page', link: '/'},
        {title: 'All Sales', link: '/products/sale'},
    ];
  
  return (
    <Box sx={{display: "flex", flexDirection: "column", gap: '40px'}}>

        <BreadcrumbsComponent breadcrumbs={breadCrumbs}/>
      <PageTitle title='Discounted Items'/>
      <FilterDefinition filteredProducts={filteredProducts} setFilteredProducts={setFilteredProducts} products={products} onSale/>
      <Grid container spacing={2} justifyContent="center" grid-auto-rows='1fr'>
        {filteredProducts && filteredProducts.map((product) => (
          <Grid item xs={12} sm={6} md={3} key={product.id}  >
            <ProductCard product={product} />
          </Grid>  
        ))}
      </Grid>  
    </Box>
    );
}

export default SaleProducts;