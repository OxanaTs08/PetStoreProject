import { useParams } from "react-router-dom";
import {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { productById } from "../redux/slice/productsSlice";
import {addSpecificAmountToCart} from "../redux/slice/CartSlice";
import { Box, Typography, Divider, styled } from "@mui/material";
import { NavLink } from "react-router-dom";
import ButtonInTitle from "../components/organisms/ButtonInTitle";
import MainButton from "../components/organisms/MainButton";
import Counter from "../components/organisms/Counter";
import DiscountPercentage from "../components/organisms/DiscountPercentage.jsx";

const Image = styled('img')(() => ({
  borderRadius: '10px',
  objectFit: 'cover',
  width: '500px', 
  height: '500px'
})
)

const Product = () => {
  const [quantity, setQuantity] = useState(1);
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

  const handleAddToCartClick = (event) => {
    event.preventDefault();
    const item = {
      id: productData[0].id,
      title: productData[0].title,
      price: productData[0].price,
      discont_price: productData[0].discont_price,
      image: productData[0].image,
      quantity: quantity,
    }
    dispatch(addSpecificAmountToCart(item))
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
        <Image src={`http://localhost:3333/${productData?.[0]?.image}`} alt={productTitle}/>
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
          < DiscountPercentage price={productPrice} discountPrice={productDiscontPrice} />
        )}
        </Box>
        <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap: '10px', justifyContent: 'space-between' }}>
          <Counter item={productData[0]} quantity={quantity} setQuantity={setQuantity} sx={{width: '45%'}} />
          <MainButton onClick={(event) => handleAddToCartClick(event)} buttonText='Add to Cart' sx={{width: '45%'}} />
        </Box>
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Description</Typography>
        <Typography>{productDescription}</Typography>
      </Box>
    </Box>
  </Box>
  );
};

export default Product;
