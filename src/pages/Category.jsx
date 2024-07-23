import {useParams} from "react-router-dom";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {categoryById} from "../redux/slice/categoriesSlice";
import {Box, styled, Grid, Typography, Divider, Checkbox, FormGroup, FormControlLabel, FormControl, Select, MenuItem, InputLabel, TextField} from "@mui/material";
import {NavLink} from "react-router-dom";
import PageTitle from "../components/organisms/PageTitle";
import ButtonInTitle from "../components/organisms/ButtonInTitle";
import {useState} from "react";
import ProductCard from "../components/ProductCard";

const StyledNavLink = styled(NavLink)(() => ({
    color: 'rgba(40, 40, 40, 1)',
    textDecoration: 'none',
    '&:hover': {
      cursor: 'pointer',
    },
  }))

const Category = () => {
    const { categoryId } = useParams();
    const dispatch = useDispatch();
    const [sortOption, setSortOption] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [showDiscounted, setShowDiscounted] = useState(false);

    useEffect(() => {
        dispatch(categoryById(categoryId));
    }, [categoryId, dispatch]);

    const { categoryData, isLoading, isError, message } = useSelector((state) => state.categories);

    const categoryTitle = categoryData?.category?.title;
    const categoryProducts = categoryData?.data ? [...categoryData.data] : [];

    useEffect(() => {
        const applyPriceFilter = (products) => {
            return products.filter((product) => {
                const price = product.discont_price || product.price;
                if (minPrice && price < minPrice) return false;
                if (maxPrice && price > maxPrice) return false;
                if (showDiscounted && !product.discont_price) return false;
                return true;
            });
        }
        
        const sortedAndFilteredProducts = () => {
            let filteredProducts = applyPriceFilter(categoryProducts);
                if (sortOption === 'newest') {
                    return filteredProducts.slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                } else if (sortOption === 'price-high-low') {
                    return filteredProducts.slice().sort((a, b) => {
                        const priceA = a.discont_price ? a.discont_price : a.price;
                        const priceB = b.discont_price ? b.discont_price : b.price;
                    return priceB - priceA;
                 });
              } else if (sortOption === 'price-low-high') {
                    return filteredProducts.slice().sort((a, b) => {
                        const priceA = a.discont_price ? a.discont_price : a.price;
                        const priceB = b.discont_price ? b.discont_price : b.price;
                        return priceA - priceB;
                });
              } else {
                return filteredProducts;
              }
            };

        setFilteredProducts(sortedAndFilteredProducts());
    }, [categoryProducts, sortOption, minPrice, maxPrice, showDiscounted]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>{message.message}</div>;
    }

    const getDiscountPercentage = (price, discountPrice) => {
        if (discountPrice == null) {
            return null;
        }
        return Math.round(((price - discountPrice) / price) * 100);
    }

    const handleSortChange = (event) => {
        setSortOption(event.target.value);
    };

    const handleMinPriceChange = (event) => {
        setMinPrice(event.target.value);
    };

    const handleMaxPriceChange = (event) => {
        setMaxPrice(event.target.value);
    };

    const handleDiscountChange = (event) => {
        setShowDiscounted(event.target.checked);
    };


    
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
            <NavLink to={location.pathname}><ButtonInTitle buttonTitle={categoryTitle}/></NavLink>
          </Box>
          <PageTitle title={categoryTitle}/>
          <Box sx={{display: "flex", flexDirection: "row", alignItems: "center", gap: '40px'}}>
                <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap: '10px' }}>
                    <Typography>Price</Typography>
                    <TextField
                        label="From"
                        variant="outlined"
                        type="number"
                        value={minPrice}
                        onChange={handleMinPriceChange}
                    />
                    <TextField
                        label="To"
                        variant="outlined"
                        type="number"
                        value={maxPrice}
                        onChange={handleMaxPriceChange}
                    />
                </Box>
            <FormGroup>
                <FormControlLabel
                    label="Discounted Products"
                    control={
                        <Checkbox
                            checked={showDiscounted}
                            onChange={handleDiscountChange}
                            value="discountPrice"
                            name="radio-buttons"
                            inputProps={{ 'aria-label': 'A' }}
                            />
                        }
                    />
                </FormGroup>
                <Box sx={{display: "flex", flexDirection: "row", alignItems: "center", gap: '10px'}}> 
                    <Typography>Sorted</Typography>
                    <FormControl sx={{width: '200px'}} >
                        <InputLabel id="demo-simple-select-label">by default</InputLabel>
                        <Select
                            value={sortOption}
                            onChange={handleSortChange}>
                            <MenuItem value='newest'>Newest</MenuItem>
                            <MenuItem value='price-high-low'>Price:high-low</MenuItem>
                            <MenuItem value='price-low-high'>Price:low-high</MenuItem>
                        </Select>
                   </FormControl>
                </Box>
          </Box>
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