import MainPage from "./MainPage"
import HomePageCategories from "./HomePageCategories"
import Discount from "./Discount"
import HomePageSale from "./HomePageSale"


const HomePage = () => {
  return (
    <div style={{display: 'flex', flexDirection: 'column', gap: '80px'}}>
      <MainPage />
      <HomePageCategories />
      <Discount />
      <HomePageSale />
    </div>
  )
}

export default HomePage