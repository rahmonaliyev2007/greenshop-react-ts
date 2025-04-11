import React from 'react'
import { useParams } from 'react-router-dom';
import { fetchUser } from '../../hooks/LikeFn';
import { useQuery } from '@tanstack/react-query';
import { Tabs } from 'antd';
import User from './User';
import UserProducts from './UserProducts';
import UserLikes from './UserLikes';
import UserFollowers from './UserFollowers';
import UserPosts from './UserPosts';

export default function AboutUser() {
  const { userID } = useParams();
  const { data: user, error, isLoading } = useQuery({
    queryKey: ['user', userID],
    queryFn: () => fetchUser({ queryKey: ['user', userID] })
  })
  console.log(user);
  const items = [
    {
      key: '1',
      label: 'About',
      children: <User/>,
    },
    {
      key: '2',
      label: 'Products',
      children: <UserProducts/>,
    },
    {
      key: '3',
      label: 'Posts',
      children: <UserPosts/>,
    },
    {
      key: '4',
      label: 'Likes',
      children: <UserLikes/>,
    },
    {
      key: '5',
      label: 'Followers',
      children: <UserFollowers/>,
    },
  ];
  return (
    <>
      <div>
        <img src='https://i0.wp.com/linkedinheaders.com/wp-content/uploads/2018/02/mountain-lake-header.jpg?fit=1584%2C396&ssl=1' />
      </div>
      <div>
        <div>
          <div>
            <img src={user?.profile_photo} alt="greenshop user photo" />
          </div>
          <h3>{user?.name}</h3>
          <h4>{user?.followers.length} followers</h4>
        </div>
        <div>
          <button>Start Chat</button>
          <button>Send Invitition  </button>
          <button>Follow</button>
        </div>
      </div>
      <div>
      <Tabs defaultActiveKey="1" items={items} />
      </div>
    </>
  )
}
