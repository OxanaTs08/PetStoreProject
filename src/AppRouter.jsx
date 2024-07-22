import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './pages/Layout'
import Category from './pages/Category'
import HomePage from './pages/HomePage'
import ListCategories from './pages/ListCategories'
import SaleProducts from './pages/SaleProducts'
import Product from './pages/Product'
import AllProducts from './pages/AllProducts'
import Cart from './pages/Cart/Cart'
import PageNotFound from './pages/PageNotFound'

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes >
        <Route path="/" element={<Layout />} >
          <Route path="/" element={<HomePage />} />
          <Route path="/categories" element={<ListCategories/>} />
          <Route path="/categories/:categoryId" element={<Category />} />
          <Route path="/products/sale" element={<SaleProducts/>} />
          <Route path="/products/" element={<AllProducts />} />
          <Route path="/products/:productId" element={<Product/>} />
          <Route path="/cart" element={<Cart/>} />
          <Route path="*" element={<PageNotFound />} />
      </Route >  
    </Routes>
  </BrowserRouter>
)
}

export default AppRouter

