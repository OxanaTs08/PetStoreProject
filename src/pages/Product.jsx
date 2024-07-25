import { useParams } from "react-router-dom";
import {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { productById } from "../redux/slice/productsSlice";
import {addSpecificAmountToCart} from "../redux/slice/CartSlice";
import { Box, Typography, styled, Stack } from "@mui/material";
import MainButton from "../components/organisms/MainButton";
import Counter from "../components/organisms/Counter";
import DiscountPercentage from "../components/organisms/DiscountPercentage.jsx";
import BreadCrumbsComponent from "../components/organisms/BreadCrumbsComponent.jsx";
import PageNotFound from "./PageNotFound.jsx";
import { useMediaQuery } from '@mui/material'
import { useTheme } from '@mui/material';
import BreadCrumbsMobile from "../components/organisms/BreadCrumbsMobile.jsx";

const Image = styled('img')(() => ({
  borderRadius: '10px',
  objectFit: 'cover',
  width: '500px', 
  height: '500px',
  "@media (max-width: 860px)": {
    width: '200px', 
    height: '200px',
  }
})
)

const Product = () => {
  const [quantity, setQuantity] = useState(1);
  const [expanded, setExpanded] = useState(false);
  const { productId } = useParams();
  const dispatch = useDispatch();

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'))
  

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

  const handleExpand = () => {
      setExpanded(!expanded);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: '40px', paddingTop: '40px' }}>
      {isSmallScreen ? (
        <BreadCrumbsMobile breadcrumbs={breadCrumbs} />
      ) : (
        <BreadCrumbsComponent breadcrumbs={breadCrumbs}/>
      )}
      
      <Box sx={{ display: "flex", flexDirection: isSmallScreen? "column" : "row", gap: isSmallScreen? '10px' : '32px'}}>
      <Box sx={{ width: isSmallScreen? '100%' : '49%', height: isSmallScreen? '200px' : '780px', overflow: 'hidden', 
          "@media (max-width: 860px)": {
          display: 'flex',
          justifyContent: 'center'
          }}}>
        <Image src={`http://localhost:3333/${productData?.[0]?.image}`} alt={productTitle}/>
      </Box>
      <Stack sx={{ width: isSmallScreen? '100%' : '49%', gap: '20px'}}>
        <Typography variant={isSmallScreen? 'h5' : 'h4'} sx={{ fontWeight: 'bold', textAlign: 'center' }}>{productTitle}</Typography>
        <Stack direction="row" 
            alignItems="center" 
            sx={{justifyContent: isSmallScreen ? 'center' : 'flex-start', 
            gap: isSmallScreen? '10px' : '20px', 
            position: 'relative'
            }}>
         {productDiscontPrice ? (
          < >
            <Typography sx={{ fontSize: isSmallScreen ? '35px' : '70px', fontWeight: 'bold' }}>${productDiscontPrice}</Typography>
            <Typography sx={{ color: 'rgba(139, 139, 139, 1)', textDecoration: 'line-through', fontSize: isSmallScreen ? '25px' : '35px' }}>${productPrice}</Typography>
          </>
          ) : (
            <Typography sx={{ fontSize: isSmallScreen ? '35px' : '70px', fontWeight: 'bold' }}>${productPrice}</Typography>
        )}
        {productDiscontPrice && (
          <Box sx={{ position: isSmallScreen ? 'block' : 'absolute', top: 0, right: 0 }}>
          < DiscountPercentage price={productPrice} discountPrice={productDiscontPrice} />
          </Box>
        )}
        </Stack>
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
        <Typography sx={{color: 'rgba(139, 139, 139, 1)', display: expanded ? 'block' : '-webkit-box',
            WebkitLineClamp: expanded ? 'none' : 2,
            WebkitBoxOrient: 'vertical',
            textOverflow: 'ellipsis',
            overflow: expanded ? 'visible' : 'hidden',
            cursor: 'pointer'}}
            onClick={handleExpand}>{productDescription}</Typography>
      </Stack>
    </Box>
  </Box>
  );
};

export default Product;
