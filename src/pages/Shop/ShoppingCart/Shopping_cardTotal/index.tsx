import React, { useEffect, useState } from 'react'
import { Input, Button } from 'antd';
import Search from 'antd/es/input/Search';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function Shopping_CardTotal() {
    const [isLoading, setIsLoading] = useState<boolean>();
    const total = useSelector((state) => state?.shopping);
    const navigate = useNavigate();
    const shipping = total.data.length * 5 > 16 ? total.data.length * 5 : 16

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className='w-[30%]'>
            <div className='font-medium py-2 border-b border-b-[#46A35880]'>
                Cart Total
            </div>
            <p className='font-light my-2'>Coupon Apply</p>
            <div className='flex items-center opacity-50 cursor-not-allowed'>
                <input type="text" disabled className=' w-full cursor-not-allowed p-2 rounded-l border outline-none border-[#46A358]' placeholder='enter coupon code here' />
                <button className='bg-[#46A358] cursor-not-allowed text-white font-semibold py-2 px-4 rounded-r border border-[#46A358]'>Apply</button>
            </div>
            <div className='flex justify-between items-center my-2'>
                <p className='font-light'>Subtotal</p>
                <span className='font-semibold text-base'>${total.total.toFixed(2)}</span>
            </div>
            <div className='flex justify-between items-center my-2'>
                <p className='font-light'>Coupon Discount</p>
                <span className='font-semibold text-base'>- $(0)</span>
            </div>
            <div className='flex justify-between items-center my-2'>
                <p className='font-light'>Shiping</p>
                <div className='flex flex-col items-end'>
                    <span className='font-semibold text-base'>${shipping}</span>
                    <span className='font-light text-xs text-[#46A358] cursor-pointer'>View shiping change</span>
                </div>
            </div>
            <div className='flex justify-between items-center my-5'>
                <p className='font-semibold text-base'>Total</p>
                <span className='font-semibold text-base text-[#46A358] '>${(total.total + shipping).toFixed(2) || 0}</span>
            </div>
            <button onClick={()=> navigate('/shop/shopping_checkout')} disabled={total.data.length === 0} className={`w-full p-2 bg-[#46A358] text-white font-medium rounded ${total.data.length === 0 ? "opacity-50 cursor-not-allowed" : "opacity-100 cursor-pointer"} hover:bg-[#2e6d3b] transi`}>Proceed To Checkout</button>
            <p className='text-center text-[#46A358] font-light mt-3 cursor-pointer' onClick={()=> navigate('/')} >Continue Shopping</p>
        </div>
    )
}
