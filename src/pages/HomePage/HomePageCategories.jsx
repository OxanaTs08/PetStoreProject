import {allCategories} from "../../redux/slice/categoriesSlice";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import TitleDivider from "../../components/organisms/TitleDivider";
import {Box, Grid} from "@mui/material";
import CategoryCard from "../../components/CategoryCard";

const HomePageCategories = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(allCategories());
    }, [ dispatch]);

    const { categories, isLoading, isError, message } = useSelector((state) => state.categories);

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (isError) {
        return <div>{message.message}</div>
    }

    return (
        <Box sx={{display: "flex", flexDirection: "column", gap: '40px'}}>
          <TitleDivider title="Categories" buttonTitle="All Categories" buttonPath="/categories" />
            <Grid container spacing={2} justifyContent="center">
              {categories && categories.slice(0, 4).map((category) => (
              <Grid item xs={12} sm={6} md={3} key={category.id}>
                 <CategoryCard category={category} />
              </Grid>  
            ))}
          </Grid>  
        </Box>
    );
}

export default HomePageCategories;