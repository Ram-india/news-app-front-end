import React from 'react';
import { useAuth } from '../context/Authcontext';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="text-center mt-10 text-gray-600 text-xl">
        Loading your profile...
      </div>
    );
  }

  return (
    <>
    
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 py-10">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <div className="flex flex-col items-center">
          <img
            src={`https://ui-avatars.com/api/?name=${user.name}`}
            alt="Profile"
            className="w-24 h-24 rounded-full mb-4 border"
            />
          <h2 className="text-2xl font-bold mb-1">{user.name}</h2>
          <p className="text-gray-600 mb-4">{user.email}</p>
          <span className="text-sm text-white bg-blue-500 px-3 py-1 rounded-full">
            {user.role || 'user'}
          </span>
        </div>

        <div className="mt-6">
          <button
            onClick={() => navigate('/dashboard/edit-profile')} // optional: create route
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded mb-3"
            >
            Edit Profile
          </button>
          <button
            onClick={logout}
            className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded"
            >
            Logout
          </button>
        </div>
      </div>
    </div>
 </>
  );
};
export default Profile;