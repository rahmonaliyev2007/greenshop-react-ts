import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import ProductCard from '../../../components/ProductCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Navigate } from 'react-router-dom';
import {MainMappingLoading} from '../../../components/Loading';

const api = import.meta.env.VITE_PUBLIC_GREENSHOP_API;

function Wishlist() {

    const [accessToken, setAccessToken] = useState('');
    useEffect(() => {
        setAccessToken(JSON.parse(localStorage.getItem("user"))?.user?._id || '64bebc1e2c6d3f056a8c85b7');
    }, []);

    if (accessToken === '64bebc1e2c6d3f056a8c85b7') {
        return <Navigate to="/login" replace={true} />
    }
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    const user = JSON.parse(localStorage.getItem('user'));
    const token = user?.token;
    const topRef = useRef(null);

    const fetchWishlist = async () => {
        const response = await axios.get(`${api}user/wishlist?access_token=${accessToken}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        return response.data.data || [];
    };

    const { data: wishItems = [], isLoading, isError } = useQuery({
        queryKey: ['wishlist', accessToken],
        queryFn: fetchWishlist,
        enabled: !!token && !!accessToken,
        onSuccess: (data) => {
            localStorage.setItem("wishlist", JSON.stringify(data));
        }
    });

    useEffect(() => {
        setCurrentPage(1);
    }, [token]);

    if (isError) return <div>Something went wrong, please reload the page</div>;

    const totalPages = Math.ceil(wishItems.length / itemsPerPage);
    const visibleItems = wishItems.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
        if (topRef.current) {
            topRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

   
    return (
        <div ref={topRef}>
            {isLoading &&
                <MainMappingLoading length={6} />}

            <div className='grid grid-cols-2 sm:grid-cols-3 justify-items-center gap-5'>
                {visibleItems.map((product, index) => (
                    <ProductCard key={index} data={product} />
                ))}
            </div>
            {wishItems.length >= 6 && <div className="flex justify-center sm:justify-end items-center gap-2 mt-5">
                <button className="p-2 bg-gray-200 rounded disabled:opacity-40"
                    disabled={currentPage === 1}
                    onClick={() => handlePageChange(currentPage - 1)}
                >
                    <ChevronLeft />
                </button>
                {Array.from({ length: totalPages }, (_, i) => (
                    <button key={i} onClick={() => handlePageChange(i + 1)}
                        className={`px-4 py-2 rounded ${currentPage === i + 1 ? "bg-[#46A358] text-white" : "bg-gray-200"}`}>
                        {i + 1}
                    </button>
                ))}
                <button className="p-2 bg-gray-200 rounded disabled:opacity-50"
                    disabled={currentPage === totalPages}
                    onClick={() => handlePageChange(currentPage + 1)}
                >
                    <ChevronRight />

                </button>
            </div>}
        </div>
    );
}

export default Wishlist;