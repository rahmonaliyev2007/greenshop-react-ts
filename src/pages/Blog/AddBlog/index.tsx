import axios from 'axios';
import React, { useState } from 'react';
import { Input } from 'antd';
import { getter } from '../../../hooks/useLocalStorage';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const api = import.meta.env.VITE_PUBLIC_GREENSHOP_API;

export default function AddBlog() {
    const [blog, setBlog] = useState({
        title: '',
        short_description: '',
        content: '',
    });
    const navigate = useNavigate();
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setBlog(prev => ({ ...prev, [name]: value }));
    };

    const handleAddBlog = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const access_token = getter({ key: "user" })?.user?._id
            await axios.post(`${api}user/blog?access_token=${access_token}`, blog);
            toast.success('Blog added successfully');
            navigate('/blog')
        } catch (error) {
            toast.error('Please fill all fields');
        }
    };

    return (
        <div className=" mt-10 p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-6 text-center text-green-600">Add New Article</h2>
            <form onSubmit={handleAddBlog} className="space-y-5">
                <label className="block">
                    <span className="block mb-1 text-gray-700">Article Title</span>
                    <Input name="title" value={blog.title} onChange={handleChange} placeholder="Enter title for article" maxLength={70} showCount className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 ${blog.title.length > 100 ? 'border-red-500' : ''}`} />
                </label>
                <label className="block">
                    <span className="block mb-1 text-gray-700">Article Short Description</span>
                    <Input.TextArea name="short_description" value={blog.short_description} onChange={handleChange} placeholder="Enter short description for article" maxLength={200} rows={3} showCount className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 ${blog.short_description.length > 200 ? 'border-red-500' : ''}`} />
                </label>
                <label className="block">
                    <span className="block mb-1 text-gray-700">Article Description</span>
                    <Input.TextArea name="content" value={blog.content} onChange={handleChange} placeholder="Enter description for article" showCount maxLength={5000} rows={10} className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400" />
                </label>
                <button type="submit" className="w-full py-2 px-4 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-200">Submit Article</button>
            </form>
        </div>
    );
}
