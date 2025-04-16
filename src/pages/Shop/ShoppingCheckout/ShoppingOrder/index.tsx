import { useSelector } from 'react-redux'
import ShoppingOrderCard from './ShoppingOrderCard'
import { useNavigate } from 'react-router-dom'
import { Radio } from 'antd'

export default function ShoppingOrder({ addressData }: any) {
    const products = useSelector((state: any) => state.shopping)
    const shipping = products.data.length * 5 > 16 ? products.data.length * 5 : 16
    const total = +products.total + shipping
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
                        <span className='font-semibold text-base'>${shipping}</span>
                        <span className='font-light text-xs text-[#46A358] cursor-pointer'>View shiping change</span>
                    </div>
                </div>
                <hr className='border-none h-[1px] bg-[#46A35880]' />
                <div className='flex justify-between items-center my-5'>
                    <p className='font-semibold text-base'>Total</p>
                    <span className='font-semibold text-base text-[#46A358] '>${(total).toFixed(2) || 0}</span>
                </div>
                <div className="my-5">
                    <p className="font-semibold text-base mb-2">Payment Method</p>
                    <Radio.Group defaultValue="cash" className="flex flex-col gap-3">
                        <Radio value="card" className="!border !rounded-md !px-3 mr-0 py-2" disabled>
                            <div className="flex items-center gap-2 h-full ">
                                <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="w-10" />
                                <img src="https://upload.wikimedia.org/wikipedia/commons/0/04/Mastercard-logo.png" alt="MasterCard" className="w-8" />
                                <img src="https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png" alt="Visa" className="w-10" />
                                <img src="https://1000logos.net/wp-content/uploads/2016/10/American-Express-Color.png" alt="Amex" className="w-10" /></div>
                        </Radio>
                        <Radio value="bank" className="!border !rounded-md !px-3 py-2 mr-0" disabled>Direct bank transfer</Radio>
                        <Radio value="cash" className="!border !rounded-md !px-3 py-2">Cash on delivery</Radio>
                    </Radio.Group>
                </div>
                <button disabled className='bg-[#46A358] cursor-not-allowed opacity-50 transi logo text-white p-2 rounded w-full font-semibold' >Place Order</button>
                <p>order not available yet</p>
            </div>
        </div>
    )

}