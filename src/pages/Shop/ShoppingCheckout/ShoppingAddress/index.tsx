import React, { FormEvent, useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import { User } from '../../../../../types/HomeTypes';

export default function Shopping_Address({addressData, setAddressData}: any) {

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <div className='w-[65%]'>
            <form>
                <p className='font-semibold text-lg'>Billing Address</p>
                <div className='flex gap-3 justify-between items-center'>
                    <label className='w-full my-3' >
                        <div className='font-light text-sm'> <span className='text-red-500 '>*</span> First Name</div>
                        <input className='w-full my-2 py-2 px-3 rounded-lg border bg-white' type="text" value={addressData.name} onChange={(e) => setAddressData({ ...addressData, name: e.target.value })} required />
                    </label>
                    <label className='w-full my-3' >
                        <div className='font-light text-sm'> <span className='text-red-500 '>*</span> Last Name</div>
                        <input className='w-full my-2 py-2 px-3 rounded-lg border bg-white' type="text" value={addressData.surname} onChange={(e) => setAddressData({ ...addressData, surname: e.target.value })} required />
                    </label>
                </div>

                <div className='flex gap-3 justify-between items-center'>
                    <label className='w-full my-3' >
                        <div className='font-light text-sm'> <span className='text-red-500 '>*</span> Country / Region</div>
                        <input className='w-full my-2 py-2 px-3 rounded-lg border bg-white' type="text" placeholder='enter your country / region' value={addressData.country} onChange={(e) => setAddressData({ ...addressData, country: e.target.value })} required />
                    </label>
                    <label className='w-full my-3' >
                        <div className='font-light text-sm'> <span className='text-red-500 '>*</span> Town / City</div>
                        <input className='w-full my-2 py-2 px-3 rounded-lg border bg-white' type="text" placeholder='enter your town / city' value={addressData.town} onChange={(e) => setAddressData({ ...addressData, town: e.target.value })} required />
                    </label>
                </div>

                <div className='flex gap-3 justify-between items-center'>
                    <label className='w-full my-3' >
                        <div className='font-light text-sm'> <span className='text-red-500 '>*</span> Street Address</div>
                        <input className='w-full my-2 py-2 px-3 rounded-lg border bg-white' type="text" placeholder='enter your street name and house number' value={addressData.street_address} onChange={(e) => setAddressData({ ...addressData, street_address: e.target.value })} required />
                    </label>
                    <label className='w-full my-3' >
                        <div className='font-light text-sm'> <span className='text-red-500 '></span> Extra Address <sup>( optional )</sup></div>
                        <input className='w-full my-2 py-2 px-3 rounded-lg border bg-white' type="text" placeholder='enter your Apartment or suitable places (optional)' value={addressData.extra_address} onChange={(e) => setAddressData({ ...addressData, extra_address: e.target.value })} />
                    </label>
                </div>

                <div className='flex gap-3 justify-between items-center'>
                    <label className='w-full my-3' >
                        <div className='font-light text-sm'> <span className='text-red-500 '>*</span> State</div>
                        <input className='w-full my-2 py-2 px-3 rounded-lg border bg-white' type="text" placeholder='enter your state' value={addressData.state} onChange={(e) => setAddressData({ ...addressData, state: e.target.value })} required />
                    </label>
                    <label className='w-full my-3' >
                        <div className='font-light text-sm'> <span className='text-red-500 '>*</span> Zip</div>
                        <input className='w-full my-2 py-2 px-3 rounded-lg border bg-white' type="text" placeholder='enter your town / city zipcode' value={addressData.zip} onChange={(e) => setAddressData({ ...addressData, zip: e.target.value })} required />
                    </label>
                </div>

                <div className='flex gap-3 justify-between items-center'>
                    <label className='w-full my-3' >
                        <div className='font-light text-sm'> <span className='text-red-500 '>*</span> Email Address</div>
                        <input className='w-full my-2 py-2 px-3 rounded-lg border bg-white' type="email" value={addressData.email} onChange={(e) => setAddressData({ ...addressData, email: e.target.value })} />
                    </label>
                    <label className='w-full my-3' >
                        <div className='font-light text-sm'> <span className='text-red-500 '>*</span> Phone</div>
                        <div className='w-full my-2 flex items-center group active:border-green-500 hover:border-green-500 transi focus:border-green-500 outline-none rounded-lg border bg-white'>
                            <div className='bg-[#FBFBFB] py-2 group-hover:border-r-green-500 transi rounded-l-lg px-3 border-r-2 font-medium'>
                                +998
                            </div>
                            <input className='w-full outline-none rounded-r-lg py-2 px-3 bg-white' placeholder='phone number' type="text" value={addressData.phone_number} onChange={(e) => setAddressData({ ...addressData, phone_number: e.target.value })} required />
                        </div>
                    </label>
                </div>

                <label className='w-full my-3' >
                    <div className='font-light text-sm'> Order notes <sup>( optional )</sup></div>
                    <textarea className='w-full my-2 py-2 px-3 rounded-lg border bg-white' placeholder='enter some notes' value={addressData.textarea} onChange={(e) => setAddressData({ ...addressData, textarea: e.target.value })} />
                </label>
            </form>
        </div>
    );
}