// import { useState, useEffect } from "react";
// import Cookies from "js-cookie";  
// import { Link, useNavigate } from "react-router-dom";
// import { ShoppingBasket, User } from "lucide-react";
// import Cart from "./Cart";

// // Add the logout API call
// const logoutUser = async () => {
//   try {
//     const response = await fetch("http://localhost:5000/api/auth/logout", {
//       method: "POST",
//       credentials: "include",  
//     });
//     const data = await response.json();
//     if (response.ok) {
//       console.log(data.message);  
//       window.location.href = "/";  
//     } else {
//       console.log("Error logging out", data);
//     }
//   } catch (error) {
//     console.log("Logout failed:", error);
//   }
// };

// const Header = () => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [isHovered, setIsHovered] = useState(false);  
//   const navigate = useNavigate();

//   useEffect(() => {
//     const token = Cookies.get("jwt");  
//     console.log("JWT Token in cookies:", token);  
//     setIsLoggedIn(!!token); 
//   }, []);

//   return (
//     <header className="flex justify-between items-center bg-[#434377] px-8 text-white py-3">
//       <Link to="/">
//         <img src="/images/logo.png" width={80} height={70} alt="Company Logo" />
//       </Link>

//       <div className="flex items-center gap-3 w-1/2">
//         <input
//           type="text"
//           placeholder="Search..."
//           className="px-4 py-2 w-full rounded-md text-black"
//         />
//         <button className="bg-white text-[#434377] px-3 py-2 rounded-md">
//           Categories
//         </button>
//       </div>

//       <div className="flex items-center gap-4">
//         <Cart />

//         {isLoggedIn ? (
//           <div
//             className="relative"
//             onMouseEnter={() => setIsHovered(true)} 
//             onMouseLeave={() => setIsHovered(false)} 
//           >
//             <Link
//               to="/profile"
//               className="flex items-center gap-2 border px-2 py-1 rounded-md bg-white text-[#434377]"
//             >
//               <User size={20} /> Profile
//             </Link>

//             {isHovered && (
//               <div className="absolute right-0 mt-2 bg-white text-[#434377] rounded-md shadow-lg">
//                 <Link
//                   to="/profile"
//                   className="block px-4 py-2"
//                   onClick={() => navigate("/profile")} 
//                 >
//                   Edit Profile
//                 </Link>
//                 <button
//                   onClick={logoutUser} // Logout on click
//                   className="block px-4 py-2 text-red-500"
//                 >
//                   Sign Out
//                 </button>
//               </div>
//             )}
//           </div>
//         ) : (
//           <Link
//             to="/login"
//             className="flex items-center gap-2 border px-2 py-1 rounded-md bg-white text-[#434377]"
//           >
//             <User size={20} /> Login
//           </Link>
//         )}
//       </div>
//     </header>
//   );
// };

// export default Header;


import { useState, useEffect } from "react";
import Cookies from "js-cookie";  
import { Link, useNavigate } from "react-router-dom";
import {  User, Search } from "lucide-react";  
import Cart from "./Cart";

// Add the logout API call
const logoutUser = async () => {
  try {
    const response = await fetch("https://first-server123.up.railway.app/api/auth/logout", {
      method: "POST",
      credentials: "include",  
    });
    const data = await response.json();
    if (response.ok) {
      console.log(data.message);  
      window.location.href = "/";  
    } else {
      console.log("Error logging out", data);
    }
  } catch (error) {
    console.log("Logout failed:", error);
  }
};

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isHovered, setIsHovered] = useState(false);  
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get("jwt");  
    console.log("JWT Token in cookies:", token);  
    setIsLoggedIn(!!token); 
  }, []);

  return (
    <header className="flex justify-between items-center bg-[#434377] px-8 text-white py-3">
      <Link to="/">
        <img src="/images/logo.png" width={80} height={70} alt="Company Logo" />
      </Link>

      <div className="flex items-center gap-3 w-1/2">
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Search..."
            className="px-4 py-2 w-full rounded-md text-black pr-10"
          />
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600" size={20} />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Cart />

        {isLoggedIn ? (
          <div
            className="relative"
            onMouseEnter={() => setIsHovered(true)} 
            onMouseLeave={() => setIsHovered(false)} 
          >
            <Link
              to="/profile"
              className="flex items-center gap-2 border px-2 py-1 rounded-md bg-white text-[#434377]"
            >
              <User size={20} /> Profile
            </Link>

            {isHovered && (
              <div className="absolute right-0 mt-2 bg-white text-[#434377] rounded-md shadow-lg w-48">
                <Link
                  to="/profile"
                  className="block px-4 py-2"
                  onClick={() => navigate("/profile")} 
                >
                  Edit Profile
                </Link>
                <button
                  onClick={logoutUser} 
                  className="block px-4 py-2 text-red-500"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link
            to="/login"
            className="flex items-center gap-2 border px-2 py-1 rounded-md bg-white text-[#434377]"
          >
            <User size={20} /> Login
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
