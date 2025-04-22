import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Tooltip } from "antd";
import axios from "axios";
import { CirclePlus, Search, Eye, MessageCircle, Heart } from "lucide-react";
import { toast } from "sonner";
import { getter } from "../../hooks/useLocalStorage";
import { useNavigate, useSearchParams } from "react-router-dom";

const api = import.meta.env.VITE_PUBLIC_GREENSHOP_API;

const GetBlogs = async (search: string) => {
    const access_token = getter({ key: "user" })?.user?._id || "67dbc36eaf06d13e0cde0c21";
    const res = await axios.get(`${api}user/blog?access_token=${access_token}&search=${search}`);
    return res.data;
};

export default function Blog() {
    const [searchParams, setSearchParams] = useSearchParams();
    const search = searchParams.get("search") || "";
    const [searchValue, setSearchValue] = useState(search);
    const navigate = useNavigate();

    const { data, error, isLoading } = useQuery({
        queryKey: ["getBlogs", search],
        queryFn: () => GetBlogs(search),
    });
    useEffect(() => {
        const delay = setTimeout(() => {
            setSearchParams({ search: searchValue.trim() });
        }, 500);
        return () => clearTimeout(delay);
    }, [searchValue]);

    const handleGoToAddBlog = () => {
        const access_token = getter({ key: "user" })?.user?._id || "";
        if (access_token) navigate("/blog/addblog");
        else toast.error("Please login to add blog");
    };

    return (
        <>
            <h2 className="text-4xl font-bold text-center my-10">My Feed</h2>

            <div className="max-w-[700px] w-full flex m-auto items-center border rounded overflow-hidden">
                <input type="text" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} className="w-full outline-none py-2 px-4" placeholder="Search blogs..." />
                <button className="px-4 py-2 border-l text-gray-400"><Search /></button>
            </div>

            <Tooltip title="Add New Article" placement="top">
                <button className="text-gray-400 outline-none group mt-5" onClick={handleGoToAddBlog}>
                    <CirclePlus size={35} className="group-hover:rotate-180 rotate-0 transition-all duration-500" />
                </button>
            </Tooltip>

            <div className="mt-10 max-w-[1200px] mx-auto">
                {isLoading ? (
                    <p className="text-center text-gray-500">Loading...</p>
                ) : error ? (
                    <p className="text-center text-red-500">Error loading blogs. Please try again.</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {data?.data?.length > 0 ? (
                            data.data.map((blog: any) => (
                                <div key={blog?._id} className="border rounded-lg pt-5 flex flex-col justify-between shadow-sm hover:shadow-md transition-all duration-300">
                                    <div className="px-5">
                                        <h3 className="text-xl font-semibold mb-2 hover:underline cursor-pointer" onClick={() => navigate(`/blog/${blog?._id}`)}>{blog?.title || "No Title"}</h3>
                                        <p className="text-sm text-gray-600">{blog?.short_description?.slice(0, 200) || "No content"}...</p>
                                    </div>
                                    <div className="flex justify-between items-center mt-4 text-gray-400 text-sm px-5 border-t">
                                        <div className="flex items-center gap-1 border-r pl-5 py-3 pr-10"><Eye size={16} /> {blog.views || 0}</div>
                                        <div className="flex items-center gap-1"><MessageCircle size={16} /> {blog.commentCount || 0}</div>
                                        <div className="flex items-center gap-1 border-l pr-5 pl-10 py-3"><Heart size={16} /> {blog.likesCount || 0}</div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-center col-span-3">No blogs found</p>
                        )}
                    </div>
                )}
            </div>
        </>
    );
}