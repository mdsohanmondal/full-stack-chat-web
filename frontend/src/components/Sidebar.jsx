import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

const Sidebar = () => {
  const [token] = useState(localStorage.getItem("token"));
  const [currentUserData,setCurrentUserData] = useState(null);
  const [userLists, setUserLists] = useState([]);

  useEffect(() => {
    if(token || token !== ""){
      setCurrentUserData(jwtDecode(token))
    }else{
      return useNavigate('/authentication')
      
    }
    const fetchUsers = async () => {
      try {
        const { data } = await axios.get("http://localhost:4040/api/users");
        setUserLists(data);
      } catch (err) {
        console.error("Failed to fetch users:", err);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div className="w-72 bg-zinc-100 border-r border-gray-200 flex flex-col h-full">
      <div className="flex-1 overflow-y-auto">
        {userLists.length === 0 ? (
          <div className="p-4 text-gray-500">Thinking users...</div>
        ) : (
          userLists.map((user) => (
            user._id !== currentUserData.id && (
              <NavLink
                to={`message/${user._id}`}
                key={user._id}
                className={({ isActive }) =>
                  `flex items-center justify-start gap-3 p-3 rounded-md mx-2 my-1 transition ${
                    isActive
                      ? "bg-blue-500 text-white"
                      : "bg-zinc-100 hover:bg-gray-200 text-gray-700"
                  }`
                }
              >
                <div className="w-10 h-10 bg-red-400 rounded-full"></div>
                {user.username}
              </NavLink>
            )
          ))
        )}
      </div>
    </div>
  );
};

export default Sidebar;
