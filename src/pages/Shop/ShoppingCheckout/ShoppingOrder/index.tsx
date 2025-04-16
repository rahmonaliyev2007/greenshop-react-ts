import { useSelector } from 'react-redux'
import ShoppingOrderCard from './ShoppingOrderCard'
import { useNavigate } from 'react-router-dom'

export default function ShoppingOrder({ addressData }: any) {
    const products = useSelector((state: any) => state.shopping)
    const navigate = useNavigate();
    return (
        <div className='w-[35%]'>
            <p className='font-semibold text-lg'>Your Oder</p>
            <div className='flex justify-between items-center py-2 border-b border-b-[#46A35880] font-medium'>
                <p>Products</p>
                <span>Subtotal</span>
            </div>
            <ul>
                {products?.data?.map((product: any) => { return (<ShoppingOrderCard product={product} />) })}
            </ul>
            <p className='text-end text-xs mt-5'>Have a coupon code? <span className='text-[#46A358] cursor-pointer' onClick={() => navigate('/shop/shopping_cart')}> Click here</span></p>
            <div className='pl-16'>
                <div className='flex justify-between items-center my-3'>
                    <p >Subtotal</p>
                    <span className='font-semibold text-base'>${products.total.toFixed(2)}</span>
                </div>
                <div className='flex justify-between items-center my-3'>
                    <p >Coupon Discount</p>
                    <span className='font-semibold text-base'>- $(0)</span>
                </div>
                <div className='flex justify-between items-center my-3'>
                    <p >Shiping</p>
                    <div className='flex flex-col items-end'>
                        <span className='font-semibold text-base'>${products.data.length * 5 > 16 ? products.data.length * 5 : 16}</span>
                        <span className='font-light text-xs text-[#46A358] cursor-pointer'>View shiping change</span>
                    </div>
                </div>
                <hr className='border-none h-[1px] bg-[#46A35880]' />
                <div className='flex justify-between items-center my-5'>
                    <p className='font-semibold text-base'>Total</p>
                    <span className='font-semibold text-base text-[#46A358] '>${(products.total).toFixed(2) || 0}</span>
                </div>
                <div>
                    <button>
                        <input type="radio" name='payment_method' value={'chash'} />
                        chashg
                    </button>
                    <button>
                        <input type="radio" name='payment_method' value={'card'} />
                        chashg
                    </button>
                    <button>
                        <input type="radio" name='payment_method' value={'dorent'} />
                        chashg
                    </button>
                </div>
            </div>
        </div>
    )

}