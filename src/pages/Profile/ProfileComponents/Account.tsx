import axios from 'axios';
import React, { FormEvent, useEffect, useState } from 'react'
import { toast } from 'sonner';
import { getter } from '../../../hooks/useLocalStorage';
const api = import.meta.env.VITE_PUBLIC_GREENSHOP_API

export default function Account() {
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [surname, setSurname] = useState<string>('');
    const [phone_number, setPhone] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const [profile_photo_url, setProfilePhotoUrl] = useState<string>('');
    const [photoFile, setPhotoFile] = useState<File | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [_id, setID] = useState<string>('')
    const { user } = JSON.parse(localStorage.getItem("user") || '{}');
    const token = user?.token;
    const default_photo: string = 'https://www.shutterstock.com/image-vector/default-avatar-profile-icon-vector-600nw-1745180411.jpg'

    useEffect(() => {
        setName(user?.name || '');
        setEmail(user?.email || '');
        setSurname(user?.surname || '');
        setPhone(user?.phone_number || JSON.parse(localStorage.getItem('phone_number') || '""'));
        setUsername(user?.username || '');
        setID(user?._id || '')
        setProfilePhotoUrl(user?.profile_photo || default_photo)
    }, [])

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || getter({ key: "user" })?.user?.profile_image;
        if (file) {
            setPhotoFile(file);
        }
    };

    const handleUpdateUser = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        let updatedPhotoUrl = default_photo;

        if (photoFile) {
            const formData = new FormData();
            formData.append('file', photoFile);
            formData.append('upload_preset', 'GreenShop_unsigned');
            try {
                const res = await axios.post('https://api.cloudinary.com/v1_1/dky72qc4k/image/upload', formData);
                updatedPhotoUrl = res.data.secure_url;
                setProfilePhotoUrl(updatedPhotoUrl);
                toast.success('Image uploaded successfully!');
            } catch (err) {
                toast.error('Failed to upload image');
                setLoading(false);
                return;
            }
        } else if (user?.profile_photo) {
            updatedPhotoUrl = user.profile_photo;
        }

        try {
            await axios.post(`${api}user/account-details?access_token=${_id}`, { name, surname, email, _id, phone_number, username, profile_photo: updatedPhotoUrl }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            const updatedUser = { ...user, name, surname, email, phone_number, username, profile_photo: updatedPhotoUrl };
            localStorage.setItem('user', JSON.stringify({ user: updatedUser }));
            localStorage.setItem('phone_number', JSON.stringify(phone_number));
            toast.success('User updated successfully');
        } catch (error: any) {
            toast.error(` Error while updating user: ${error?.message || 'Unknown error'}`);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
            <form onSubmit={handleUpdateUser}>
                <div className='flex gap-3 justify-between items-center'>
                    <label className='w-full my-3' >
                        <div className='font-semibold text-sm'> <span className='text-red-500 '>*</span> Fist Name</div>
                        <input className='w-full my-2 py-2 px-3 rounded-lg border bg-white' type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                    </label>
                    <label className='w-full my-3' >
                        <div className='font-semibold text-sm'> <span className='text-red-500 '>*</span> Last Name</div>
                        <input className='w-full my-2 py-2 px-3 rounded-lg border bg-white' type="text" value={surname} onChange={(e) => setSurname(e.target.value)} required />
                    </label>
                </div>
                <div className='flex gap-3 justify-between items-center'>
                    <label className='w-full my-3' >
                        <div className='font-semibold text-sm'> <span className='text-red-500 '>*</span> Email Address</div>
                        <input className='w-full my-2 py-2 px-3 rounded-lg border bg-white' type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </label>
                    <label className='w-full my-3' >
                        <div className='font-semibold text-sm'> <span className='text-red-500 '>*</span> Phone</div>

                        <div className='w-full my-2 flex items-center group active:border-green-500 hover:border-green-500 transi focus:border-green-500 outline-none rounded-lg border bg-white'>
                            <div className='bg-[#FBFBFB] py-2 group-hover:border-r-green-500 transi rounded-l-lg px-3 border-r-2 font-semibold'> +998 </div>
                            <input className='w-full outline-none rounded-r-lg py-2 px-3 bg-white' placeholder='phone number' type="text" value={phone_number} onChange={(e) => setPhone(e.target.value)} required />
                        </div></label>
                </div>
                <div className='flex gap-3 justify-between items-center'>
                    <label className='w-full my-3' >
                        <div className='font-semibold text-sm'> <span className='text-red-500 '>*</span> Username</div>
                        <input className='w-full my-2 py-2 px-3 rounded-lg border bg-white' type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
                    </label>
                    <label className='w-full my-3' >
                        <div className='font-semibold text-sm'>Photo</div>
                        <input className='w-1/2 my-2 block py-2 px-3 rounded-lg border bg-white' type="file" onChange={handleImageUpload} />
                    </label>
                </div>
                <div className='flex items-start'>Your Current Photo : {user?.profile_photo !== "" && user?.profile_photo !== "https://alqadir.edu.pk/wp-content/uploads/2022/09/BS-Islamic-Studies-2022.jpg" ? (<img className='max-w-16 rounded-full' src={user?.profile_photo} alt="lalala" />) : ('It seems like you dont have profile photo please upload it above')} </div>
                <button type="submit" disabled={loading} className={`bg-[#46A358] mt-5 ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#46A358]/80'} text-white py-2 px-3 rounded font-semibold`}>
                    {loading ? 'Saving...' : 'Save Changes'}
                </button>
            </form>
        </div>
    )
}
