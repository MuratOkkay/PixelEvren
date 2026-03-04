import React from "react";
import { SlSocialInstagram } from "react-icons/sl";
import { TiSocialFacebook } from "react-icons/ti";
import { FaXTwitter } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa";
const Footer = () => {
  return (
    <footer className="bg-[#101828] text-gray-300 py-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Logo & Hakkında */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">🎮 PixelEvren</h2>
          <p className="text-sm leading-relaxed">
            Oyun tutkunlarının buluşma noktası. Blog yazıları, forum
            tartışmaları ve en güncel oyun haberleri burada!
          </p>
        </div>

        {/* Linkler */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Bağlantılar</h3>
          <ul className="space-y-2">
            <li>
              <a href="/blog" className="hover:text-blue-400 transition">
                Blog
              </a>
            </li>
            <li>
              <a href="/forum" className="hover:text-blue-400 transition">
                Forum
              </a>
            </li>
          </ul>
        </div>

        {/* Sosyal Medya */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            Sosyal Medya
          </h3>
          <div className="flex space-x-5">
            <a href="#">
              <SlSocialInstagram className="text-2xl text-pink-800" />
            </a>
            <a href="#">
              <TiSocialFacebook className="text-2xl text-pink-800" />
            </a>
            <a href="#">
              <FaXTwitter className="text-2xl text-pink-800" />
            </a>
            <a href="#">
              <FaYoutube className="text-2xl text-pink-800" />
            </a>
          </div>
        </div>
      </div>

      {/* Alt Kısım */}
      <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm text-gray-500">
        © 2025 PixelEvren. Tüm hakları saklıdır.
      </div>
    </footer>
  );
};

export default Footer;
