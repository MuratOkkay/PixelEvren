import React, { useEffect, useState } from "react";
import { RiProfileFill } from "react-icons/ri";
import { FaComments, FaUserPlus, FaBars, FaTimes } from "react-icons/fa";
import { GiCheckboxTree } from "react-icons/gi";
import Imgif from "../../assets/Gıf/İmg.gif";
import { AiOutlineDownload } from "react-icons/ai";

const HeroSettings = () => {
  const [open, setOpen] = useState(false);
  const [baslik, setBaslik] = useState("");
  const [icerik, setIcerik] = useState("");
  const [resimFile, setResimFile] = useState(null);
  const [resim2File, setResim2File] = useState(null);
  const [resim3File, setResim3File] = useState(null);
  const [resimPath, setResimPath] = useState("");
  const [resim2Path, setResim2Path] = useState("");
  const [resim3Path, setResim3Path] = useState("");
  const [button1, setButton1] = useState("");
  const [button2, setButton2] = useState("");

  const handleSave = async () => {
    const formData = new FormData();
    formData.append("baslik", baslik);
    formData.append("icerik", icerik);
    formData.append("resim", resimFile);
    formData.append("resim2", resim2File);
    formData.append("resim3", resim3File);
    formData.append("btn1", button1);
    formData.append("btn2", button2);

    const response = await fetch(
      "http://localhost/Projeler/PixelEvren/PixelEvren_BackEnd/Api/hero.php",
      {
        method: "POST",
        body: formData, // ❗ Content-Type YAZMA
      },
    );

    const result = await response.json();
    alert(result.message);
  };
  useEffect(() => {
    fetch(
      "http://localhost/Projeler/PixelEvren/PixelEvren_BackEnd/Api/get-hero.php",
    )
      .then((res) => res.json())
      .then((data) => {
        if (!data) return;
        setBaslik(data.baslik);
        setIcerik(data.icerik);
        setResimPath(data.resim);
        setResim2Path(data.resim2);
        setResim3Path(data.resim3);
        setButton1(data.btn1);
        setButton2(data.btn2);
      })
      .catch(console.error);
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

        <main className="flex-1 p-6 md:p-10 bg-gray-100 overflow-x-hidden">
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <h3 className="text-2xl font-bold mb-2 text-gray-800">
              Hero Ayarları
            </h3>
            <p className="text-gray-600">
              Burada hero ayarlarını düzenleyebilirsiniz.
            </p>
          </div>

          <div className="mt-8">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSave();
              }}
              action=""
              encType="multipart/form-data"
              className="grid grid-cols-1 sm:grid-cols-2 gap-8 bg-white p-6 rounded-lg shadow-md border border-gray-200"
            >
              {/* Logo */}
              <div className="flex flex-col">
                <label className="flex items-center gap-2 mb-3 text-lg font-semibold text-gray-700">
                  <AiOutlineDownload />
                  Resim 1 Yükle
                </label>
                <div className="relative h-28 w-full rounded-lg border border-gray-300 bg-gray-50 flex justify-center items-center shadow-sm hover:shadow-md transition">
                  <div className="absolute flex flex-col items-center pointer-events-none">
                    <img alt="File Icon" className="mb-1 w-12" src={Imgif} />
                    <span className="text-xs text-gray-500 font-medium">
                      Dosyalarınızı buraya sürükleyin
                    </span>
                    <span className="text-xs text-gray-400 mt-1">
                      veya yüklemek için tıklayın
                    </span>
                  </div>
                  <input
                    type="file"
                    name="resim"
                    accept="image/*"
                    onChange={(e) => setResimFile(e.target.files[0])}
                    className="h-full w-full opacity-0 cursor-pointer"
                  />
                </div>
                <input
                  type="text"
                  placeholder="Dosya yolu..."
                  value={resimPath}
                  readOnly
                  className="mt-4 bg-gray-100 border border-gray-300 w-full px-3 py-2 rounded-md text-sm focus:ring-2 focus:ring-green-500 outline-none"
                />
              </div>
              <div className="flex flex-col">
                <label className="flex items-center gap-2 mb-3 text-lg font-semibold text-gray-700">
                  <AiOutlineDownload />
                  Resim 2 Yükle
                </label>
                <div className="relative h-28 w-full rounded-lg border border-gray-300 bg-gray-50 flex justify-center items-center shadow-sm hover:shadow-md transition">
                  <div className="absolute flex flex-col items-center pointer-events-none">
                    <img alt="File Icon" className="mb-1 w-12" src={Imgif} />
                    <span className="text-xs text-gray-500 font-medium">
                      Dosyalarınızı buraya sürükleyin
                    </span>
                    <span className="text-xs text-gray-400 mt-1">
                      veya yüklemek için tıklayın
                    </span>
                  </div>
                  <input
                    type="file"
                    name="resim2"
                    accept="image/*"
                    onChange={(e) => setResim2File(e.target.files[0])}
                    className="h-full w-full opacity-0 cursor-pointer"
                  />
                </div>
                <input
                  type="text"
                  placeholder="Dosya yolu..."
                  value={resim2Path}
                  readOnly
                  className="mt-4 bg-gray-100 border border-gray-300 w-full px-3 py-2 rounded-md text-sm focus:ring-2 focus:ring-green-500 outline-none"
                />
              </div>
              <div className="flex flex-col">
                <label className="flex items-center gap-2 mb-3 text-lg font-semibold text-gray-700">
                  <AiOutlineDownload />
                  Resim 3 Yükle
                </label>
                <div className="relative h-28 w-full rounded-lg border border-gray-300 bg-gray-50 flex justify-center items-center shadow-sm hover:shadow-md transition">
                  <div className="absolute flex flex-col items-center pointer-events-none">
                    <img alt="File Icon" className="mb-1 w-12" src={Imgif} />
                    <span className="text-xs text-gray-500 font-medium">
                      Dosyalarınızı buraya sürükleyin
                    </span>
                    <span className="text-xs text-gray-400 mt-1">
                      veya yüklemek için tıklayın
                    </span>
                  </div>
                  <input
                    type="file"
                    name="resim3"
                    accept="image/*"
                    onChange={(e) => setResim3File(e.target.files[0])}
                    className="h-full w-full opacity-0 cursor-pointer"
                  />
                </div>
                <input
                  type="text"
                  placeholder="Dosya yolu..."
                  value={resim3Path}
                  readOnly
                  className="mt-4 bg-gray-100 border border-gray-300 w-full px-3 py-2 rounded-md text-sm focus:ring-2 focus:ring-green-500 outline-none"
                />
              </div>
              {/* Boşluk */}
              <div></div>

              {/* Site Başlığı */}
              <div className="flex flex-col">
                <label className="mb-2 text-lg font-semibold text-gray-700">
                  Hero Başlığı
                </label>
                <input
                  type="text"
                  value={baslik}
                  onChange={(e) => setBaslik(e.target.value)}
                  placeholder="Hero Başlığı..."
                  className="bg-gray-100 border border-gray-300 w-full px-3 py-2 rounded-md text-sm focus:ring-2 focus:ring-green-500 outline-none"
                />
              </div>

              {/* Site Tanıtım */}
              <div className="flex flex-col">
                <label className="mb-2 text-lg font-semibold text-gray-700">
                  Hero İçerik
                </label>
                <input
                  type="text"
                  value={icerik}
                  onChange={(e) => setIcerik(e.target.value)}
                  placeholder="Hero Açıklaması..."
                  className="bg-gray-100 border border-gray-300 w-full px-3 py-2 rounded-md text-sm focus:ring-2 focus:ring-green-500 outline-none"
                />
              </div>
              {/* Buton Adı */}
              <div className="flex flex-col">
                <label className="mb-2 text-lg font-semibold text-gray-700">
                  Button 1 Adı
                </label>
                <input
                  type="text"
                  value={button1}
                  onChange={(e) => setButton1(e.target.value)}
                  placeholder="Buton adı..."
                  className="bg-gray-100 border border-gray-300 w-full px-3 py-2 rounded-md text-sm focus:ring-2 focus:ring-green-500 outline-none"
                />
              </div>

              <div className="flex flex-col">
                <label className="mb-2 text-lg font-semibold text-gray-700">
                  Button 2 Adı
                </label>
                <input
                  type="text"
                  value={button2}
                  onChange={(e) => setButton2(e.target.value)}
                  placeholder="Buton adı..."
                  className="bg-gray-100 border border-gray-300 w-full px-3 py-2 rounded-md text-sm focus:ring-2 focus:ring-green-500 outline-none"
                />
              </div>

              {/* Kaydet Butonu */}
              <div className="sm:col-span-2 flex justify-center">
                <button
                  type="submit"
                  className="mt-4 bg-green-600 text-white font-semibold w-full sm:w-60 px-4 py-2 rounded-md shadow hover:bg-green-700 transition cursor-pointer"
                >
                  Ayarları Kaydet
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};

export default HeroSettings;
