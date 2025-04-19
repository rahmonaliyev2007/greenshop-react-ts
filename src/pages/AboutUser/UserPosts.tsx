import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { getter } from '../../hooks/useLocalStorage';
import { Eye, Heart, MessageCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
const api = import.meta.env.VITE_PUBLIC_GREENSHOP_API;


function UserPosts({ user }: any) {
  const navigate = useNavigate();
  const { data, error, isLoading } = useQuery({
    queryKey: ['user-blogs'],
    queryFn: async () => {
      const access_token = getter({ key: "user" })?.user?._id || user?._id;
      const response = await axios.get(`${api}user/blog/created-by/${user?._id}?access_token=${access_token}`);
      return response.data;
    },
  })

  return (
    <div>
      <div className="mt-10">
        {isLoading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-500">Error loading blogs. Please try again.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {data?.data?.length > 0 ? (
              data?.data?.map((blog: any) => (
                <div key={blog._id} className="border rounded-lg pt-5 flex flex-col justify-between shadow-sm hover:shadow-md transition-all duration-300">
                  <div className="px-5">
                    <h3 className="text-xl font-semibold mb-2 hover:underline" onClick={() => navigate(`/blog/${blog._id}`)}> {blog.title || "No Title"} </h3>
                    <p className="text-sm text-gray-600">{blog.short_description?.slice(0, 200) || "No content"}...</p>
                  </div>
                  <div className="flex justify-between items-center mt-4 text-gray-400 text-sm px-5 border-t">
                    <div className="flex items-center gap-1 border-r pl-5 py-3 pr-10">
                      <Eye size={16} /> {blog.views || 0}
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageCircle size={16} /> {blog.commentCount || 0}
                    </div>
                    <div className="flex items-center gap-1 border-l pr-5 pl-10 py-3">
                      <Heart size={16} /> {blog.likesCount || 0}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center col-span-3">No blogs found</p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default UserPosts