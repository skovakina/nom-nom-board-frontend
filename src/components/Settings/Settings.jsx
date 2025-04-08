import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { UserContext } from '../../contexts/UserContext';
import { Button } from '@/components/ui/button';

function Settings() {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate(); // Hook for navigation
  const [username, setUsername] = useState(user.username || '');
  const [email, setEmail] = useState(user.email || '');
  const [bio, setBio] = useState(user.bio || '');
  const [avatar, setAvatar] = useState(null); 

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(file);
    }
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      const formData = new FormData();
      formData.append('username', username);
      formData.append('email', email);
      formData.append('bio', bio);
      if (avatar) {
        formData.append('avatar', avatar); 
      }

      const response = await fetch(`/api/users/${user._id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: formData, 
      });

      if (response.ok) {
        const updatedUser = await response.json();
        setUser(updatedUser);
        console.log('Profile updated successfully');
        navigate('/dashboard'); 
      } else {
        console.error('Failed to update profile');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <div className="settings-page bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto">
      <div className="settings-header mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-1">Manage your account settings and email preferences.</p>
      </div>

      <form onSubmit={handleSubmit} className="profile-form">
        <div className="profile-info mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Profile</h2>
          <p className="text-gray-600 mt-1 mb-4">This is how others will see you on the site.</p>

          <div className="form-group mb-4">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="form-group mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="form-group mb-4">
            <label htmlFor="bio" className="block text-sm font-medium text-gray-700">Bio</label>
            <textarea
              id="bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="4"
            />
            <p className="mt-1 text-sm text-gray-500">You can @mention other users and organizations to link to them.</p>
          </div>
        </div>

        <div className="avatar-section mb-6">
          <h3 className="text-lg font-medium text-gray-900">Avatar</h3>
          {user.avatar && <img src={user.avatar} alt="Avatar" className="w-24 h-24 rounded-full mb-2" />}
          <input
            type="file"
            id="avatar"
            accept="image/*"
            onChange={handleAvatarChange}
            className="mt-2"
          />
          {/* Optional: Replace the button with a styled input if preferred */}
          {/* <Button variant="secondary" className="mt-2">Change Image</Button> */}
        </div>

        <div className="form-actions">
          <Button type="submit" variant="primary" className="w-full">Update Profile</Button>
        </div>
      </form>
    </div>
  );
}

export default Settings;