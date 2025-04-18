import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Shopping_Address from './ShoppingAddress'
import { User } from '../../../../types/HomeTypes';
import ShoppingOrder from './ShoppingOrder';

export default function Shopping_checkout() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { user }: Partial<User> = JSON.parse(localStorage.getItem("user") || "{}");
  const { country: initialCountry, extra_address: initialExtraAddress, state: initialState, street_address: initialStreetAddress, town: initialTown, zip: initialZip } = user?.billing_address || {};
  const [addressData, setAddressData] = useState({
    name: user?.name || '',
    surname: user?.surname || '',
    email: user?.email || '',
    phone_number: user?.phone_number || '',
    country: initialCountry || '',
    extra_address: initialExtraAddress || '',
    state: initialState || '',
    street_address: initialStreetAddress || '',
    town: initialTown || '',
    zip: initialZip || '',
    textarea: "",
  });
  const [isFieldsFilled, setIsFieldsFilled] = useState(false);
  const [startCheck, setStartCheck] = useState(false);
  return (
    <>
      <div className='flex items-center gap-2 font-semibold text-[#42A358]/30 mt-5 mb-10'>
        <Link to={'/'} className="text-black/80 hover:text-[#42A358] transi ">Home</Link>
        / <Link to={`/shop`} className="text-black/80 hover:text-[#42A358] font-light transi ">Shop</Link>
        / <Link to={`/shop/shopping_cart`} className="text-black/80 hover:text-[#42A358] font-light transi ">Shopping Cart</Link>
        / <p className="text-[#42A358] font-light">Shopping Checkout</p>
      </div>

      <div className='flex justify-between items-start gap-10'>
        <Shopping_Address addressData={addressData} setAddressData={setAddressData} setIsFieldsFilled={setIsFieldsFilled} startCheck={startCheck} setStartCheck={setStartCheck} />
        <ShoppingOrder addressData={addressData} isFieldsFilled={isFieldsFilled} setStartCheck={setStartCheck} />
      </div>
    </>
  )
}