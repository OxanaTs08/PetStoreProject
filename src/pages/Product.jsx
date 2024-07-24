import { useParams } from "react-router-dom";
import {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { productById } from "../redux/slice/productsSlice";
import {addSpecificAmountToCart} from "../redux/slice/CartSlice";
import { Box, Typography, styled } from "@mui/material";
import MainButton from "../components/organisms/MainButton";
import Counter from "../components/organisms/Counter";
import DiscountPercentage from "../components/organisms/DiscountPercentage.jsx";
import BreadcrumbsComponent from "../components/organisms/BreadcrumbsComponent.jsx";
import PageNotFound from "./PageNotFound.jsx";

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

  const { productData, isLoading, isError } = useSelector((state) => state.products);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <PageNotFound />;
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

  const breadCrumbs = [
    { title: 'Main Page', link: '/' },
    { title: 'Categories', link: '/categories' },
    { title: productCategory, link: `/categories/${productCategory}` },
    { title: productTitle, link: location.pathname }
    ];

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: '40px', paddingTop: '40px' }}>
      <BreadcrumbsComponent breadcrumbs={breadCrumbs} />
      <Box sx={{ display: "flex", flexDirection: "row", gap: '32px',
          "@media (max-width: 1100px)": {
          flexDirection: "column",
          gap: "10px",
         }
          }}>
      <Box sx={{ width: '49%',height: '780px', overflow: 'hidden',
          "@media (max-width: 1100px)": {
          height: '500px',
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          }}}>
        <Image src={`http://localhost:3333/${productData?.[0]?.image}`} alt={productTitle}/>
      </Box>
      <Box sx={{ width: '49%', display: "flex", flexDirection: "column", gap: '20px', "@media (max-width: 1100px)": {
          width: '100%',
          } }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>{productTitle}</Typography>
        <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap: '20px', position: 'relative', width: '40%'}}>
         {productDiscontPrice ? (
          <>
            <Typography sx={{ fontSize: '70px', fontWeight: 'bold' }}>${productDiscontPrice}</Typography>
            <Typography sx={{ color: 'rgba(139, 139, 139, 1)', textDecoration: 'line-through', fontSize: '35px' }}>${productPrice}</Typography>
          </>
          ) : (
            <Typography sx={{ fontSize: '70px', fontWeight: 'bold' }}>${productPrice}</Typography>
        )}
        {productDiscontPrice && (
          <Box sx={{ position: 'absolute', top: 0, right: 0 }}>
          < DiscountPercentage price={productPrice} discountPrice={productDiscontPrice} />
          </Box>
        )}
        </Box>
        <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap: '10px', justifyContent: 'space-between',
             "@media (max-width: 1150px)": {
             flexDirection: "column",
              }}}>
          <Counter item={productData[0]} quantity={quantity} setQuantity={setQuantity} sx={{width: '45%'}} />
          <MainButton onClick={(event) => handleAddToCartClick(event)} buttonText='Add to Cart' sx={{width: '45%', "@media (max-width: 860px)": {
             width: '80%',
              }}} />
        </Box>
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Description</Typography>
        <Typography sx={{color: 'rgba(139, 139, 139, 1)'}}>{productDescription}</Typography>
      </Box>
    </Box>
  </Box>
  );
};

export default Product;
