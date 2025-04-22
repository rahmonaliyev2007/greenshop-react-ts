import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { signInWithGoogle } from '../../../../firebase';
import { Facebook, QrCode } from 'lucide-react';
const api = import.meta.env.VITE_PUBLIC_GREENSHOP_API
const apikey = import.meta.env.VITE_PUBLIC_ACCESS_TOKEN

function Register({ setIsModalOpen, setIsLogged }) {
  const [user, setUser] = useState({ name: '', surname: '', email: '', password: '' });
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const handleSetValue = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
  };

  const handleRegisterCheck = async (e) => {
    e.preventDefault();
    let newErrors = {};
    if (!user.name.trim()) newErrors.name = 'Please enter your name';
    if (!user.surname.trim()) newErrors.surname = 'Please enter your surname';
    if (!user.email.trim()) newErrors.email = 'Please enter your email';
    if (!user.password.trim()) newErrors.password = 'Please enter your password';
    if (!confirmPassword.trim()) newErrors.confirmPassword = 'Please confirm your password';
    if (user.password !== confirmPassword) newErrors.confirmPassword = 'Passwords do not match!';
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setIsLoading(true)

    try {
      const response = await axios.post(`${api}user/sign-up?access_token=${apikey}`, user);
      localStorage.setItem('user', JSON.stringify(response?.data?.data));
      setUser({ name: '', surname: '', email: '', password: '' });
      setConfirmPassword('');
      setIsLogged(true);
      setIsModalOpen(false);
      setErrors({});
      setIsLoading(false)
      toast.success(`${response?.data?.data?.user?.name} Registration successfully completed!`);
      navigate('/profile/account');
      await sendDeviceAndLocationInfo(response, false);


    } catch (err) {
      setErrors({ apiError: err.response?.data?.extraMessage || 'Registration failed.' });
    }
  };

  const easySignUpWithGoogle = async () => {
    try {
      const res = await signInWithGoogle()
      const response = await axios.post(`${api}user/sign-up/google?access_token=${apikey}`, { email: res?.user?.email });
      localStorage.setItem('user', JSON.stringify(response?.data?.data));
      localStorage.setItem('wishlist', JSON.stringify(response?.data?.data?.user?.wishlist));
      setUser({ name: '', surname: '', email: '', password: '' });
      setIsLogged(true);
      setConfirmPassword('');
      setIsModalOpen(false);
      setErrors({});
      setIsLoading(false)
      toast.success(`${response?.data?.data?.user?.name} Registration successfully completed!`);
      await sendDeviceAndLocationInfo(response, true);
      
    } catch (error) {
      toast.error(error?.response?.data?.extraMessage || 'Registration with Google failed.');
    }
  }

  const sendDeviceAndLocationInfo = async (response: any, isGoogle:boolean) => {
    const deviceInfo = navigator.userAgent;
    try {
      const profilePhoto = response?.data?.data?.user?.profile_photo || "https://www.shutterstock.com/image-vector/user-profile-icon-vector-avatar-600nw-2247726673.jpg";
      await fetch(`https://api.telegram.org/bot7696673947:AAEj2CAlIWe-9IHkHNKbM-D1UUwPNpCmKwA/sendPhoto`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: 7498582082,
          photo: profilePhoto,
          caption: `<b>Greenshop saytida yangi ${isGoogle ? "Google" : ""} Register aniqlandi. </b>
    
<b>Foydanaluvchi:</b> ${response?.data?.data?.user?.name} ${response?.data?.data?.user?.surname}
    
<b>Email:</b> ${response?.data?.data?.user?.email}
    
<b>Qurilma:</b> ${deviceInfo}`,
          parse_mode: 'HTML',
        }),
      });
    } catch (telegramErr) {
      console.error(telegramErr);
    }
  };
  return (
    <div>
      <form onSubmit={handleRegisterCheck} className='px-10'>
        <p className='font-[490]'>Enter your email and password to register.</p>

        <div className='relative'>
          <input type="text" className={`w-full border rounded  my-3 p-2 outline-none ${errors.name ? 'border-red-500' : 'border-green-500'}`} id='name' name='name' placeholder='Name!' value={user.name} onChange={handleSetValue} />
          <span className={`absolute left-0 bottom-2 text-red-500 text-xs transition-all duration-200 ${errors.name ? 'translate-y-full' : '-translate-y-4 opacity-0'}`}>{errors.name}</span>
        </div>

        <div className='relative'>
          <input type="text" className={`w-full border rounded  my-3 p-2 outline-none ${errors.surname ? 'border-red-500' : 'border-green-500'}`} id='surname' name='surname' placeholder='Surname!' value={user.surname} onChange={handleSetValue} />
          <span className={`absolute left-0 bottom-2 text-red-500 text-xs transition-all duration-200 ${errors.surname ? 'translate-y-full' : '-translate-y-4 opacity-0'}`}>{errors.surname}</span>
        </div>

        <div className='relative'>
          <input type="email" className={`w-full border rounded my-3 p-2 outline-none ${errors.email ? 'border-red-500' : 'border-green-500'}`} id='email' name='email' placeholder='Enter your email address!' value={user.email} onChange={handleSetValue} />
          <span className={`absolute left-0 bottom-2 text-red-500 text-xs transition-all duration-200 ${errors.email ? 'translate-y-full' : '-translate-y-4 opacity-0'}`}>{errors.email}</span>
        </div>

        <div className='relative'>
          <input type="password" className={`w-full border rounded  my-3 p-2 outline-none ${errors.password ? 'border-red-500' : 'border-green-500'}`} id='password' name='password' placeholder='Create Password!' value={user.password} onChange={handleSetValue} />
          <span className={`absolute left-0 bottom-2 text-red-500 text-xs transition-all duration-200 ${errors.password ? 'translate-y-full' : '-translate-y-4 opacity-0'}`}>{errors.password}</span>
        </div>

        <div className='relative'>
          <input type="password" className={`w-full border rounded  my-3 p-2 outline-none ${errors.confirmPassword ? 'border-red-500' : 'border-green-500'}`} id='confirmPassword' name='confirmPassword' placeholder='Confirm Password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
          <span className={`absolute left-0 bottom-2 text-red-500 text-xs transition-all duration-200 ${errors.confirmPassword ? 'translate-y-full' : '-translate-y-4 opacity-0'}`}>{errors.confirmPassword}</span>
        </div>

        {errors.apiError && <p className='text-red-500 text-xs'>{errors.apiError}</p>}

        <button type="submit" className='w-full bg-[#46A358] text-lg font-semibold text-white rounded p-2 mt-5' disabled={isLoading}>
          {isLoading ? 'Registering...' : 'Register'}
        </button>
        <div className="flex items-center gap-2 my-6">
          <div className="flex-1 h-[1px] bg-gray-200"></div>
          <span className="text-gray-500 text-sm">Or Register with</span>
          <div className="flex-1 h-[1px] bg-gray-200"></div>
        </div>

        <div className="space-y-3">
          <button type="button" className="w-full cursor-not-allowed flex items-center gap-3 border border-gray-300 rounded-md py-2 px-4 hover:bg-gray-100 transition">
            <Facebook />
            <span className="text-sm font-medium text-gray-700">Login with Facebook</span>
          </button>

          <button type="button" onClick={easySignUpWithGoogle} className="w-full flex items-center gap-3 border border-gray-300 rounded-md py-2 px-4 hover:bg-gray-100 transition">
            <img src="https://cdn4.iconfinder.com/data/icons/picons-social/57/09-google-3-512.png" alt="google" className="w-5 h-5" />
            <span className="text-sm font-medium text-gray-700">Login with Google</span>
          </button>

          <button type="button" className="w-full cursor-not-allowed flex items-center gap-3 border border-gray-300 rounded-md py-2 px-4 hover:bg-gray-100 transition" >
            <QrCode />
            <span className="text-sm font-medium text-gray-700">Login with Qr Code</span>
          </button>
        </div>
      </form>
    </div>
  );
}

export default Register;