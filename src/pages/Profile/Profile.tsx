import { Heart, LogOut, MapPin, ShoppingBag, Truck, User } from "lucide-react";
import { NavLink, Outlet } from "react-router-dom";
import { Modal } from "antd";
import { toast } from "sonner";
import { getter } from "../../hooks/useLocalStorage";

export default function ProfileLayout() {

    const handleLogout = () => {
        const name = getter({key : ' user '}).name
        Modal.confirm({
            title: "Are you sure you want to log out?",
            content: "Your shopping cart will also be cleared.",
            onOk() {
                localStorage.clear();
                toast.success(`Logged out successfully`);
                // clearCart();
                setTimeout(()=>{
                    window.location.href = "/";
                }, 2000);
            },
            onCancel() {},
        });
    }

    return (
        <div className="max-w-[1240px] mt-20 m-auto px-4 flex items-start justify-between ">
            <div className="w-[21%] rounded p-4 bg-[#FBFBFB]">
                <ul>
                    <li className="text-xl font-bold">My Account</li>
                    <li>
                        <NavLink to="/profile/account" className={({ isActive }) => `flex items-center gap-2 transi font-semibold px-2 py-1 my-2 text-lg ${isActive ? "text-[#46A358] border-l-4 border-[#46A358] cursor-not-allowed" : "border-l border-transparent "} hover:text-[#46A358]`} >
                            <User /> Account Details
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/profile/myproducts" className={({ isActive }) => `flex items-center gap-2 transi font-semibold px-2 py-1 my-2 text-lg ${isActive ? "text-[#46A358] border-l-4 border-[#46A358] cursor-not-allowed" : "border-l border-transparent "} hover:text-[#46A358]`} >
                            <ShoppingBag /> My Products
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/profile/address" className={({ isActive }) => `flex items-center gap-2 transi font-semibold px-2 py-1 my-2 text-lg ${isActive ? "text-[#46A358] border-l-4 border-[#46A358] cursor-not-allowed" : "border-l border-transparent "} hover:text-[#46A358]`} >
                            <MapPin /> Address
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/profile/wishlist" className={({ isActive }) => `flex items-center gap-2 transi font-semibold px-2 py-1 my-2 text-lg ${isActive ? "text-[#46A358] border-l-4 border-[#46A358] cursor-not-allowed" : "border-l border-transparent "} hover:text-[#46A358]`} >
                            <Heart /> Wishlist
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/profile/track" className={({ isActive }) => `flex items-center gap-2 transi font-semibold px-2 py-1 my-2 text-lg ${isActive ? "text-[#46A358] border-l-4 border-[#46A358] cursor-not-allowed" : "border-l border-transparent "} hover:text-[#46A358]`} >
                            <Truck /> Track Order
                        </NavLink>
                    </li>
                    <hr className="my-5 border-none h-0.5 rounded bg-[#46A358]/30" />
                    <li onClick={handleLogout} className="flex items-center gap-2 transi font-semibold px-2 py-1 my-2 text-lg text-red-500 cursor-pointer"><LogOut /> Logout</li>
                </ul>
            </div>
            <div className="w-[74%] ">
                <Outlet/>
            </div>
        </div>
    );
}