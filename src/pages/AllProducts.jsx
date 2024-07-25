import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { allProducts } from '../redux/slice/productsSlice';
import { Grid, Stack } from '@mui/material';
import PageTitle from '../components/organisms/PageTitle';
import { useState } from 'react';
import FilterDefinition from '../components/organisms/FilterDefinition.jsx';
import FilterDefinitionMobile from '../components/organisms/FilterDefinitionMobile.jsx';
import ProductCard from '../components/ProductCard.jsx';
import BreadCrumbsComponent from '../components/organisms/BreadCrumbsComponent.jsx';
import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material';
import BreadCrumbsMobile from '../components/organisms/BreadCrumbsMobile.jsx';

const AllProducts = () => {
  const dispatch = useDispatch();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    dispatch(allProducts());
  }, [dispatch]);

  const { products, isLoading, isError, message } = useSelector(
    (state) => state.products,
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>{message.message}</div>;
  }

  const breadCrumbs = [
    { title: 'Main Page', link: '/' },
    { title: 'Categories', link: '/categories' },
    { title: 'All Products', link: location.pathname },
  ];

  return (
    <Stack
      sx={{
        gap: '40px',
        paddingTop: '40px',
      }}
    >
      {isSmallScreen ? (
        <BreadCrumbsMobile breadcrumbs={breadCrumbs} />
      ) : (
        <BreadCrumbsComponent breadcrumbs={breadCrumbs} />
      )}
      <PageTitle title="All Products" />
      {isSmallScreen ? (
        <FilterDefinitionMobile
          filteredProducts={filteredProducts}
          setFilteredProducts={setFilteredProducts}
          products={products}
        />
      ) : (
        <FilterDefinition
          filteredProducts={filteredProducts}
          setFilteredProducts={setFilteredProducts}
          products={products}
        />
      )}
      <Grid container spacing={2} justifyContent="center" grid-auto-rows="1fr">
        {filteredProducts &&
          filteredProducts.map((product) => (
            <Grid item xs={12} sm={6} md={3} key={product.id}>
              <ProductCard product={product} />
            </Grid>
          ))}
      </Grid>
    </Stack>
  );
};

export default AllProducts;
