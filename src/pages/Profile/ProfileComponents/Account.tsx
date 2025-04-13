import axios from 'axios';
import React, { FormEvent, useEffect, useState } from 'react'
import { toast } from 'sonner';
const api = import.meta.env.VITE_PUBLIC_GREENSHOP_API


export default function Account() {
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [surname, setSurname] = useState<string>('');
    const [phone_number, setPhone] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const [_id, setID] = useState<string>('')
    const {user} = JSON.parse(localStorage.getItem("user") || '{}');
    const token = user?.token;
    const profile_photo : string = 'https://www.shutterstock.com/image-vector/default-avatar-profile-icon-vector-600nw-1745180411.jpg'

    useEffect(() => {
        setName(user?.name || '');
        setEmail(user?.email || '');
        setSurname(user?.surname || '');
        setPhone(user?.phone_number || JSON.parse(localStorage.getItem('phone_number') || '""'));
        setUsername(user?.username || '');
        setID(user?._id || '')
    }, [])

    const handleUpdateUser = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try{
            await axios.post(`${api}user/account-details?access_token=${_id}`, {name, surname, email, _id, phone_number , username, profile_photo}, {
                headers: { 
                    'Authorization': `Bearer ${token}` 
                }
            })
            
            localStorage.setItem('phone_number', JSON.stringify(phone_number))
            toast.success('User updated successfully')
        }
        catch(error: any){
            toast.error(` Error while updating user: ${error?.message || 'Unknown error'}`)
        } 
    }

    return (
        <div>
            <form onSubmit={handleUpdateUser}>
                <div className='flex gap-3 justify-between items-center'>
                    <label className='w-full my-3' >
                        <div className='font-semibold text-sm'> <span className='text-red-500 '>*</span> Fist Name</div>
                        <input className='w-full my-2 py-2 px-3 rounded-lg border bg-white' type="text" value={name}  onChange={(e) => setName(e.target.value)}  required/>
                    </label>
                    <label className='w-full my-3' >
                        <div className='font-semibold text-sm'> <span className='text-red-500 '>*</span> Last Name</div>
                        <input className='w-full my-2 py-2 px-3 rounded-lg border bg-white' type="text" value={surname}  onChange={(e) => setSurname(e.target.value)} required />
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
                            <div className='bg-[#FBFBFB] py-2 group-hover:border-r-green-500 transi rounded-l-lg px-3 border-r-2 font-semibold'>
                                +998
                            </div>
                            <input className='w-full outline-none rounded-r-lg py-2 px-3 bg-white' placeholder='phone number' type="text" value={phone_number} onChange={(e) => setPhone(e.target.value)} required />
                        </div></label>
                </div>
                <div className='flex gap-3 justify-between items-center'>
                    <label className='w-full my-3' >
                        <div className='font-semibold text-sm'> <span className='text-red-500 '>*</span> Username</div>
                        <input className='w-full my-2 py-2 px-3 rounded-lg border bg-white' type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
                    </label>
                    <label className='w-full my-3' >
                        <div className='font-semibold text-sm'> <span className='text-red-500 '></span> Photo</div>
                        <input className='w-1/2  my-2block py-2 px-3 rounded-lg border bg-white' type="file" />
                    </label>
                </div>
                <button className='bg-[#46A358] hover:bg-[#46A358]/80 text-white py-2 px-3 cursor-pointer rounded font-semibold'>Save Changes</button>
            </form>
        </div>
    )
}
