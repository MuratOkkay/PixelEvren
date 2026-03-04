import React, { useEffect, useState } from "react";
import { RiProfileFill } from "react-icons/ri";
import { FaComments, FaUserPlus, FaBars, FaTimes } from "react-icons/fa";
import { GiCheckboxTree } from "react-icons/gi";
import Imgif from "../../assets/Gıf/İmg.gif";
import { AiOutlineDownload } from "react-icons/ai";

const BlogCategories = () => {
  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState("");
  const [category, setcategory] = useState([]);

  const handleSave = async () => {
    const formData = new FormData();
    formData.append("kategori", categories);

    const response = await fetch(
      "http://localhost/Projeler/PixelEvren/PixelEvren_BackEnd/Api/blog-categories.php",
      {
        method: "POST",
        body: formData, // ❗ Content-Type YAZMA
      },
    );

    const result = await response.json();
    alert(result.message);
  };
  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(
          "http://localhost/Projeler/PixelEvren/PixelEvren_BackEnd/Api/get-blog-categories.php",
        );
        const data = await res.json();

        const normalized = Array.isArray(data)
          ? data
          : Array.isArray(data?.category)
            ? data.category
            : [];
        setcategory(normalized);
      } catch (err) {
        console.error("Kategori yükleme hatası:", err);
        setcategory([]);
      }
    };
    load();
  }, []);

  const handleDelete = async (id) => {
    console.log("Silinecek ID:", id); // 👈 BUNU GÖRMELİSİN

    if (!id) {
      alert("ID yok!");
      return;
    }
    if (!window.confirm("Bu kategoriyi silmek istiyor musun?")) return;

    const formData = new FormData();
    formData.append("id", id);

    const res = await fetch(
      "http://localhost/Projeler/PixelEvren/PixelEvren_BackEnd/Api/delete-blog-categories.php",
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
            <h3 className="text-2xl font-bold mb-2 text-gray-800">
              Blog Kategorileri
            </h3>
            <p className="text-gray-600">
              Burada blog kategorilerini düzenleyebilirsiniz.
            </p>
          </div>

          <div className="mt-8">
            <form
              action=""
              onSubmit={(e) => {
                e.preventDefault();
                handleSave();
              }}
              encType="multipart/form-data"
              className="grid grid-cols-1 sm:grid-cols-2 gap-8 bg-white p-6 rounded-lg shadow-md border border-gray-200"
            >
              {/* Kategori Ekle */}
              <div className="flex flex-col">
                <label className="mb-2 text-lg font-semibold text-gray-700">
                  Kategori
                </label>
                <input
                  type="text"
                  onChange={(e) => setCategories(e.target.value)}
                  placeholder="Kategori Adı"
                  className="bg-gray-100 border border-gray-300 w-full px-3 py-2 rounded-md text-sm focus:ring-2 focus:ring-green-500 outline-none"
                />
              </div>

              {/* Kaydet Butonu */}
              <div className="sm:col-span-2 flex justify-center">
                <button className="mt-4 bg-green-600 text-white font-semibold w-full sm:w-60 px-4 py-2 rounded-md shadow hover:bg-green-700 transition cursor-pointer">
                  Kategori Ekle
                </button>
              </div>
            </form>
          </div>
          <div className="mt-8">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {Array.isArray(category) && category.length > 0 ? (
                category.map(
                  (kategori) => (
                    console.log(kategori),
                    (
                      <div
                        key={`${kategori.id}-${kategori.kategori}`}
                        className="bg-white rounded-lg relative shadow hover:shadow-lg transition duration-300 
             p-4  flex items-center justify-between"
                      >
                        <span className="text-gray-800 font-semibold text-sm">
                          {kategori.kategori}
                        </span>

                        <button
                          type="button"
                          onClick={() => handleDelete(kategori.id)}
                          className="bg-red-600 text-white text-xs px-3 py-1 rounded hover:bg-red-700 transition"
                        >
                          Sil
                        </button>
                      </div>
                    )
                  ),
                )
              ) : (
                <div className="col-span-full text-center text-gray-500">
                  Henüz kategori bulunamadı.
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default BlogCategories;
