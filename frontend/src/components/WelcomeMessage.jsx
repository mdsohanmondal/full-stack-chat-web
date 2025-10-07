import {Link} from "react-router-dom"
import React from "react";
const WelcomeMessage = () => {
  return (
    <div className="flex flex-col items-center justify-start w-full h-full bg-gray-50">
  <div className="text-center mt-20 mr-20">
    <h1 className="text-6xl font-bold text-gray-800">Welcome.👏</h1>
    <span className="mt-5 block text-lg font-light text-gray-600">
      Send message to your favorite person
    </span>
  </div>

  {/* Profile Section */}
  <div className="bg-white shadow-lg rounded-2xl p-8 w-80 mt-20 border border-gray-200">
    <div className="flex flex-col items-center">
      <img
        src="https://i.pravatar.cc/150?img=3"
        alt="Profile"
        className="w-24 h-24 rounded-full border-4 border-blue-500 shadow-sm"
      />
      <h2 className="mt-4 text-2xl font-semibold text-gray-800">Sohan Ahmed</h2>
      <p className="text-gray-500 text-sm">sohan@example.com</p>

      <p className="mt-3 text-gray-600 text-center text-sm italic">
        "Full Stack Developer | Dream big, code smart 🚀"
      </p>

      <div className="mt-5 flex space-x-3">
        <button className="px-4 py-2 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600 transition">
          Edit Profile
        </button>
        <Link to="/log-out">
        <button className="px-4 py-2 bg-gray-100 text-gray-700 text-sm rounded-lg hover:bg-gray-200 transition">
          Logout
        </button>
        </Link>
      </div>
    </div>
  </div>
</div>

  );
};

export default WelcomeMessage;
