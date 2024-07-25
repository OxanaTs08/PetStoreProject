import { allCategories, resetState } from '../redux/slice/categoriesSlice';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PageTitle from '../components/organisms/PageTitle';
import { Box, Grid, Stack } from '@mui/material';
import CategoryCard from '../components/CategoryCard';
import BreadCrumbsComponent from '../components/organisms/BreadCrumbsComponent.jsx';
import BreadCrumbsMobile from '../components/organisms/BreadCrumbsMobile.jsx';
import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material';

const ListCategories = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(resetState());
    dispatch(allCategories());
  }, [dispatch]);

  const { categories, isLoading, isError, message } = useSelector(
    (state) => state.categories,
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

      <PageTitle title="Categories" buttonTitle="All Categories" />
      <Grid container spacing={2} justifyContent="center">
        {categories &&
          categories.map((category) => (
            <Grid item xs={12} sm={6} md={3} key={category.id}>
              <CategoryCard category={category} />
            </Grid>
          ))}
      </Grid>
    </Stack>
  );
};

export default ListCategories;
