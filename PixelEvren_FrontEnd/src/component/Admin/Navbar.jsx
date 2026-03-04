import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/Logo.png";
import Login from "../../assets/login.gif";
import Logout from "../../assets/Gıf/logout.gif";
const HNavbar = () => {
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;
  const navigate = useNavigate();
  if (!user || user.role !== "admin") return null;
  const logout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };
  return (
    <div>
      <div className="mx-auto px-6 bg-[#101828]">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2">
            <img className="w-15" src={Logo} alt="" />
            <div>
              <h1 className="text-gray-300 text-xl sm:text-2xl">
                <a href="/">PixelEvren</a>
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-5">
            <h1 className="text-gray-300">
              {user.kullaniciAdi} <b>Admin</b>
            </h1>
            <button
              onClick={logout}
              className="px-1 py-1 text-sm rounded-lg bg-white transition"
            >
              <img className="w-8 cursor-pointer" src={Logout} alt="Logout" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HNavbar;
