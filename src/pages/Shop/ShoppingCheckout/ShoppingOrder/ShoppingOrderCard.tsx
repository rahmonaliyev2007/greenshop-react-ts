import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function ShoppingOrderCard({ product }: any) {
    const navigate = useNavigate();
    const category = product.title === 'Peace Lil' ? 'house-plants' : product.category;
    
    return (
        <li onClick={()=> navigate(`/aboutProduct/${category}/${product._id}`)} key={product._id} className='flex cursor-pointer justify-between items-center my-2 bg-[#FBFBFB] px-2 py-1 rounded'>
            <div className=' flex items-center gap-3'>
                <div className='w-12 rounded h-12 object-contain overflow-hidden flex justify-center items-center'><img src={product.main_image} alt="greenshop image flower img" className='w-full h-auto object-contain mix-blend-multiply scale-100 group-hover:scale-110 transi' /></div>
                <div className='flex flex-col'>
                    <h3 className='font-semibold text-base'>{product.title}</h3>
                    <p className='text-xs text-gray-500'>SKU: {product._id}</p>
                </div>
            </div>
            <div className='flex justify-between w-[30%] items-center gap-4 font-semibold'>
                <p className='text-gray-500 text-xs'>( x <span className='!w-3'>{product.count}</span>)</p>
                <p className='text-base text-[#46A358]'>${product.count * product.price}</p>
            </div>

        </li>
    )
}
