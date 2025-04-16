import React, { FC, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import ShoppingProductCard from './ShoppingProductCard';
import { ShoppingProductType } from '../../../../../types/HomeTypes';


export default function Shopping_Products() {
  const products: Partial<ShoppingProductType> = useSelector((state: any) => state?.shopping?.data)
  const [seeAll, setSeeAll] = useState<number>(5);
  useEffect(()=>{
    setSeeAll(5);
  }, [])
  return (
    <div className='w-[70%]'>
      <ul>
        <li className='flex items-center font-medium py-2 border-b border-b-[#46A35880]'>
          <div className='w-[45%]'>Products</div>
          <div className='w-[15%]'>Price</div>
          <div className='w-[20%]'>Quantity</div>
          <div className='w-[10%]'>Total</div>
          <div className='w-[10%]'></div>
        </li>
        {products?.slice(0, seeAll).map((product, index) => {
          return (
            <ShoppingProductCard key={index} product={product} />
          )
        })}
      </ul>

      {seeAll === 5 && products.length > 5 &&
        <button className='bg-[#46A358] py-1 px-5 rounded text-white m-auto block transi mt-5 text-base cursor-pointer hover:bg-[#2d6c3b]' onClick={() => setSeeAll(1000)}>See All</button>
      }

    </div>
  )
}
