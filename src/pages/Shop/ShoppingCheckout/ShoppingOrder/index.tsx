import { useDispatch, useSelector } from 'react-redux'
import ShoppingOrderCard from './ShoppingOrderCard'
import { useNavigate } from 'react-router-dom'
import { Modal, Radio, Spin } from 'antd'
import { useMutation } from '@tanstack/react-query'
import { handleMakeOrder } from '../../../../hooks/LikeFn'
import { makeEverythingZero } from '../../../../redux/ShoppingSlice'
import { getter } from '../../../../hooks/useLocalStorage'
import { toast } from 'sonner'
import { useState } from 'react'
import { X } from 'lucide-react'
import { LoadingOutlined } from '@ant-design/icons'

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
            console.log(data);
            dispatch(makeEverythingZero());
            Modal.confirm({
                icon: null,
                title: null,
                okText: "Track your order",
                cancelButtonProps: { style: { display: 'none' } },
                content: (
                    Modal.confirm({
                        icon: null,
                        title: null,
                        okText: "Track your order",
                        cancelButtonProps: { style: { display: 'none' } },
                        content: (
                            <div className="text-sm max-w-[700px] w-full mx-auto relative">
                                <button className="absolute right-0 top-0 text-xl font-bold text-gray-500 hover:text-gray-800" onClick={() => {Modal.destroyAll();  navigate('/')}}
                                ><X />
                                </button>
                                <p className="text-lg font-bold mb-4 mt-2">Order Confirmation</p>
                                <div className="grid grid-cols-2 text-sm mb-4 gap-4">
                                    <div><b>Order Number</b><br />{data?.data?._id.slice(-14) || 'N/A'}</div>
                                    <div><b>Date</b><br />{new Date(data.data.created_at).toDateString()}</div>
                                    <div><b>Total</b><br />${(data?.data?.total_price || total).toFixed(2)}</div>
                                    <div><b>Payment Method</b><br />{data?.data?.extra_shop_info.method || 'Other payment method'}</div>
                                </div>

                                <p className="font-semibold border-b pb-2 mb-2">Order Details</p>

                                <div className='max-h-[250px] overflow-y-scroll'>
                                {data?.data?.shop_list?.map((item: any, idx: number) => (
                                    <div key={idx} className="flex items-center gap-4 border-b py-2">
                                        <img src={item.main_image || ""} alt={item.title} className="w-12 h-12 object-cover" />
                                        <div className="flex-grow">
                                            <p>{item.title} <span className='text-xs text-gray-500'>( x{item.count})</span> </p>
                                            <p className="text-xs text-gray-500">SKU: {item._id}</p>
                                        </div>
                                        <p className="font-medium text-[#46A358]">${(item.price * item.count).toFixed(2) || 0}</p>
                                    </div>
                                ))}
                                </div>
                                <div className="mt-4 text-right text-sm">
                                    <p>Shipping: <b className='text-[#46A358]'>${data?.data?.extra_shop_info?.shiping}</b></p>
                                    <p>Total: <b className='text-[#46A358]'>${(data?.data?.total_price || total).toFixed(2)}</b></p>
                                </div>

                                <p className="mt-5 text-center text-xs text-gray-600">
                                    Your order is currently being processed. You will receive an order confirmation email shortly with the expected delivery date.
                                </p>
                            </div>
                        ),
                        okButtonProps: {
                            className: "bg-[#46A358] hover:bg-[#46A358] text-white",
                            style: { display: 'block', margin: '0 auto' },
                        },
                        onOk() {
                            navigate("/profile/track");
                        }
                    })
                ),
                okButtonProps: {
                    className: "bg-[#46A358] hover:bg-[#46A358] text-white",
                    style: { display: 'block', margin: '0 auto' },
                },
                onOk() {
                    navigate("/profile/track");
                }
            });
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
        setStartCheck(true)
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
            <ul className='max-h-[330px] overflow-y-scroll'>
                {products?.data?.map((product: any) => { return (<ShoppingOrderCard product={product} />) })}
            </ul>
            <p className='text-end text-xs mt-5'>Have a coupon code? <span className='text-[#46A358] cursor-pointer' onClick={() => navigate('/shop/shopping_cart')}> Click here</span></p>
            <div className='pl-16'>
                <div className='flex justify-between items-center my-3'>
                    <p >Subtotal</p>
                    <span className='font-semibold text-base'>${(products.total).toFixed(2)}</span>
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
                <button onClick={handleOrder} disabled={products.data.length === 0 || isPending} className={`bg-[#46A358] cursor-not-allowed transi logo text-white p-2 rounded w-full font-semibold ${products.data.length !== 0 || !isPending ? "opacity-100" : "opacity-50"} ${isPending ? "opacity-50" : "opacity-100"}`} >{isPending && <Spin indicator={<LoadingOutlined spin />} size="small" />} {isPending ? "Processing..." : "Place Order"}</button>
            </div>
        </div>
    )

}