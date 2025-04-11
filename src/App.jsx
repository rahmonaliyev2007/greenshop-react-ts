import "./App.css";
import { Route, Routes } from "react-router-dom";
import NotFound from "./components/NotFound";
import Home from "./pages/home";
import Navbar from "./components/Navbar";
import Shop from "./pages/Shop/index.jsx";
import Footer from "./components/Footer.jsx";
import Profile from "./pages/Profile/Profile.jsx";
import Account from "./pages/Profile/ProfileComponents/Account.jsx";
import MyProducts from "./pages/Profile/ProfileComponents/MyProducts.jsx";
import Wishlist from "./pages/Profile/ProfileComponents/Wishlist.jsx";
import { ConfigProvider, App as AntdApp } from "antd";
import { Toaster } from "sonner";
import Address from "./pages/Profile/ProfileComponents/Address.jsx";
import AboutProduct from "./pages/AboutProduct/index.jsx";
import AboutUser from "./pages/AboutUser/AboutUser.jsx";
import TrackOrder from "./pages/Profile/ProfileComponents/TrackOrder.jsx";

function App() {
  return (
    <ConfigProvider>
      <AntdApp>
        <Toaster position="top-right" richColors />
        <Navbar />
        <Routes>
          <Route element={<Home />} path="/" />
          <Route element={<Shop />} path="/shop" />
          <Route element={<Profile />} path="/profile">
            <Route element={<Account />} path="account" index />
            <Route element={<MyProducts />} path="myproducts" />
            <Route element={<Address />} path="address" />
            <Route element={<Wishlist />} path="wishlist" />
            <Route element={<TrackOrder />} path="track" />
          </Route>
          <Route element={<AboutProduct />} path="/aboutproduct/:route_path/:id" />
          <Route element={<AboutUser />} path="/aboutuser/:userID" />
          <Route element={<NotFound />} path="*" />
        </Routes>
        <Footer />
      </AntdApp>
    </ConfigProvider>
  );
}

export default App;
