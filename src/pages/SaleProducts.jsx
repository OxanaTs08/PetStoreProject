import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {allProducts} from "../redux/slice/productsSlice";
import {Box, Grid, Typography, Divider, styled, TextField, FormControl, Select, MenuItem, InputLabel} from "@mui/material";
import {NavLink} from "react-router-dom";
import PageTitle from "../components/organisms/PageTitle";
import ButtonInTitle from "../components/organisms/ButtonInTitle";
import {useState} from "react";
import MainButton from "../components/organisms/MainButton";
import {addToCart} from "../redux/slice/CartSlice";
import DiscountPercentage from "../components/organisms/DiscountPercentage";
import FilterDefinition from "../components/FilterDefinition.jsx";


const ProductCard = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  gap: '20px',
  border: '1px solid rgba(221, 221, 221, 1)',
  borderRadius: '10px',
  position: 'relative',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
      '& .add-to-cart-button': {
          opacity: 1,
          visibility: 'visible',
      },
  },
}))

const CartButtonBox = styled(Box) (() => ({
  position: 'absolute',
  bottom: '16px',
  padding: '0 16px',
  width: '100%',
  display: "flex",
  justifyContent: "center",
  opacity: 0,
  visibility: 'hidden',
  transition: 'opacity 0.3s ease, visibility 0.3s ease',
  zIndex: 1
}))

const StyledNavLink = styled(NavLink)(() => ({
  color: 'rgba(40, 40, 40, 1)',
  textDecoration: 'none',
  '&:hover': {
    cursor: 'pointer',
  },
}))

const SaleProducts = () => {
  const dispatch = useDispatch();
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
      dispatch(allProducts());
  }, [ dispatch]);

  const { products, isLoading, isError, message } = useSelector((state) => state.products);


  if (isLoading) {
      return <div>Loading...</div>;
  }

  if (isError) {
      return <div>{message.message}</div>;
  }



  const handleAddToCartClick =(product) => (event) => {
    event.preventDefault();
    const item = {
      id: product.id,
      title: product.title,
      price: product.price,
      discont_price: product.discont_price,
      image: product.image,
      quantity: 1,
    }
    dispatch(addToCart(item))
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
            <NavLink to='/products/sale'><ButtonInTitle buttonTitle='All Sales'/></NavLink>
          </Box>
          <PageTitle title='Discounted Items'/>
            <FilterDefinition filteredProducts={filteredProducts} setFilteredProducts={setFilteredProducts} products={products} onSale/>

            <Grid container spacing={2} justifyContent="center" grid-auto-rows='1fr'>
              {filteredProducts && filteredProducts.map((product) => (
              <Grid item xs={12} sm={6} md={3} key={product.id}  >
                <StyledNavLink to={`/products/${product.id}`}>
                <ProductCard>  
                <Box sx={{display: "flex", 
                         flexDirection: "column", 
                         gap: '20px', 
                         border: ' 1px solid rgba(221, 221, 221, 1)', 
                         borderRadius: '10px',
                         position: 'relative'}}>
                    <Box sx={{
                            position: 'relative',
                            width: '100%',
                            height: '284px',
                            overflow: 'hidden',
                            borderRadius: '10px',
                            overflow: 'hidden'
                            }}>  
                      <img src={`http://localhost:3333/${product.image}`} 
                         alt={product.title}
                         sx={{borderRadius: '10px',
                              width: '100%',
                              height: 'auto',
                              objectFit: 'cover',
                              position: 'absolute',
                              top: 0,
                              left: 0,}} />
                      {product.discont_price && (       
                      <DiscountPercentage price={product.price} discountPrice={product.discont_price} />
                      )}
                      <CartButtonBox className="add-to-cart-button" >
                        <MainButton onClick={handleAddToCartClick(product)} buttonText='Add to Cart' sx={{width: '100%'}}/>
                      </CartButtonBox>        
                    </Box>           
                    <Box sx={{padding: '0 32px'}}>        
                    <Typography sx={{textAlign: "center",
                                     whiteSpace: 'nowrap',
                                     overflow: 'hidden',
                                     textOverflow: 'ellipsis'
                        }}>{product.title}</Typography> 
                    <Box sx={{display: "flex", flexDirection: "row", gap: '16px', alignItems: 'end'}}>
                        {product.discont_price ? (
                        <>
                            <Typography sx={{ fontSize: '40px', fontWeight: 'bold' }}>${product.discont_price}</Typography>
                            <Typography sx={{ color: 'rgba(139, 139, 139, 1)', textDecoration: 'line-through', fontSize: '20px' }}>${product.price}</Typography>
                        </>
                        ) : (
                            <Typography sx={{ fontSize: '40px', fontWeight: 'bold' }}>${product.price}</Typography>
                        )}
                    </Box> 
                    </Box>   
                </Box>
                </ProductCard>  
                </StyledNavLink>
              </Grid>  
            ))}
          </Grid>  
        </Box>
    );
}

export default SaleProducts;