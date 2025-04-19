import "./App.css";
import { Route, Routes } from "react-router-dom";
import NotFound from "./components/NotFound";
import Home from "./pages/home";
import Navbar from "./components/Navbar";
import Shop from "./pages/Shop/index.jsx";
import Footer from "./components/Footer.js";
import Profile from "./pages/Profile/Profile.js";
import Account from "./pages/Profile/ProfileComponents/Account.js";
import MyProducts from "./pages/Profile/ProfileComponents/MyProducts.js";
import Wishlist from "./pages/Profile/ProfileComponents/Wishlist.jsx";
import { ConfigProvider, App as AntdApp } from "antd";
import { Toaster } from "sonner";
import Address from "./pages/Profile/ProfileComponents/Address.js";
import AboutProduct from "./pages/Shop/AboutProduct/index.jsx";
import AboutUser from "./pages/AboutUser/AboutUser.jsx";
import TrackOrder from "./pages/Profile/ProfileComponents/TrackOrder.js";
import Shopping_Cart from "./pages/Shop/ShoppingCart";
import Shopping_checkout from "./pages/Shop/ShoppingCheckout";
import Blog from "./pages/Blog";
import AboutBlog from "./pages/Blog/AboutBlog";
import AddBlog from "./pages/Blog/AddBlog";

function App() {
  return (
    <ConfigProvider>
      <AntdApp>
        <Toaster position="top-right" richColors />
        <Navbar />
        <Routes>
          <Route element={<Home />} path="/" />
          <Route element={<Shop />} path="/shop" />
          <Route element={<Shopping_Cart />} path="/shop/shopping_cart" />
          <Route element={<Shopping_checkout />} path="/shop/shopping_checkout" />
          <Route element={<Profile />} path="/profile">
            <Route element={<Account />} path="account" index />
            <Route element={<MyProducts />} path="myproducts" />
            <Route element={<Address />} path="address" />
            <Route element={<Wishlist />} path="wishlist" />
            <Route element={<TrackOrder />} path="track" />
            <Route element={<NotFound />} path="*" />
          </Route>
          <Route element={<Blog />} path="/blog" />
          <Route element={<AddBlog />} path="/blog/addblog" />
          <Route element={<AboutBlog />} path="/blog/:id" />
          <Route element={<AboutProduct />} path="/aboutProduct/:route_path/:id" />
          <Route element={<AboutUser />} path="/aboutuser/:userID" />

          <Route element={<NotFound />} path="*" />
        </Routes>
        <Footer />
      </AntdApp>
    </ConfigProvider>
  );
}

export default App;
