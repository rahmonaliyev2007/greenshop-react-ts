import React from 'react'
import Shopping_Products from './Products'
import Shopping_CardTotal from './Shopping_cardTotal'
import { Link } from 'react-router-dom'

export default function Shopping_Cart() {
  return (
    <>
      <div className='flex items-center gap-2 font-semibold text-[#42A358]/30 mt-5 mb-10'>
        <Link to={'/'} className="text-black/80 hover:text-[#42A358] transi ">Home</Link>
        / <Link to={`/shop`} className="text-black/80 hover:text-[#42A358] font-light transi ">Shop</Link>
        / <p className="text-[#42A358] font-light">Shopping Cart</p>
      </div>
      <div className='flex justify-between items-start gap-10'>
        <Shopping_Products />
        <Shopping_CardTotal />
      </div>
    </>
  )
}