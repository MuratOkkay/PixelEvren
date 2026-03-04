import React, { useEffect, useState } from "react";
import { RiProfileFill } from "react-icons/ri";
import { FaComments, FaUserPlus, FaBars, FaTimes } from "react-icons/fa";
import { GiCheckboxTree } from "react-icons/gi";
import Imgif from "../../assets/Gıf/İmg.gif";
import { AiOutlineDownload } from "react-icons/ai";

const ForumEdit = () => {
  const [open, setOpen] = useState(false);
  const [forum, setForum] = useState("");
  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(
          "http://localhost/Projeler/PixelEvren/PixelEvren_BackEnd/Api/get-admin-forum.php",
        );
        const data = await res.json();

        const normalized = Array.isArray(data)
          ? data
          : Array.isArray(data?.forum)
            ? data.forum
            : [];
        setForum(normalized);
      } catch (err) {
        console.error("Galeri yükleme hatası:", err);
        setForum([]);
      }
    };
    load();
  }, []);
  const handleDelete = async (id) => {
    console.log("Silinecek ID:", id);

    if (!id) {
      alert("ID yok!");
      return;
    }
    if (!window.confirm("Bu forumu silmek istiyor musun?")) return;

    const formData = new FormData();
    formData.append("id", id);

    const res = await fetch(
      "http://localhost/Projeler/PixelEvren/PixelEvren_BackEnd/Api/delete-forum.php",
      {
        method: "POST",
        body: formData,
      },
    );

    const result = await res.json();
    alert(result.message);
  };
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

        <main className="flex-1 p-6 md:p-10 bg-gray-100 overflow-x-hidden">
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <h3 className="text-2xl font-bold mb-2 text-gray-800">Forumlar</h3>
            <p className="text-gray-600">
              Burada forumları düzenleyebilirsiniz.
            </p>
          </div>
          <div className="mt-8 overflow-x-auto">
            {Array.isArray(forum) && forum.length > 0 ? (
              <table className="min-w-full border border-gray-300 bg-white rounded-lg shadow">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="px-4 py-2 text-left">Forum Konusu</th>
                    <th className="px-4 py-2 text-left">Forum Kategori</th>
                    <th className="px-4 py-2 text-left">Forum Sahibi</th>
                    <th className="px-4 py-2 text-left">Tarih</th>
                    <th className="px-4 py-2 text-center">Sil</th>
                  </tr>
                </thead>

                <tbody>
                  {forum.map((item) => (
                    <tr
                      key={item.id}
                      className="border-t hover:bg-gray-50 transition"
                    >
                      <td className="px-4 py-2">{item.baslik}</td>
                      <td className="px-4 py-2 border-l-2 border-gray-600">
                        {item.kategori}
                      </td>
                      <td className="px-4 py-2 border-l-2 border-gray-600">
                        {item.forum_sahibi}
                      </td>
                      <td className="px-4 py-2 border-l-2 border-gray-600">
                        {item.tarih}
                      </td>
                      <td className="px-4 py-2 border-l-2 border-gray-600 text-center">
                        <button
                          type="button"
                          onClick={() => handleDelete(item.id)}
                          className="bg-red-600 text-white text-xs px-3 py-1 rounded hover:bg-red-700"
                        >
                          Sil
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="text-center text-gray-500">
                Henüz mesaj bulunamadı.
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default ForumEdit;
