import {allCategories, resetState} from "../redux/slice/categoriesSlice";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import PageTitle from "../components/organisms/PageTitle";
import {Box, Grid} from "@mui/material";
import CategoryCard from "../components/CategoryCard";
import BreadcrumbsComponent from "../components/organisms/BreadcrumbsComponent.jsx";

const ListCategories = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(resetState());
    dispatch(allCategories());
  }, [ dispatch]);

  const { categories, isLoading, isError, message } = useSelector((state) => state.categories);

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>{message.message}</div>
  }

  const breadCrumbs = [
    { title: 'Main Page', link: '/' },
    { title: 'Categories', link: '/categories' },
  ];

  return (
    <Box sx={{display: "flex", flexDirection: "column", gap: '40px', paddingTop: '40px'}}>
      <BreadcrumbsComponent breadcrumbs={breadCrumbs} />
        <PageTitle title="Categories" buttonTitle="All Categories" />
          <Grid container spacing={2} justifyContent="center">
          {categories && categories.map((category) => (
          <Grid item xs={12} sm={6} md={3} key={category.id}>
            <CategoryCard category={category} /> 
          </Grid>
          ))}
        </Grid>  
      </Box>
    );
}

export default ListCategories;