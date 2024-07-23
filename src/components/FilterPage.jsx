import {useEffect, useState} from "react";
import {allProducts} from "../redux/slice/productsSlice";
import {useDispatch, useSelector} from "react-redux";
import {Box, Typography, TextField, FormControl, Select, MenuItem, FormControlLabel} from "@mui/material";
import {NavLink} from "react-router-dom";


const FilterPage = ()=> {
// const dispatch = useDispatch();
const [sortOption, setSortOption] = useState('');
const [minPrice, setMinPrice] = useState('');
const [maxPrice, setMaxPrice] = useState('');
const [showDiscounted, setShowDiscounted] = useState(false);
const [filteredProducts, setFilteredProducts] = useState([]);



// useEffect(() => {
//     dispatch(allProducts());
// }, [ dispatch]);

// const { products, isLoading, isError, message } = useSelector((state) => state.products);

useEffect(() => {
  // if (!products) {
  //   return;
  // }
  const applyPriceFilter = (products) => {
    return products.filter((product) => {
      const price = product.discont_price || product.price;
        if (minPrice && price < minPrice) return false;
        if (maxPrice && price > maxPrice) return false;
        if (showDiscounted && !product.discont_price) return false;
        return true;
    });
  }
    
  const sortedAndFilteredProducts = ({products,onFilterChange }) => {
    if (!sortOption &&!minPrice &&!maxPrice) {
        return products;
      }
    let filteredProducts = applyPriceFilter(products);
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
    }, [products, sortOption, minPrice, maxPrice, showDiscounted]);

// if (isLoading) {
//     return <div>Loading...</div>;
// }

// if (isError) {
//     return <div>{message.message}</div>;
// }

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

useEffect(() => {
  onFilterChange(filteredProducts)
}, [filteredProducts])

return (
  <Box sx={{display: "flex", flexDirection: "row", alignItems: "center", gap: '40px'}}>
    <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap: '10px' }}>
      <Typography>Price</Typography>
        <TextField
          label="From"
          variant="outlined"
          type="number"
          value={minPrice}
          onChange={handleMinPriceChange}/>
        <TextField
          label="To"
          variant="outlined"
          type="number"
          value={maxPrice}
          onChange={handleMaxPriceChange}/>
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
          inputProps={{ 'aria-label': 'A' }}/>}/>
      </FormGroup>
      <Box sx={{display: "flex", flexDirection: "row", alignItems: "center", gap: '10px'}}> 
        <Typography>Sorted</Typography>
        <FormControl sx={{width: '200px'}} >
          <Select
           value={sortOption}
            onChange={handleSortChange}>
            <MenuItem value='bydefault'>By default</MenuItem>
            <MenuItem value='newest'>Newest</MenuItem>
            <MenuItem value='price-high-low'>Price : high-low</MenuItem>
            <MenuItem value='price-low-high'>Price : low-high</MenuItem>
         </Select>
        </FormControl>
      </Box>
    </Box>
);
}

export default FilterPage