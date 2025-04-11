import { useQuery } from '@tanstack/react-query';
import { Image, Rate } from 'antd';
import { Heart } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { fetchFlower, fetchUserImg, LikeFlower, UnlikeFlower } from '../../hooks/LikeFn';
import { AboutProductLoading } from '../../components/Loading';
import { toast } from 'sonner';

export default function AboutProduct() {
    const { route_path, id } = useParams();
    const [isDesOpen, setIsDesOpen] = useState(true);
    const [isRewOpen, setIsRewOpen] = useState(false);
    const [currentImg, setCurrentImg] = useState(null);
    const navigate = useNavigate();
    const [isLiked, setIsLiked] = useState(false);

    const { data, error, isLoading } = useQuery({
        queryKey: ['flower', route_path, id],
        queryFn: () => fetchFlower({ queryKey: ['flower', route_path, id] }),
    })
    const { data: userImg, error: userError, isLoading: userIsLoading } = useQuery({
        queryKey: ['user', data?.created_by],
        queryFn: () => fetchUserImg({ queryKey: ['user', data?.created_by] }),
        enabled: !!data?.created_by
    })

    useEffect(() => {
        if (data?.main_image || data?.detailed_images?.length) {
            setCurrentImg(data?.main_image || data?.detailed_images[0]);
        }
        window.scrollTo(0, 0)
    }, [data]);

    useEffect(() => {
        const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
        setIsLiked(wishlist.some(item => item.flower_id === data?._id));
    }, [data]);

    const handleLike = () => {
        const user = JSON.parse(localStorage.getItem("user"))?.user || null;
        if (!user) {
            toast.warning('Please Login or register first')
            return
        }
        if (isLiked) {
            UnlikeFlower(route_path, id, name, setIsLiked);
        } else {
            LikeFlower(route_path, id, name, setIsLiked);
        }
    };

    if (error) return <div>Error: {error.message}</div>
    return (
        <>
            <div className='flex items-center gap-2 font-semibold text-[#42A358]/30 mt-5 mb-10'>
                <Link to={-1} className="text-black/80 hover:text-[#42A358] hover:pr-2 transi ">Home</Link> / <Link to={`/shop`} className="text-black/80 hover:text-[#42A358] hover:pr-2 transi ">Shop</Link> / <p className="text-[#42A358]">{data?.title || 'product name'}</p>
            </div>
            {isLoading ? (<AboutProductLoading />) : (
                <div className="flex justify-between items-start gap-10">
                    <div className='flex items-center justify-between w-[50%] gap-3'>
                        <div>
                            {data?.detailed_images?.length > 0 && data.detailed_images.map((img, i) => {
                                return (
                                    <div key={i} onClick={() => setCurrentImg(img)} className=" w-[100px] h-[100px] mix-blend-multiply overflow-hidden border rounded group hover:border-[#42A358] transi my-2 bg-gray-50 ">
                                        <img src={img} alt="flower" className="w-full h-full object-cover mix-blend-multiply" />
                                    </div>
                                )
                            })}

                        </div>
                        <div className='w-[70%]'>
                            <Image src={data ? currentImg : ''} className='max-h-[400px] object-contain' alt="greenshop image" />
                        </div>
                    </div>
                    <div className='w-[50%]'>
                        <div className='flex justify-between items-center border-[#42A358]/40 pb-4 border-b-2 '  >
                            <div className='flex items-center gap-3 '>
                                <div className='w-[60px] h-[60px] rounded-full overflow-hidden border-2 logo cursor-pointer border-[#42A358]' onClick={() => navigate(`/aboutUser/${userImg?._id}`)}><img className='w-full h-full object-cover' src={userImg?.profile_photo || "/default-user.png"} alt="user image" /></div>
                                <div className='text-2xl font-semibold'>
                                    <h3>{data?.title}</h3>
                                    <p className='font-bold text-xl text-[#42A358]'>${data?.price}</p>
                                </div>
                            </div>
                            <div className='flex items-center gap-1 flex-col'>
                                <Rate allowHalf defaultValue={data?.rating || 0} />
                                <span>0 Customer Review</span>
                            </div>
                        </div>
                        <div>
                            <h4 className='text-xl font-semibold text-black/80 my-2'>Short Description : </h4>
                            <p className='font-light '>{data?.short_description}</p>

                        </div>
                        <div>
                            <h4 className='text-xl font-semibold text-black/80 my-3'>Size : </h4>
                            <div className='flex items-center gap-3'>
                                <button className='border rounded-full w-8 h-8 hover:border-[#42A358] transi hover:text-[#42A358] font-semibold flex justify-center items-center'>S</button>
                                <button className='border rounded-full w-8 h-8 hover:border-[#42A358] transi hover:text-[#42A358] font-semibold flex justify-center items-center'>M</button>
                                <button className='border rounded-full w-8 h-8 hover:border-[#42A358] transi hover:text-[#42A358] font-semibold flex justify-center items-center'>X</button>
                                <button className='border rounded-full w-8 h-8 hover:border-[#42A358] transi hover:text-[#42A358] font-semibold flex justify-center items-center'>XL</button>
                            </div>
                            <div className='flex items-center gap-3 my-3'>
                                <button className='bg-[#45A538] font-light w-8 text-lg h-8 flex justify-center items-center text-white rounded-full'>-</button>
                                <p className='text-2xl font-semibold'>0</p>
                                <button className='bg-[#45A538] font-light w-8 text-lg h-8 flex justify-center items-center text-white rounded-full'>+</button>
                            </div>
                            <div className='flex items-center gap-3'>
                                <button className='bg-[#42A538] text-white py-2 border-[#42A358] border px-5 text-lg font-semibold rounded hover:bg-[#42A358]/20 hover:text-black/80 uppercase transi'>Buy Now</button>
                                <button className='bg-white text-black/80 border border-[#42A358] py-2 text-lg px-2 font-semibold rounded hover:bg-[#42A358]/20  uppercase transi'>Add to Cart</button>
                                <button className='p-2 texl-lg border border-[#42A358] rounded font-thin' onClick={() => handleLike()}><Heart fill={isLiked ? "red" : "none"} className={`${isLiked && 'text-red-500'}`} /></button>
                            </div>
                            <div>
                                <h4 className='text-gray-500 my-3'>SKU : <span className='text-black/80 font-semibold '>{data?._id}</span></h4>
                                <h4 className='text-gray-500 my-3'>Categories : <span className='text-black/80 font-semibold uppercase'>{data?.category}</span></h4>
                                <h4 className='text-gray-500 my-3'>Tags : <span className='text-black/80 font-semibold '>{data?.tags && data?.tags.length > 1 ? data?.tags : 'No tags'}</span></h4>
                            </div>
                        </div>

                    </div>
                </div>
            )}

            <div className='flex items-center gap-5 w-full border-b-2 border-[#42A358]/40 mb-5 py-5 mt-10 text-lg'>
                <h3 onClick={() => { setIsDesOpen(true); setIsRewOpen(false) }} className={`${isDesOpen && 'text-[#42A358]'} logo cursor-pointer transi`}>Product Description</h3>
                <h3 onClick={() => { setIsDesOpen(false); setIsRewOpen(true) }} className={`${isRewOpen && 'text-[#42A358]'} logo cursor-pointer transi`}>Reviews (0)</h3>
            </div>
            {isDesOpen && <div className='product-description' dangerouslySetInnerHTML={{ __html: data?.description }} />}
            {isRewOpen && <div>Reviews not available</div>}
        </>
    )
}