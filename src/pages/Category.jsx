import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { categoryById } from '../redux/slice/categoriesSlice';
import { Grid, Stack } from '@mui/material';
import PageTitle from '../components/organisms/PageTitle';
import { useState } from 'react';
import ProductCard from '../components/ProductCard';
import FilterDefinition from '../components/organisms/FilterDefinition.jsx';
import BreadCrumbsComponent from '../components/organisms/BreadCrumbsComponent.jsx';
import BreadCrumbsMobile from '../components/organisms/BreadCrumbsMobile.jsx';
import PageNotFound from './PageNotFound.jsx';
import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material';
import FilterDefinitionMobile from '../components/organisms/FilterDefinitionMobile.jsx';

const Category = () => {
  const { categoryId } = useParams();
  const dispatch = useDispatch();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    dispatch(categoryById(categoryId));
  }, [categoryId, dispatch]);

  const { categoryData, isLoading, isError } = useSelector(
    (state) => state.categories,
  );

  const categoryTitle = categoryData?.category?.title;
  const categoryProducts = categoryData?.data ? [...categoryData.data] : [];

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <PageNotFound />;
  }

  const breadCrumbs = [
    { title: 'Main Page', link: '/' },
    { title: 'Categories', link: '/categories' },
    { title: categoryTitle, link: location.pathname },
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

      <PageTitle title={categoryTitle} />
      {isSmallScreen ? (
        <FilterDefinitionMobile
          filteredProducts={filteredProducts}
          setFilteredProducts={setFilteredProducts}
          products={categoryProducts}
        />
      ) : (
        <FilterDefinition
          filteredProducts={filteredProducts}
          setFilteredProducts={setFilteredProducts}
          products={categoryProducts}
        />
      )}

      <Grid container spacing={2} justifyContent="center">
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

export default Category;
