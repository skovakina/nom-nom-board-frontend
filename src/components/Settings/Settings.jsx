import { useContext, useState } from 'react';
import { UserContext } from '../../contexts/UserContext';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';

const Settings = () => {
    const { user, setUser } = useContext(UserContext);

    // Initialize form state with current user data
    const [formData, setFormData] = useState({
        username: user?.username || '',
        email: user?.email || '',
        bio: user?.bio || '',
        avatar: user?.avatar || ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('/api/users/profile', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error('Failed to update profile');
            }

            const updatedUser = await response.json();
            setUser(updatedUser); // Update the user context with the new data
            alert('Profile updated successfully!');
        } catch (error) {
            console.error('Error updating profile:', error);
            alert('Failed to update profile');
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-2">Settings</h1>
            <p className="text-gray-600 mb-6">Manage your account settings and set e-mail preferences.</p>

            <div className="border rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-2">Profile</h2>
                <p className="text-gray-600 mb-4">This is how others will see you on the site.</p>

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <Label htmlFor="username">Username</Label>
                        <Input
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            className="mt-1"
                        />
                    </div>

                    <div className="mb-4">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="mt-1"
                        />
                    </div>

                    <div className="mb-4">
                        <Label htmlFor="bio">Bio</Label>
                        <Textarea
                            id="bio"
                            name="bio"
                            value={formData.bio}
                            onChange={handleChange}
                            className="mt-1"
                            rows={3}
                        />
                        <p className="text-gray-500 text-sm mt-1">
                            You can <span className="text-blue-500">@mention</span> other users and organizations to link to them.
                        </p>
                    </div>

                    <div className="mb-6">
                        <Label htmlFor="avatar">Avatar</Label>
                        <Input
                            id="avatar"
                            name="avatar"
                            type="url"
                            placeholder="https://example.com/avatar.jpg"
                            value={formData.avatar}
                            onChange={handleChange}
                            className="mt-1"
                        />
                    </div>

                    <Button type="submit">Update profile</Button>
                </form>
            </div>
        </div>
    );
};

export default Settings;