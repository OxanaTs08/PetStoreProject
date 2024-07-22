import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { productById } from "../redux/slice/productsSlice";
import { addToCart } from "../redux/slice/CartSlice";
import { Box, Typography, Divider } from "@mui/material";
import { NavLink } from "react-router-dom";
import ButtonInTitle from "../components/organisms/ButtonInTitle";
import MainButton from "../components/organisms/MainButton";
import Counter from "../components/organisms/Counter";


const Product = () => {
    const { productId } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(productById(productId));
      }, [productId, dispatch]);

    const { productData, isLoading, isError, message } = useSelector((state) => state.products);

    if (isLoading) {
      return <div>Loading...</div>;
  }

  if (isError) {
      return <div>{message}</div>;
  }

  if (!productData) {
      return <div>No product found.</div>;
  }

    const productTitle = productData?.[0]?.title;
    const productPrice = productData?.[0]?.price;
    const productDiscontPrice = productData?.[0]?.discont_price;
    const productDescription = productData?.[0]?.description;
    const productCategory = productData?.[0]?.categoryId;

    
    const getDiscountPercentage = (price, discountPrice) => {
        if (discountPrice == null) {
            return null;
        }
        return Math.round(((price - discountPrice) / price) * 100);
    };

    const handleAddToCartClick = (event) => {
        event.preventDefault();
        const item = {
          id: productData[0].id,
          title: productData[0].title,
          price: productData[0].price,
          discont_price: productData[0].discont_price,
          quantity: 1,
        }
        dispatch(addToCart(item))
    };

    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: '40px' }}>
            <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                <NavLink to='/'><ButtonInTitle buttonTitle='Main Page' /></NavLink>
                <Divider sx={{ color: 'rgba(221, 221, 221, 1)', height: '2px', width: '16px', borderColor: 'rgba(221, 221, 221, 1)' }} />
                <NavLink to='/categories'><ButtonInTitle buttonTitle='Categories' /></NavLink>
                <Divider sx={{ color: 'rgba(221, 221, 221, 1)', height: '2px', width: '16px', borderColor: 'rgba(221, 221, 221, 1)' }} />
                <NavLink><ButtonInTitle buttonTitle={productCategory} /></NavLink>
                <Divider sx={{ color: 'rgba(221, 221, 221, 1)', height: '2px', width: '16px', borderColor: 'rgba(221, 221, 221, 1)' }} />
                <NavLink to={location.pathname}><ButtonInTitle buttonTitle={productTitle} /></NavLink>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap: '40px' }}>
              <Box sx={{width: '50%', height: '780px', overflow: 'hidden'}}>
                  <img src={`http://localhost:3333/${productData?.[0]?.image}`} alt={productTitle} sx={{width: '200px', height: '200px', objectFit: 'contained'}}/>
              </Box>
              <Box sx={{ display: "flex", flexDirection: "column", gap: '20px', width: '40%' }}>
                <Typography variant="h2" sx={{ fontWeight: 'bold' }}>{productTitle}</Typography>
                <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap: '10px' }}>
                {productDiscontPrice ? (
                        <>
                            <Typography sx={{ fontSize: '40px', fontWeight: 'bold' }}>${productDiscontPrice}</Typography>
                            <Typography sx={{ color: 'rgba(139, 139, 139, 1)', textDecoration: 'line-through', fontSize: '20px' }}>${productPrice}</Typography>
                        </>
                        ) : (
                            <Typography sx={{ fontSize: '40px', fontWeight: 'bold' }}>${productPrice}</Typography>
                        )}
                  {productDiscontPrice && (
                  <>
                    <Box sx={{
                      backgroundColor: 'blue',
                      color: 'white',
                      padding: '5px 10px',
                      borderRadius: '5px'
                    }}>
                    -{getDiscountPercentage(productPrice, productDiscontPrice)}%
                    </Box>
                  </>
                  )}
                  </Box>
                  <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap: '10px' }}>
                    <Counter item={productData[0]} />
                    <MainButton onClick={(event) => handleAddToCartClick(event)} buttonText='Add to Cart' />
                  </Box>
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Description</Typography>
                  <Typography>{productDescription}</Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default Product;
