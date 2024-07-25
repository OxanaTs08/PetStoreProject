import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  Stack,
} from '@mui/material';
import { useEffect, useState } from 'react';

const FilterDefinition = ({
  setFilteredProducts,
  products,
  onSale = false,
}) => {
  const [sortOption, setSortOption] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [showDiscounted, setShowDiscounted] = useState(onSale);
  useEffect(() => {
    if (!products) {
      return;
    }
    const applyPriceFilter = (products) => {
      return products.filter((product) => {
        const price = product.discont_price || product.price;
        if (minPrice && price < minPrice) return false;
        if (maxPrice && price > maxPrice) return false;
        if (showDiscounted && !product.discont_price) return false;
        return true;
      });
    };

    const sortedAndFilteredProducts = () => {
      let filteredProducts = applyPriceFilter(products);
      if (sortOption === 'newest') {
        return filteredProducts
          .slice()
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
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

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  const handleMinPriceChange = (event) => {
    const value = event.target.value;
    if (value === '' || /^[0-9]\d*$/.test(value)) {
      setMinPrice(value);
    }
  };

  const handleMaxPriceChange = (event) => {
    const value = event.target.value;
    if (value === '' || /^[1-9]\d*$/.test(value)) {
      setMaxPrice(value);
    }
  };

  const handleDiscountChange = (event) => {
    setShowDiscounted(event.target.checked);
  };
  return (
    <Stack
      sx={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: '40px',
      }}
    >
      <Stack
        sx={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: '10px',
        }}
      >
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
      </Stack>
      {!onSale && (
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
      )}
      <Stack
        sx={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: '10px',
        }}
      >
        <Typography>Sorted</Typography>
        <FormControl sx={{ width: '200px' }}>
          <InputLabel id="demo-simple-select-label">by default</InputLabel>
          <Select value={sortOption} onChange={handleSortChange}>
            <MenuItem value="newest">Newest</MenuItem>
            <MenuItem value="price-high-low">Price : high-low</MenuItem>
            <MenuItem value="price-low-high">Price : low-high</MenuItem>
          </Select>
        </FormControl>
      </Stack>
    </Stack>
  );
};

export default FilterDefinition;
