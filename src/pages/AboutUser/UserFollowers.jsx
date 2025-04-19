import { useQuery } from '@tanstack/react-query';
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { getter } from '../../hooks/useLocalStorage';
import axios from 'axios';
import { CommentOutlined } from '@ant-design/icons';
import { Eye } from 'lucide-react';
import { toast } from 'sonner';
const api = import.meta.env.VITE_PUBLIC_GREENSHOP_API;

function UserFollowers({ user }) {
  const navigate = useNavigate();
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ['user-followers', user?._id],
    queryFn: async () => {
      const allFollowerIds = user?.followers || [];
      const uniqueFollowerIds = [...new Set(allFollowerIds)];
      const access_token = getter({ key: "user" })?.user?._id || user?._id;
      const followerDataMap = {};

      await Promise.all(uniqueFollowerIds.map(async (id) => {
        const response = await axios.get(`${api}user/by_id/${id}?access_token=${access_token}`);
        followerDataMap[id] = response.data;
      }));
      const fullFollowerList = allFollowerIds.map((id) => followerDataMap[id]);
      return fullFollowerList;
    },
  })
  useEffect(() => {
    if (user?._id) {
      refetch();
    }
  }, [user?._id, refetch]);

  return (
    <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5'>
      {data?.map(({ data: followedUser }, i) => {
        return (
          <div key={i} className='border rounded hover:shadow-md transi flex flex-col justify-between'>
            <div className='flex items-center gap-3 py-2 px-3'>
              <img src={followedUser.profile_photo} alt="greenshop user profile photo" className='w-12 rounded-full' onError={(e) => { e.target.onerror = null; e.target.src = "https://img.freepik.com/premium-vector/vector-flat-illustration-grayscale-avatar-user-profile-person-icon-gender-neutral-silhouette-profile-picture-suitable-social-media-profiles-icons-screensavers-as-templatex9xa_719432-2210.jpg?semt=ais_hybrid&w=740"; }} />
              <p className='font-semibold text-lg'>{followedUser?.name} {followedUser?.surname}</p>
            </div>
            <div className='flex justify-center items-center border-t'>
              <p onClick={()=> toast.info('Chats are not available yet')} className='flex font-medium items-center gap-2 text-base text-gray-500 px-10 hover:text-[#45a358] transi cursor-pointer'><CommentOutlined size={16}/> Chat </p>
              <p className='h-9 w-[1px] bg-gray-300'></p>
              <p onClick={()=> navigate(`/aboutUser/${followedUser?._id}`)} className='flex font-medium items-center gap-2 text-base text-gray-500 px-6 hover:text-[#45a358] transi cursor-pointer'><Eye size={16}/> See Profile</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default UserFollowers