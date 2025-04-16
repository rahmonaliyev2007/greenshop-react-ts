import { Trash } from 'lucide-react';
import React from 'react'
import { decreaseCountFromShopping, deleteFlowerFromShopping, increaseCountFromShopping } from '../../../../redux/ShoppingSlice';
import { useDispatch } from 'react-redux';

export default function ShoppingProductCard({ product }: any) {

    const dispatch = useDispatch();
    return (
        <li className='flex items-center px-2 py-1 bg-[#FBFBFB] rounded my-2 hover:bg-[#e7e7e7] transition-all duration-300'>
            <div className='w-[45%] flex items-center gap-3'>
                <div className='w-16 rounded h-16 object-contain overflow-hidden flex justify-center items-center'><img src={product.main_image} alt="greenshop image flower img" className='w-full h-auto object-contain mix-blend-multiply scale-100 group-hover:scale-110 transi' /></div>
                <div className='flex flex-col'>
                    <h3 className='font-semibold text-base'>{product.title}</h3>
                    <p className='text-sm text-gray-500'>SKU: {product._id}</p>
                </div>
            </div>
            <div className='w-[15%] text-start font-semibold text-black/60'>${product.price}</div>
            <div className='w-[20%] text-center flex items-center gap-2'>
                <button className={`bg-[#46A358] text-white w-6 h-6 rounded-full transi ${product.count === 1 ? ' opacity-50' : ''}`} onClick={() => {dispatch(decreaseCountFromShopping({ _id: product._id }))}} disabled={product.count === 1}>-</button>
                <span className='font-bold w-4 text-center '>{product.count}</span>
                <button className='bg-[#46A358] text-white w-6 h-6 rounded-full' onClick={() => dispatch(increaseCountFromShopping({ _id: product._id }))}>+</button>
            </div>
            <div className='w-[10%] text-center font-semibold text-[#46A358]'>${(product.count * product.price).toFixed(2)}</div>
            <div className='w-[10%] flex justify-center'><Trash size={19} className='cursor-pointer text-gray-500' onClick={() => dispatch(deleteFlowerFromShopping({ _id: product._id }))} /></div>
        </li>
    )
}
