import {useParams} from "react-router-dom";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {categoryById} from "../redux/slice/categoriesSlice";
import {Box, Grid} from "@mui/material";
import PageTitle from "../components/organisms/PageTitle";
import {useState} from "react";
import ProductCard from "../components/ProductCard";
import FilterDefinition from "../components/organisms/FilterDefinition.jsx";
import BreadcrumbsComponent from "../components/organisms/BreadcrumbsComponent.jsx";
import PageNotFound from "./PageNotFound.jsx";

const Category = () => {
  const { categoryId } = useParams();
  const dispatch = useDispatch();
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    dispatch(categoryById(categoryId));
  }, [categoryId, dispatch]);

  const { categoryData, isLoading, isError } = useSelector((state) => state.categories);

  const categoryTitle = categoryData?.category?.title;
  const categoryProducts = categoryData?.data ? [...categoryData.data] : [];

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <PageNotFound />;
  }

  const breadCrumbs = [
    {title: 'Main Page', link: '/'},
    {title: 'Categories', link: '/categories'},
    {title: categoryTitle, link: location.pathname}
  ];
    
  return (
    <Box sx={{display: "flex", flexDirection: "column", gap: '40px', paddingTop: '40px'}}>
      <BreadcrumbsComponent breadcrumbs={breadCrumbs}/>
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