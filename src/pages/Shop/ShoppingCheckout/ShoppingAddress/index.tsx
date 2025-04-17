import React, { useEffect, useState } from 'react';

export default function Shopping_Address({ addressData, setAddressData, startCheck, setStartCheck, setIsFieldsFilled }: any) {
    const [errors, setErrors] = useState({ name: false, surname: false, country: false, town: false, street_address: false, state: false, zip: false, email: false, phone_number: false });

    useEffect(() => {
        if (startCheck) {
            const newErrors = {
                name: !addressData.name?.trim(),
                surname: !addressData.surname?.trim(),
                country: !addressData.country?.trim(),
                town: !addressData.town?.trim(),
                street_address: !addressData.street_address?.trim(),
                state: !addressData.state?.trim(),
                zip: !addressData.zip?.trim(),
                email: !addressData.email?.trim(),
                phone_number: !addressData.phone_number?.trim()
            };

            setErrors(newErrors);
            const isValid = Object.values(newErrors).every(err => !err);
            setIsFieldsFilled(isValid);
            setStartCheck(false);
        }
    }, [startCheck]);

    return (
        <div className='w-[65%]'>
            <form>
                <p className='font-semibold text-lg'>Billing Address</p>

                <div className='flex gap-3 justify-between items-center'>
                    <label className='w-full my-3 relative'>
                        <div className='font-light text-sm'><span className='text-red-500'>*</span> First Name</div>
                        <input className={`w-full my-2 py-2 px-3 outline-none focus:border-[#45A358] transition-all duration-500 rounded-lg border bg-white ${errors.name ? 'border-red-500' : 'border'}`} type="text" value={addressData.name} onChange={(e) => setAddressData({ ...addressData, name: e.target.value })} />
                        <span className={`absolute text-red-500 -z-10 text-xs left-0 transition-all duration-500 ${errors.name ? '-bottom-3 opacity-100' : 'bottom-2 opacity-0'}`}>Please enter your first name</span>
                    </label>

                    <label className='w-full my-3 relative'>
                        <div className='font-light text-sm'><span className='text-red-500'>*</span> Last Name</div>
                        <input className={`w-full my-2 py-2 px-3 outline-none focus:border-[#45A358] transition-all duration-500 rounded-lg border bg-white ${errors.surname ? 'border-red-500' : 'border'}`} type="text" value={addressData.surname} onChange={(e) => setAddressData({ ...addressData, surname: e.target.value })} />
                        <span className={`absolute text-red-500 -z-10 text-xs left-0 transition-all duration-500 ${errors.surname ? '-bottom-3 opacity-100' : 'bottom-2 opacity-0'}`}>Please enter your last name</span>
                    </label>
                </div>

                <div className='flex gap-3 justify-between items-center'>
                    <label className='w-full my-3 relative'>
                        <div className='font-light text-sm'><span className='text-red-500'>*</span> Country / Region</div>
                        <input className={`w-full my-2 py-2 px-3 outline-none focus:border-[#45A358] transition-all duration-500 rounded-lg border bg-white ${errors.country ? 'border-red-500' : 'border'}`} type="text" value={addressData.country} onChange={(e) => setAddressData({ ...addressData, country: e.target.value })} />
                        <span className={`absolute text-red-500 -z-10 text-xs left-0 transition-all duration-500 ${errors.country ? '-bottom-3 opacity-100' : 'bottom-2 opacity-0'}`}>Please enter your country</span>
                    </label>

                    <label className='w-full my-3 relative'>
                        <div className='font-light text-sm'><span className='text-red-500'>*</span> Town / City</div>
                        <input className={`w-full my-2 py-2 px-3 outline-none focus:border-[#45A358] transition-all duration-500 rounded-lg border bg-white ${errors.town ? 'border-red-500' : 'border'}`} type="text" value={addressData.town} onChange={(e) => setAddressData({ ...addressData, town: e.target.value })} />
                        <span className={`absolute text-red-500 -z-10 text-xs left-0 transition-all duration-500 ${errors.town ? '-bottom-3 opacity-100' : 'bottom-2 opacity-0'}`}>Please enter your town or city</span>
                    </label>
                </div>

                <div className='flex gap-3 justify-between items-center'>
                    <label className='w-full my-3 relative'>
                        <div className='font-light text-sm'><span className='text-red-500'>*</span> Street Address</div>
                        <input className={`w-full my-2 py-2 px-3 outline-none focus:border-[#45A358] transition-all duration-500 rounded-lg border bg-white ${errors.street_address ? 'border-red-500' : 'border'}`} type="text" value={addressData.street_address} onChange={(e) => setAddressData({ ...addressData, street_address: e.target.value })} />
                        <span className={`absolute text-red-500 -z-10 text-xs left-0 transition-all duration-500 ${errors.street_address ? '-bottom-3 opacity-100' : 'bottom-2 opacity-0'}`}>Please enter your street address</span>
                    </label>

                    <label className='w-full my-3'>
                        <div className='font-light text-sm'>Extra Address <sup>(optional)</sup></div>
                        <input className='w-full my-2 py-2 px-3 outline-none focus:border-[#45A358] transition-all duration-500 rounded-lg border bg-white' type="text" value={addressData.extra_address} onChange={(e) => setAddressData({ ...addressData, extra_address: e.target.value })} />
                    </label>
                </div>

                <div className='flex gap-3 justify-between items-center'>
                    <label className='w-full my-3 relative'>
                        <div className='font-light text-sm'><span className='text-red-500'>*</span> State</div>
                        <input className={`w-full my-2 py-2 px-3 outline-none focus:border-[#45A358] transition-all duration-500 rounded-lg border bg-white ${errors.state ? 'border-red-500' : 'border'}`} type="text" value={addressData.state} onChange={(e) => setAddressData({ ...addressData, state: e.target.value })} />
                        <span className={`absolute text-red-500 -z-10 text-xs left-0 transition-all duration-500 ${errors.state ? '-bottom-3 opacity-100' : 'bottom-2 opacity-0'}`}>Please enter your state</span>
                    </label>

                    <label className='w-full my-3 relative'>
                        <div className='font-light text-sm'><span className='text-red-500'>*</span> Zip</div>
                        <input className={`w-full my-2 py-2 px-3 outline-none focus:border-[#45A358] transition-all duration-500 rounded-lg border bg-white ${errors.zip ? 'border-red-500' : 'border'}`} type="text" value={addressData.zip} onChange={(e) => setAddressData({ ...addressData, zip: e.target.value })} />
                        <span className={`absolute text-red-500 -z-10 text-xs left-0 transition-all duration-500 ${errors.zip ? '-bottom-3 opacity-100' : 'bottom-2 opacity-0'}`}>Please enter your ZIP code</span>
                    </label>
                </div>

                <div className='flex gap-3 justify-between items-center'>
                    <label className='w-full my-3 relative'>
                        <div className='font-light text-sm'><span className='text-red-500'>*</span> Email Address</div>
                        <input className={`w-full my-2 py-2 px-3 outline-none focus:border-[#45A358] transition-all duration-500 rounded-lg border bg-white ${errors.email ? 'border-red-500' : 'border'}`} type="email" value={addressData.email} onChange={(e) => setAddressData({ ...addressData, email: e.target.value })} />
                        <span className={`absolute text-red-500 -z-10 text-xs left-0 transition-all duration-500 ${errors.email ? '-bottom-3 opacity-100' : 'bottom-2 opacity-0'}`}>Please enter your email</span>
                    </label>

                    <label className='w-full my-3 relative'>
                        <div className='font-light text-sm'><span className='text-red-500'>*</span> Phone</div>
                        <div className={`w-full my-2 flex items-center rounded-lg overflow-hidden border bg-white ${errors.phone_number ? 'border-red-500' : 'border'}`}>
                            <div className={`bg-[#FBFBFB] py-2 px-3 border-r-2 font-medium ransition-all duration-500 ${errors.phone_number ? 'border-red-500' : 'border'}`}>+998</div>
                            <input className='w-full outline-none rounded-r-lg py-2 px-3 bg-white' type="text" value={addressData.phone_number} onChange={(e) => setAddressData({ ...addressData, phone_number: e.target.value })} />
                        </div>
                        <span className={`absolute text-red-500 -z-10 text-xs left-0 transition-all duration-500 ${errors.phone_number ? '-bottom-3 opacity-100' : 'bottom-2 opacity-0'}`}>Please enter your phone number</span>
                    </label>
                </div>

                <label className='w-full my-3'>
                    <div className='font-light text-sm'>Order notes <sup>(optional)</sup></div>
                    <textarea className='w-full my-2 py-2 px-3 outline-none focus:border-[#45A358] transition-all duration-500 rounded-lg border bg-white' rows={5} value={addressData.textarea} onChange={(e) => setAddressData({ ...addressData, textarea: e.target.value })} />
                </label>
            </form>
        </div>
    );
}