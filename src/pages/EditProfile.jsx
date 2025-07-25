import React, { useEffect, useState } from 'react'
import API from '../services/axios';
import { useAuth } from '../context/Authcontext'; 

const EditProfile = () => {
    const { user, setUser } = useAuth();
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
    });
    const [message, setMessage] = useState('');

    useEffect(()=>{
        const fetchProfile = async() =>{
            try{
                const res = await API.get('/auth/profile');
                setForm({
                    name: res.data.user.name || '',
                    email: res.data.user.email || '',
                    password: res.data.user.password || '',
                });
            }catch(err){
                console.error("Failed to fetch profile:", err);
                setMessage('Failed to load profile');
            }
        };
        fetchProfile();
    }, []);

    const handleChange = (e) => {
        setForm((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const res = await API.put('/auth/profile', form);
            setUser(res.data.user);
            setMessage('Profile updated successfully');
        }catch(err) {
            console.error("Failed to update profile:", err);
            setMessage('Failed to update profile');
        }
    }
  return (
    <div className='min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4 py-10'> 
    
    <div className='max-w-md mx-auto p-6 bg-white shadow-md rounded'>
        <h2 className='text-xl font-semibold mb-4'> Edit Profile</h2>
        <form  onClick={handleSubmit}>

        <input 
        type="text"
        name='name'
        value={form.name}
        onChange={handleChange} 
        placeholder='Name'
        className='w-full mb-3 p-2 border rounded'
        />
        <input
        type="email"
        name='email'
        value={form.email}
        onChange={handleChange}
        placeholder='Email'
        className='w-full mb-3 p-2 border rounded'
        />
       
        <button 
        type='submit'
        className='bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700'
        >
            Save Changes
        </button>
        {
            message && <p className='mt-3 text-green-600'>{message}</p>
        }

        </form>
    </div>
    </div>
  );
};

export default EditProfile