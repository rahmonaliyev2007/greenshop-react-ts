import { FC, useEffect, useState } from "react";
import { Search, ShoppingCart, Heart, User, LogOutIcon } from "lucide-react";
import { Modal } from 'antd';
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import Auth from "../Auth";
import { useSelector } from "react-redux";

const Navbar: FC = () => {
  const [user, setUser] = useState<any>();
  const { pathname } = useLocation();
  const router = useNavigate();
  const [isLogged, setIsLogged] = useState<boolean>(false);
  const [isLoginOpen, setIsLoginOpen] = useState<boolean>(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState<boolean>(false);
  const cartItems = useSelector((state: any) => state.shopping.data.length);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const showModal = () => {
    setIsModalOpen(true); setIsLoginOpen(true); setIsRegisterOpen(false);
  };
  
  const handleOk = () => { setIsModalOpen(false) };
  const handleCancel = () => { setIsModalOpen(false) };
  const navLinks: { name: string; path: string }[] = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/shop" },
    { name: "Blog", path: "/blog" },
  ];

  useEffect(() => {
    const storedUser  = localStorage.getItem("user");
    const user = storedUser ? JSON.parse(storedUser) : null;
    setUser(user);
    if (user) {
      setIsLogged(true);
    }
  }, [isLogged])
  return (
    <nav className="top-5 sticky w-full z-50 bg-white">
      <div className="flex justify-between items-center max-w-[1240px] mx-auto py-5">
        <Link to="/" className="logo">
          <img src="/images/logo.svg" alt="logo" width={150} height={35} />
        </Link>
        <ul className="flex gap-8 font-medium text-gray-700">
          {navLinks.map((link) => (
            <li key={link.path}>
              <NavLink to={link.path} className={({ isActive }) => `py-[29px] border-b-2 transi hover:text-[#46A358] ${isActive ? "border-[#46A358] text-[#46A358]" : isActive && pathname.includes('/aboutProduct') ? "border-[#46A358] text-[#46A358]" : "border-transparent "}`}>
                {link.name}
              </NavLink>
            </li>
          ))}
        </ul>
        <div className="flex items-center">
          <button className="cursor-pointer hover:text-[#46A358] transition-all"><Search size={24} /></button>
          <button onClick={()=> router('/shop/shopping_cart')} className="relative cursor-pointer mx-6 hover:text-[#46A358] transition-all">
            <ShoppingCart size={24} />
            {cartItems > 0 && ( <div className="absolute -top-3 -right-3 text-xs grid place-items-center text-white rounded-full border-2 border-white bg-[#46A358] w-[25px] h-[25px]">
                {cartItems}
              </div>)}
          </button>
          {isLogged ? (
            <div className="flex items-center gap-3">
              <button onClick={() => router("/profile/account")} className="bg-[#46A358] logo  px-4 py-2 rounded-md text-white flex items-center gap-2 transition-all">
                <User size={16} /> {user?.user?.name || "User"}
              </button>
            </div>
          ) : (
            <div>
              <button type="button" onClick={showModal} className="bg-[#46A358] font-semibold hover:bg-[#46A358]/70 px-4 py-2 rounded-md text-white flex items-center gap-2 transition-all">
                <LogOutIcon size={16} className="font-semibold" /> Login
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="max-w-[1280px] m-auto h-[2px] ">
        <hr className="bg-[#46a3597f] border-none w-full h-[2px]"></hr>
      </div>
      <Modal className="transi" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={null}>
        <div className="w-full my-4 flex justify-center items-center gap-3 text-xl font-semibold">
          <button onClick={() => { setIsLoginOpen(true); setIsRegisterOpen(false); }} className={`${isLoginOpen ? "text-[#46A358]" : ""}`}>Login</button>
          <div className="border-r-2 border-gray-300 h-4"></div>
          <button onClick={() => { setIsLoginOpen(false); setIsRegisterOpen(true); }} className={`${!isLoginOpen ? "text-[#46A358]" : ""}`}>Register</button>
        </div>
        <Auth isLoginOpen={isLoginOpen} isRegisterOpen={isRegisterOpen} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} setIsLogged={setIsLogged} />
      </Modal>
    </nav>
  );
}

export default Navbar;
