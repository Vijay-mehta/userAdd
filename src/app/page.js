'use client'
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function UserForm() {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    avatar: null,
    name: "",
    title: "",
    bio: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAvatarChange = (e) => {
    setFormData({ ...formData, avatar: e.target.files[0] });
  };

  const handleFollowToggle = (index) => {
    setUsers(users.map((user, i) => i === index ? { ...user, isFollowing: !user.isFollowing } : user));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.title || !formData.bio) return;

    setUsers([...users, { 
      ...formData, 
      avatar: formData.avatar ? URL.createObjectURL(formData.avatar) : null, 
      isFollowing: false 
    }]);

    setFormData({ avatar: null, name: "", title: "", bio: "" });

    toast.success("User added successfully!", {
      position: "top-right",
      autoClose: 2000,
    });
  };

  return (
    <div className="max-w-md mx-auto p-4 border rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-2"> Form</h2>
      <form onSubmit={handleSubmit} className="space-y-2">
        <input 
          type="file" 
          accept="image/*" 
          name="avatar"
          onChange={handleAvatarChange} 
          className="border p-2 rounded w-full" 
        />
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="border p-2 rounded w-full"
        />
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          required
          className="border p-2 rounded w-full"
        />
        <textarea
          name="bio"
          placeholder="Short Bio"
          value={formData.bio}
          onChange={handleChange}
          required
          className="border p-2 rounded w-full"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Add User</button>
      </form>

      <h2 className="text-lg font-semibold mt-4">User List</h2>
      <ul className="mt-2 space-y-2">
        {users.map((user, index) => (
          <li key={index} className="p-2 border rounded flex items-center space-x-4">
            <img
              src={user.avatar || "https://via.placeholder.com/50"}
              alt="Avatar"
              className="w-12 h-12 rounded-full"
            />
            <div>
              <h3 className="font-semibold">{user.name}</h3>
              <p className="text-sm text-gray-600">{user.title}</p>
              <p className="text-xs text-gray-500">{user.bio}</p>
            </div>
            <button 
              onClick={() => handleFollowToggle(index)} 
              className={`px-4 py-1 rounded text-white ${user.isFollowing ? 'bg-green-500' : 'bg-gray-500'}`}>
              {user.isFollowing ? 'Following' : 'Follow'}
            </button>
          </li>
        ))}
      </ul>


    </div>
  );
}
