import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getter } from '../../../hooks/useLocalStorage';
import { useQuery } from '@tanstack/react-query';
import { fetchUserImg } from '../../../hooks/LikeFn';
import { Button, Spin, Tooltip, Modal } from 'antd';
import { toast } from 'sonner';
import { Eye, Heart, Share, Share2 } from 'lucide-react';
import { CommentOutlined } from '@ant-design/icons';

const api = import.meta.env.VITE_PUBLIC_GREENSHOP_API;

export default function AboutBlog() {
  const userId = getter({ key: 'user' })?.user?._id;
  const { id } = useParams();
  const [blog, setBlog] = useState<any>();
  const [isBlogLoading, setIsBlogLoading] = useState(false);
  const [isFollowed, setIsFollowed] = useState(false);
  const [access_token, setAccessToken] = useState();
  const [followCount, setFollowCount] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const navigate = useNavigate();
  const GetBlog = async () => {
    setIsBlogLoading(true);
    const access_token = getter({ key: 'user' })?.user?._id || "67dbc36eaf06d13e0cde0c21";
    await axios.put(`${api}user/blog/view?access_token=${access_token}`, { _id: id || "67dbc36eaf06d13e0cde0c21" })
    const res = await axios.get(`${api}user/blog/${id}?access_token=${access_token}`);
    setBlog(res?.data)
    setIsBlogLoading(false);
  };

  const { data: userImg, error: userError, isLoading: userIsLoading } = useQuery({
    queryKey: ['user', blog?.data?.created_by],
    queryFn: () => fetchUserImg({ queryKey: ['user', blog?.data?.created_by] }),
    enabled: !!blog?.data?.created_by
  });

  useEffect(() => {
    GetBlog();
  }, []);

  useEffect(() => {
    if (userImg?.followers && userId) {
      setIsFollowed(userImg.followers.includes(userId));
    }
    setAccessToken(getter({ key: 'user' })?.user?._id);
    setFollowCount(userImg?.followers?.length);
  }, [userImg, userId]);

  const handleFollowFc = async () => {
    const access_token = getter({ key: 'user' })?.user?._id;
    if (!access_token) {
      toast.error("Please login or register first");
      return;
    }
    if (blog?.data?.created_by === access_token) {
      navigate('/profile/account')
    } else {
      const res = await axios.post(`${api}user/${isFollowed ? "unfollow" : "follow"}?access_token=${userImg._id}`, { _id: access_token });
      if (res?.data) {
        setIsFollowed(!isFollowed);
        { isFollowed ? setFollowCount(followCount - 1) : setFollowCount(followCount + 1) }
        { isFollowed ? toast.info(`You unfollowed to ${userImg?.name || "useer"} 😒 `) : toast.info(`You followed to ${userImg?.name || "useer"} 😋`) }
      }
      else {
        toast.error("Failed to follow/unfollow this user");
      }
    }

  }

  const handleDeleteBlog = async () => {
    setIsDeleting(true);
    const access_token = getter({ key: 'user' })?.user?._id;
    await axios.delete(`${api}user/blog/?access_token=${access_token}`, { data: { _id: id } });
    toast.info('Blog deleted 😌')
    navigate('/blog')
    setIsDeleting(false)
  }

  if (isBlogLoading || userIsLoading) {
    return <div><Spin size='large' /> Loading...</div>
  }

  return (
    <div>
      <div className='sticky top-[80px] bg-white left-0'>
        <div className='flex items-center gap-2 py-2 '>
          <p className='font-extrabold text-gray-600 hover:text-[#46A358] transi cursor-pointer' onClick={() => navigate('/')} >Home </p>
          / <p className='font-medium text-gray-600 transi cursor-pointer hover:text-[#46A358]' onClick={() => navigate('/blog')} >Blogs </p>
          / <p className='font-light text-[#46A358]'>{userImg?.name ? `${userImg?.name}'s Blog` : 'Blog'}</p>

        </div>
      <hr className="bg-[#46a3597f] border-none w-full h-[2px]"></hr>
      </div>

      <div className='flex items-center justify-between gap-10 my-10'>
        <div className='flex items-center gap-5'>
          <div className='w-16 rounded-full overflow-hidden cursor-pointer' onClick={() => navigate(`/aboutuser/${userImg?._id}`)}>
            <Tooltip title={`${userImg?.name} ${userImg?.surname}`}>
              <img src={userImg?.profile_photo} onError={(e) => { e.target.onerror = null; e.target.src = "https://img.freepik.com/premium-vector/vector-flat-illustration-grayscale-avatar-user-profile-person-icon-gender-neutral-silhouette-profile-picture-suitable-social-media-profiles-icons-screensavers-as-templatex9xa_719432-2210.jpg?semt=ais_hybrid&w=740"}}  alt="user image" />
            </Tooltip>
          </div>
          <div>
            <h3 className='font-semibold text-xl'>{userImg?.name} {userImg?.surname}</h3>
            <p className='text-gray-500 font-light'>{followCount} followers</p>
          </div>
        </div>

        <button onClick={handleFollowFc} className='py-2 px-4 bg-[#46A358] text-white hover:bg-[#378045] rounded' >{blog?.data?.created_by === access_token ? "You" : isFollowed ? "Unfollow" : "Follow"}</button>

      </div>
      <h1 className="text-xl font-bold my-10">{blog?.data?.title}</h1>
      <div className='product-description' dangerouslySetInnerHTML={{ __html: blog?.data?.content }} />

      <div className='flex items-center justify-between mt-16'>
        <div className='flex items-center gap-3'>
          <Tooltip title="Views" className='flex items-center gap-2 text-gray-600 font-bold'> <Eye size={16} /> {blog?.data?.views}</Tooltip>
          <Tooltip title={'Likes'} className='flex items-center gap-2 text-gray-600 font-bold'> <Heart size={16} /> 0</Tooltip>
          <Tooltip title="Commnets" className='flex items-center gap-2 text-gray-600 font-bold'> <CommentOutlined size={16} /> 0</Tooltip>
          <Tooltip title="Share" className='flex items-center gap-2 text-gray-600 font-bold'> <Share2 size={16} /> 0</Tooltip>

        </div>
        {blog?.data?.created_by === userId && <Button loading={isDeleting} className='bg-red-500 !hover:bg-red-600' onClick={() => {
          Modal.confirm({
            title: 'Are you sure you want to delete this blog?',
            okText: 'Delete',
            okType: 'danger',
            cancelText: 'Cancel',
            onOk: handleDeleteBlog,
          });
        }} type='primary' >Delete</Button>}
      </div>
    </div>
  );
}
