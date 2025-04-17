import { useDispatch, useSelector } from 'react-redux'
import ShoppingOrderCard from './ShoppingOrderCard'
import { useNavigate } from 'react-router-dom'
import { Modal, Radio } from 'antd'
import { useMutation, useQuery } from '@tanstack/react-query'
import { handleMakeOrder } from '../../../../hooks/LikeFn'
import { makeEverythingZero } from '../../../../redux/ShoppingSlice'
import { getter } from '../../../../hooks/useLocalStorage'
import { toast } from 'sonner'
import { useState } from 'react'

export default function ShoppingOrder({ addressData, isFieldsFilled, setStartCheck }: any) {
    const products = useSelector((state: any) => state.shopping)
    const shipping = products.data.length * 5 > 16 ? products.data.length * 5 : 16
    const totalPr = +products.total + shipping
    const navigate = useNavigate();
    const { textarea, name, surname, extra_address } = addressData
    const billing_address = { ...addressData, order_notes: textarea, first_name: name, last_name: surname, additional_street_address: extra_address, payment_method: 'cash-on-delivery' };
    const total = products.total + shipping
    const extra_shop_info = { total_price: total, method: "cash-on-delivery", shiping: shipping, coupon: products.coupon }
    const dispatch = useDispatch();

    const { mutate: makeOrder, data, error, isPending } = useMutation({
        mutationKey: ["makeOrder"],
        mutationFn: () => handleMakeOrder({ queryKey: ["makeOrder", products, billing_address, extra_shop_info] }),
        onSuccess: (data: any) => {
            dispatch(makeEverythingZero());
            Modal.confirm({
                icon: null, title: null, okText: "Track Order", cancelButtonProps: { style: { display: 'none' } },
                content: (
                    <div className="text-center">
                        <p className="text-lg font-semibold mb-4">Your Order succesfully placed!</p>
                    </div>
                ),
                okButtonProps: {
                    className: "bg-[#46A358] hover:bg-[#46A358] text-white",
                    style: {
                        display: 'block',
                        margin: '0 auto',
                    }
                },
                onOk() {
                    navigate("/profile/track");
                },
            });
            onError: (error: any) => {
                console.error("error:", error);
            }
        }
    });

    let [calledOnce, setCalledOnce] = useState(false);
    const handleOrder = () => {
        const { user } = getter({ key: "user" }) || {};

        if (!user) {
            toast.error("Please Login or Register first");
            return;
        }
        if (!calledOnce) {
            setStartCheck(true);  
            setCalledOnce(true);
            setTimeout(() => {
                handleOrder();  
            }, 50);
            return;
        }

        
        if (isFieldsFilled) {
            makeOrder(); 
        } else {
            toast.error("Please fill all fields");
        }

        setCalledOnce(false);
    };

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
                    <span className='font-semibold text-base text-[#46A358] '>${(totalPr).toFixed(2) || 0}</span>
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
                <button onClick={handleOrder} disabled={products.data.length === 0} className={`bg-[#46A358] cursor-not-allowed transi logo text-white p-2 rounded w-full font-semibold ${products.data.length !== 0 ? "opacity-100" : "opacity-50"} `} >{isPending ? "Placing order" : "Place Order"}</button>
            </div>
        </div>
    )

}