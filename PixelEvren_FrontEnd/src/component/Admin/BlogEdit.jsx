import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RiProfileFill } from "react-icons/ri";
import { FaComments, FaUserPlus, FaBars, FaTimes } from "react-icons/fa";
import { GiCheckboxTree } from "react-icons/gi";
import Imgif from "../../assets/Gıf/İmg.gif";
import { AiOutlineDownload } from "react-icons/ai";

const BlogEdit = () => {
  const [open, setOpen] = useState(false);
  const [blogVeri, setBlogVeri] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(
          "http://localhost/Projeler/PixelEvren/PixelEvren_BackEnd/Api/get-blog.php",
        );
        const data = await res.json();

        const normalized = Array.isArray(data)
          ? data
          : Array.isArray(data?.blogVeri)
            ? data.blogVeri
            : [];
        setBlogVeri(normalized);
      } catch (err) {
        console.error("Blog verileri yükleme hatası:", err);
        setBlogVeri([]);
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
      "http://localhost/Projeler/PixelEvren/PixelEvren_BackEnd/Api/delete-blog.php",
      {
        method: "POST",
        body: formData,
      },
    );
    const result = await res.json();
    alert(result.message);
  };
  {
    /*const handleUpdate = async (id) => {
    console.log("Güncellenecek ID:", id);

    if (!id) {
      alert("ID yok!");
      return;
    }
    if (!window.confirm("Bu bloğu  güncellemek istiyor musun?")) return;

    const formData = new FormData();
    formData.append("id", id);

    const res = await fetch(
      "http://localhost/Projeler/PixelEvren/PixelEvren_BackEnd/Api/update-blog.php",
      {
        method: "POST",
        body: formData,
      },
    );
    const result = await res.json();
    alert(result.message);
  };*/
  }

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
              Blog Düzenle
            </h3>
            <p className="text-gray-600">
              Burada Blog düzenleme işlemi yapabilirsiniz.
            </p>
          </div>

          <div className="mt-8">
            <div>
              <div className="">
                {Array.isArray(blogVeri) && blogVeri.length > 0 ? (
                  blogVeri.map((blog) => (
                    <div
                      key={`${blog.id}`}
                      className="flex justify-start  items-center gap-4 bg-white  rounded-lg relative shadow hover:shadow-lg transition duration-300 mb-10"
                    >
                      <img
                        src={`http://localhost/Projeler/PixelEvren/PixelEvren_BackEnd/${blog.resim}`}
                        alt={blog.resim || "Resim"}
                        className="w-40 h-40 object-cover rounded-t-lg"
                        loading="lazy"
                      />
                      <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300 space-y-4">
                        <h1 className="text-2xl font-extrabold text-gray-800">
                          {blog.baslik}
                        </h1>
                        <p className="text-base text-gray-700">
                          {blog.aciklama}
                        </p>

                        <h2 className="text-xl font-semibold text-indigo-600 border-l-4 border-indigo-400 pl-3">
                          {blog.icerikbaslik}
                        </h2>

                        <div className="space-y-2 text-gray-600 text-sm leading-relaxed">
                          <p>{blog.icerik1}</p>
                          <p>{blog.icerik2}</p>
                          <blockquote className="italic text-gray-500 border-l-4 border-gray-300 pl-4">
                            {blog.blogsoz}
                          </blockquote>
                          <p>{blog.icerik3}</p>
                          <p>{blog.icerik4}</p>
                        </div>
                        <div className="space-x-4">
                          <button
                            type="button"
                            onClick={() => handleDelete(blog.id)}
                            className="px-4 py-1 bg-red-500 text-white text-sm rounded-xl cursor-pointer "
                          >
                            Sil
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              navigate(`/admin/blogdüzenle/icerik/${blog.id}`)
                            }
                            className="px-4 py-1 bg-green-500 text-white text-sm rounded-xl cursor-pointer "
                          >
                            Düzenle
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-full text-center text-gray-500">
                    Henüz resim bulunamadı.
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default BlogEdit;
