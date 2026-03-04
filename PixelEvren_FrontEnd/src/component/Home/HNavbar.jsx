import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Logo from "../../assets/Logo.png";
import LoginIcon from "../../assets/login.gif";
import Logout from "../../assets/Gıf/logout.gif";
const HNavbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [settings, setSettings] = useState(null);

  // 🔄 localStorage senkronizasyonu
  useEffect(() => {
    const syncUser = () => {
      const storedUser = localStorage.getItem("user");
      setUser(storedUser ? JSON.parse(storedUser) : null);
    };

    syncUser(); // ilk yüklemede
    window.addEventListener("storage", syncUser);
    return () => window.removeEventListener("storage", syncUser);
  }, []);

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };
  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(
          "http://localhost/Projeler/PixelEvren/PixelEvren_BackEnd/Api/get-site-settings.php",
        );
        const data = await res.json();
        setSettings(data);
      } catch (err) {
        console.error("Logo yükleme hatası:", err);
        setSettings(null);
      }
    };
    load();
  }, []);
  return (
    <div className=" mx-auto  z-99 px-6 bg-[#101828]">
      <div className="flex justify-between items-center h-16">
        {/* Sol taraf */}
        <div className="flex items-center gap-3 sm:gap-6">
          {settings && (
            <img
              src={`http://localhost/Projeler/PixelEvren/PixelEvren_BackEnd/${settings.logo}`}
              alt={settings.baslik || "logo"}
              className="h-10 object-contain"
              loading="lazy"
            />
          )}

          <div className="flex gap-4 sm:gap-8">
            <Link className="text-sm sm:text-lg text-gray-300" to="/">
              Ana Sayfa
            </Link>
            <Link className="text-sm sm:text-lg text-gray-300" to="/blog">
              Blog
            </Link>
            <Link className="text-sm sm:text-lg text-gray-300" to="/forum">
              Forum
            </Link>
          </div>
        </div>

        {/* Sağ taraf */}
        <div className="flex  items-center gap-4">
          {user ? (
            <>
              <span className="text-gray-300 text-xs sm:text-sm">
                <b className="uppercase">{user.kullaniciAdi}</b>
              </span>

              <button
                onClick={logout}
                className="px-1 py-1 text-sm rounded-lg bg-white transition"
              >
                <img
                  className="w-6 sm:w-8 cursor-pointer"
                  src={Logout}
                  alt="Logout"
                />
              </button>
            </>
          ) : (
            <Link to="/login">
              <img
                className="w-6 sm:w-8 cursor-pointer"
                src={LoginIcon}
                alt="Login"
              />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default HNavbar;
