import MainPage from "../components/MainPage"
import HomePageCategories from "../components/HomePageCategories"
import Discount from "../components/Discount"
import HomePageSale from "../components/HomePageSale"


const HomePage = () => {
  return (
    <div>
      <MainPage />
      <HomePageCategories />
      <Discount />
      <HomePageSale />
    </div>
  )
}

export default HomePage