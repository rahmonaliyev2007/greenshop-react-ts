import React from 'react'
import { UserType } from '../../../types/HomeTypes'
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import ProductCard from '../../components/ProductCard';
const api = import.meta.env.VITE_PUBLIC_GREENSHOP_API;

function UserProducts({ user }: any) {
  const { data:userProducts, error, isLoading } = useQuery({
    queryKey: ['user-products'],
    queryFn: async () => {
      const response = await axios.get(`${api}user/products?access_token=${user?._id}`);
      return response.data.data;
    },
  })

  return (
    <div className='grid grid-cols-2 gap-10 sm:grid-cols-3 lg:grid-cols-4 '>
      {userProducts?.map((data:any, index:number) => (
        <ProductCard key={index} data={data} />
      ))}
    </div>
  )
}

export default UserProducts