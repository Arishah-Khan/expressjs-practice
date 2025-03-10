import { useState, useEffect } from "react";
import Cookies from "js-cookie";  
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);  
  const [username, setUserName] = useState("");  
  const [email, setEmail] = useState("");  
  const [address, setAddress] = useState("");  
  const [country, setCountry] = useState(""); 
  const [city, setCity] = useState("");  
  const [user, setUser] = useState(null);  
  const navigate = useNavigate();  

  useEffect(() => {
    const token = Cookies.get("jwt");

    if (!token) {
      navigate("/login");  
    } else {
      fetchUserData(token);
    }
  }, [navigate]);

  const fetchUserData = async (token) => {
    try {
      const response = await fetch("https://first-server123.up.railway.app/api/auth/profile", {
        method: "GET",
        credentials: "include",  // Yeh line cookies ko send karne ke liye zaroori hai
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data);  
        setUserName(data.username);  
        setEmail(data.email); 
        setAddress(data.address);  
        setCountry(data.country);  
        setCity(data.city); 
      } else {
        console.log("Error fetching user data");
      }
    } catch (error) {
      console.log("Error fetching user data:", error);
    }
  };

  const handleSave = async () => {
    const token = Cookies.get("jwt");

    if (!token) {
      navigate("/login");  
    } else {
      try {
        const response = await fetch("https://first-server123.up.railway.app/api/auth/profile", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,  
          },
          credentials: "include",
          body: JSON.stringify({ username, email, address, country, city }),  
        });

        if (response.ok) {
          const updatedUser = await response.json();
          setUser(updatedUser); 
          setIsEditing(false);  
        } else {
          console.log("Error updating user data");
        }
      } catch (error) {
        console.log("Error updating user data:", error);
      }
    }
  };

  return (
    <div className="profile-container p-6">
      <h3>Hello, {user ? user.username : "Guest"}</h3>
      {user ? (
        <div>
          <h1 className="text-2xl font-bold">Profile</h1>

          <div className="mt-4">
            <label className="block text-sm font-medium">User Name</label>
            {isEditing ? (
              <input
                type="text"
                value={username}
                onChange={(e) => setUserName(e.target.value)}
                className="mt-1 p-2 border rounded"
              />
            ) : (
              <p>{user.username}</p>
            )}
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium">Email</label>
            {isEditing ? (
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 p-2 border rounded"
              />
            ) : (
              <p>{user.email}</p>
            )}
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium">Address</label>
            {isEditing ? (
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="mt-1 p-2 border rounded"
              />
            ) : (
              <p>{user.address}</p>
            )}
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium">Country</label>
            {isEditing ? (
              <input
                type="text"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="mt-1 p-2 border rounded"
              />
            ) : (
              <p>{user.country}</p>
            )}
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium">City</label>
            {isEditing ? (
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="mt-1 p-2 border rounded"
              />
            ) : (
              <p>{user.city}</p>
            )}
          </div>

          {/* Buttons */}
          <div className="mt-6">
            {isEditing ? (
              <button
                onClick={handleSave}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Save Changes
              </button>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="bg-green-500 text-white px-4 py-2 rounded"
              >
                Edit Profile
              </button>
            )}
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Profile;
