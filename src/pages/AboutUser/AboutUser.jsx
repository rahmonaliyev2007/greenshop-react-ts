import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { fetchUser } from '../../hooks/LikeFn';
import { useQuery } from '@tanstack/react-query';
import { Image, Tabs } from 'antd';
import User from './User';
import UserProducts from './UserProducts';
import UserLikes from './UserLikes';
import UserFollowers from './UserFollowers';
import UserPosts from './UserPosts';
import { CommentOutlined, SendOutlined } from '@ant-design/icons';

export default function AboutUser() {
  const { userID } = useParams();
  const { data: user, error, isLoading } = useQuery({
    queryKey: ['user', userID],
    queryFn: () => fetchUser({ queryKey: ['user', userID] })
  });
  
  const items = [
    {
      key: '1',
      label: 'Products',
      children: <UserProducts user={user} />,
    },
    {
      key: '2',
      label: 'Posts',
      children: <UserPosts user={user} />,
    },
    {
      key: '3',
      label: 'Followers',
      children: <UserFollowers user={user} />,
    },
  ];
  useEffect(()=>{
    window.scrollTo(0, 0);
  }, [userID])
  return (
    <>
      <div className='rounded-xl mt-5 overflow-hidden'>
        <img src='https://i0.wp.com/linkedinheaders.com/wp-content/uploads/2018/02/mountain-lake-header.jpg?fit=1584%2C396&ssl=1' />
      </div>
      <div className='flex items-end justify-between'>
        <div className='-mt-12 flex items-end gap-2'>
          <div className='w-40 border-[5px] border-white relative z-10 rounded-full overflow-hidden flex justify-center items-center'>
            <Image src={user?.profile_photo} onError={(e) => { e.target.onerror = null; e.target.src = "https://img.freepik.com/premium-vector/vector-flat-illustration-grayscale-avatar-user-profile-person-icon-gender-neutral-silhouette-profile-picture-suitable-social-media-profiles-icons-screensavers-as-templatex9xa_719432-2210.jpg?semt=ais_hybrid&w=740"; }}  alt="greenshop user photo" className='border-[4px] border-[#45A358] rounded-full' />
          </div>
          <div>
          <h3 className='text-3xl font-semibold'>{user?.name} {user?.surname} </h3>
          <h4 className='text-lg text-gray-500 font-mono font-light'>{user?.followers.length} <span className='text-xs'>followers</span></h4>
          </div>
        </div>
        <div className='flex items-center gap-3'>
          <button className='py-2 px-5 bg-[#45A358] text-white rounded text-base font-semibold cursor-pointer hover:bg-[#398648] transi'> <CommentOutlined /> Start Chat</button>
          <button className='py-2 px-5 bg-[#45A358] text-white rounded text-base font-semibold cursor-pointer hover:bg-[#398648] transi'> <SendOutlined /> Send Invitation</button>
          <button className='py-2 px-5 bg-[#45A358] text-white rounded text-base font-semibold cursor-pointer hover:bg-[#398648] transi'> Follow</button>
        </div>
      </div>
      <div>
      <Tabs defaultActiveKey="1" items={items} />
      </div>
    </>
  )
}
