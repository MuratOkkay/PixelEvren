import React, { useEffect, useState } from "react";
import { RiProfileFill } from "react-icons/ri";
import { FaComments, FaUserPlus, FaBars, FaTimes } from "react-icons/fa";
import { GiCheckboxTree } from "react-icons/gi";

const Admin = () => {
  const [open, setOpen] = useState(false);
  const [stats, setStats] = useState({
    blog: 0,
    forum: 0,
    yorum: 0,
    uye: 0,
  });
  useEffect(() => {
    fetch(
      "http://localhost/Projeler/PixelEvren/PixelEvren_BackEnd/Api/dashboard-stats.php",
    )
      .then((res) => res.json())
      .then((data) => setStats(data));
  }, []);
  const [data, setData] = useState({
    bloglar: [],
    forumlar: [],
    uyeler: [],
  });

  useEffect(() => {
    fetch(
      "http://localhost/Projeler/PixelEvren/PixelEvren_BackEnd/Api/dashboard-last.php",
    )
      .then((res) => res.json())
      .then(setData);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="lg:hidden flex items-center justify-between p-4 bg-gray-800 text-white shadow-md sticky top-0 z-50">
        <h1 className="text-xl font-bold">Admin Paneli</h1>
        <button
          className="p-2 bg-gray-700 text-white rounded hover:bg-gray-600 transition-colors"
          onClick={() => setOpen(!open)}
          aria-label="Toggle Menu"
        >
          {open ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      <div className="flex flex-1 relative">
        {open && (
          <div
            className="fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity duration-300"
            onClick={() => setOpen(false)}
          ></div>
        )}

        <div
          className={`fixed lg:static top-0 left-0 h-full w-64 bg-[#525252] text-white px-4 py-8 
          transform ${open ? "translate-x-0" : "-translate-x-full"} 
          lg:translate-x-0 transition-transform duration-300 z-50 overflow-y-auto`}
        >
          <div className="hidden lg:block mb-8 border-b border-gray-500 pb-4">
            <h1 className="text-2xl font-bold text-center">Yönetim</h1>
          </div>

          <ul className="space-y-3">
            <li className="border-b-2 border-r-2 border-gray-500 hover:bg-white/10 py-2 px-3 rounded-md transition-colors">
              <a href="/admin" className="block w-full ">
                Admin Paneli
              </a>
            </li>
            <li className="border-b-2 border-r-2 border-gray-500 hover:bg-white/10 py-2 px-3 rounded-md transition-colors">
              <a href="/admin/siteayarlari" className="block w-full">
                Site Ayarları
              </a>
            </li>
            <li className="border-b-2 border-r-2 border-gray-500 hover:bg-white/10 py-2 px-3 rounded-md transition-colors">
              <a href="/admin/footerayarlari" className="block w-full">
                Footer
              </a>
            </li>
            <li className="border-b-2 border-r-2 border-gray-500 hover:bg-white/10 py-2 px-3 rounded-md transition-colors">
              <a href="/admin/heroayarlari" className="block w-full">
                Hero
              </a>
            </li>
            <li className="border-b-2 border-r-2 border-gray-500 hover:bg-white/10 py-2 px-3 rounded-md transition-colors">
              <a href="/admin/galeriayarlari" className="block w-full">
                Galeri
              </a>
            </li>

            <li className="group border-b-2 border-r-2 border-gray-500 py-2 px-3 rounded-md">
              <span className="cursor-default font-semibold flex items-center justify-between">
                Blog
                <span className="text-xs opacity-50">Hover</span>
              </span>
              <ul className="hidden group-hover:block mt-2 ml-4 space-y-2 border-l-2 border-gray-400 pl-4 transition-all duration-300">
                <li className="hover:text-gray-300">
                  <a href="/admin/blogekle">Blog Ekle</a>
                </li>
                <li className="hover:text-gray-300">
                  <a href="/admin/blogdüzenle">Blog Düzenle</a>
                </li>
                <li className="hover:text-gray-300">
                  <a href="/admin/blogkategoriler">Kategoriler</a>
                </li>
              </ul>
            </li>

            <li className="group border-b-2 border-r-2 border-gray-500 py-2 px-3 rounded-md">
              <span className="cursor-default font-semibold flex items-center justify-between">
                Forum
                <span className="text-xs opacity-50">Hover</span>
              </span>
              <ul className="hidden group-hover:block mt-2 ml-4 space-y-2 border-l-2 border-gray-400 pl-4 transition-all duration-300">
                <li className="hover:text-gray-300">
                  <a href="/admin/forumdüzenle">Forum Düzenle</a>
                </li>
                <li className="hover:text-gray-300">
                  <a href="/admin/forumkategoriler">Kategoriler</a>
                </li>
                <li className="hover:text-gray-300">
                  <a href="/admin/forumyorumlari">Forum Yorumları</a>
                </li>
              </ul>
            </li>

            <li className="border-b-2 border-r-2 border-gray-500 hover:bg-white/10 py-2 px-3 rounded-md transition-colors">
              <a href="/admin/uyeler" className="block w-full">
                Üyeler
              </a>
            </li>
            <li className="border-b-2 border-r-2 border-gray-500 hover:bg-white/10 py-2 px-3 rounded-md transition-colors">
              <a href="/admin/mesajlar" className="block w-full">
                Mesajlar
              </a>
            </li>
          </ul>
        </div>

        <main className="flex-1 p-4 md:p-8 bg-gray-50 overflow-x-hidden">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
            <div className="flex items-center justify-between bg-green-600/20 border border-green-600/30 rounded-lg p-6 hover:scale-[1.02] transition-transform duration-300 shadow-lg shadow-green-500/10 group">
              <div className="flex flex-col gap-1">
                <h2 className="text-3xl font-bold text-green-800">
                  {stats.blog}
                </h2>
                <span className="text-lg font-medium text-green-700">
                  Toplam Blog
                </span>
              </div>
              <RiProfileFill className="text-6xl md:text-7xl lg:text-[80px] text-green-600 opacity-80 group-hover:opacity-100 transition-opacity" />
            </div>

            <div className="flex items-center justify-between bg-red-600/20 border border-red-600/30 rounded-lg p-6 hover:scale-[1.02] transition-transform duration-300 shadow-lg shadow-red-500/10 group">
              <div className="flex flex-col gap-1">
                <h2 className="text-3xl font-bold text-red-800">
                  {stats.forum}
                </h2>
                <span className="text-lg font-medium text-red-700">
                  Toplam Forum
                </span>
              </div>
              <GiCheckboxTree className="text-6xl md:text-7xl lg:text-[80px] text-red-600 opacity-80 group-hover:opacity-100 transition-opacity" />
            </div>

            <div className="flex items-center justify-between bg-blue-600/20 border border-blue-600/30 rounded-lg p-6 hover:scale-[1.02] transition-transform duration-300 shadow-lg shadow-blue-500/10 group">
              <div className="flex flex-col gap-1">
                <h2 className="text-3xl font-bold text-blue-800">
                  {stats.yorum}
                </h2>
                <span className="text-lg font-medium text-blue-700">
                  Yorumlar
                </span>
              </div>
              <FaComments className="text-6xl md:text-7xl lg:text-[80px] text-blue-600 opacity-80 group-hover:opacity-100 transition-opacity" />
            </div>

            <div className="flex items-center justify-between bg-purple-600/20 border border-purple-600/30 rounded-lg p-6 hover:scale-[1.02] transition-transform duration-300 shadow-lg shadow-purple-500/10 group">
              <div className="flex flex-col gap-1">
                <h2 className="text-3xl font-bold text-purple-800">
                  {stats.uye}
                </h2>
                <span className="text-lg font-medium text-purple-700">
                  Üyeler
                </span>
              </div>
              <FaUserPlus className="text-6xl md:text-7xl lg:text-[80px] text-purple-600 opacity-80 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>

          <div className="mt-8 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-xl font-semibold mb-4">Hoş Geldiniz</h3>
            <p className="text-gray-600">
              Admin paneli içeriğini buradan yönetmeye başlayabilirsiniz.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 mt-8 gap-4">
            <div className="overflow-x-auto">
              <table className="table-auto w-full border-collapse shadow-lg rounded-lg">
                <thead>
                  <tr>
                    <th
                      colSpan={4}
                      className="px-4 py-3 text-left text-lg font-semibold bg-gradient-to-r from-[#28B35C] to-green-800 text-white rounded-t-lg flex items-center gap-2"
                    >
                      <RiProfileFill className="text-xl" /> Son Eklenen 5 Blog
                    </th>
                  </tr>
                  <tr className="bg-gray-100 border-b border-gray-300 text-sm sm:text-base">
                    <th className="px-4 py-2 text-left font-medium">
                      Blog Başlığı
                    </th>
                    <th className="px-4 py-2 text-left font-medium">Tarih</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {data.bloglar.map((blog) => (
                    <tr
                      key={blog.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-4 py-2">{blog.baslik}</td>
                      <td className="px-4 py-2">{blog.tarih}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="overflow-x-auto">
              <table className="table-auto w-full border-collapse shadow-lg rounded-lg">
                <thead>
                  <tr>
                    <th
                      colSpan={4}
                      className="px-4 py-3 text-left text-lg font-semibold bg-gradient-to-r from-[#eb9e9e] to-[#ea2831] text-white rounded-t-lg flex items-center gap-2"
                    >
                      <RiProfileFill className="text-xl" /> Son Eklenen 5 Forum
                    </th>
                  </tr>
                  <tr className="bg-gray-100 border-b border-gray-300 text-sm sm:text-base">
                    <th className="px-4 py-2 text-left font-medium">
                      Forum Konusu
                    </th>
                    <th className="px-4 py-2 text-left font-medium">Yazar</th>
                    <th className="px-4 py-2 text-left font-medium">Tarih</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {data.forumlar.map((forum) => (
                    <tr
                      key={forum.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-4 py-2">{forum.baslik}</td>
                      <td className="px-4 py-2 uppercase">
                        {forum.forum_sahibi}
                      </td>
                      <td className="px-4 py-2">{forum.tarih}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="overflow-x-auto">
              <table className="table-auto w-full border-collapse shadow-lg rounded-lg">
                <thead>
                  <tr>
                    <th
                      colSpan={4}
                      className="px-4 py-3 text-left text-lg font-semibold bg-gradient-to-r from-[#d4a9f7] to-[#a735fa] text-white rounded-t-lg flex items-center gap-2"
                    >
                      <RiProfileFill className="text-xl" /> Son Üyeler
                    </th>
                  </tr>
                  <tr className="bg-gray-100 border-b border-gray-300 text-sm sm:text-base">
                    <th className="px-4 py-2 text-left font-medium">İd</th>
                    <th className="px-4 py-2 text-left font-medium">Üye Adı</th>

                    <th className="px-4 py-2 text-left font-medium">Tarih</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {data.uyeler.map((uye) => (
                    <tr
                      key={uye.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-4 py-2">{uye.id}</td>
                      <td className="px-4 py-2 uppercase">
                        {uye.kullanici_adi}
                      </td>
                      <td className="px-4 py-2">{uye.tarih}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Admin;
