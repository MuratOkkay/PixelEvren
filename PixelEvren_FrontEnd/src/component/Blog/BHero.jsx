import React, { useEffect, useState } from "react";
import { BiCategory } from "react-icons/bi";
import { BiSolidCalendarEdit } from "react-icons/bi";
import { Link } from "react-router-dom";

const BHero = () => {
  const [blogs, setBlogs] = useState([]);
  const truncateText = (text, limit = 120) =>
    text.length > limit ? text.substring(0, limit) + "..." : text;
  useEffect(() => {
    fetch(
      "http://localhost/Projeler/PixelEvren/PixelEvren_BackEnd/Api/get-blog.php",
    )
      .then((res) => res.json())
      .then((data) => setBlogs(data));
  }, []);

  if (blogs.length === 0) return null;

  const heroBlog = blogs[0];
  const otherBlogs = blogs.slice(1);

  return (
    <div className="mx-auto px-10 md:px-20 mt-10 ">
      <div className="relative z-99 mb-10">
        <h1 className="baslik font-bold text-3xl mb-2">PixelEvren Blog</h1>
        <p className="icerik font-semibold text-md sm:text-xl">
          Oyun tutkunlarının buluşma noktası. Blog yazıları, forum tartışmaları
          ve en güncel oyun haberleri burada!
        </p>

        <div className="border-b border-gray-500 mt-2 "></div>
      </div>

      {/* HERO BLOG */}
      <div className="relative z-99">
        <div className=" flex flex-col sm:flex-row justify-center items-center gap-5 shadow-xl shadow-gray-400/40 px-2 py-2 rounded-md mb-25 ">
          <img
            className="w-100 xl:w-200 rounded-2xl"
            src={`http://localhost/Projeler/PixelEvren/PixelEvren_BackEnd/${heroBlog.resim}`}
            alt=""
          />
          <div>
            <h2 className="baslik text-2xl font-bold">{heroBlog.baslik}</h2>

            <span className="icerik flex items-center gap-1 mb-2.5 text-md">
              <BiCategory className="text-white text-sm" />
              {heroBlog.kategori}
            </span>

            <p className="icerik text-gray-300 text-lg">{heroBlog.aciklama}</p>

            <Link to={`/BlogContent/${heroBlog.id}`}>
              <button className="text-sm border bg-white px-2 py-1 mt-2 rounded-md hover:scale-110 hover:shadow-lg hover:shadow-black duration-300 cursor-pointer hover:rotate-z-10 ">
                Devamını Oku
              </button>
            </Link>

            <div className="border-b border-gray-400 py-2"></div>

            <h3 className="flex items-center gap-1 mt-2 text-md">
              <BiSolidCalendarEdit className="text-white text-sm" />
              {heroBlog.tarih}
            </h3>
          </div>
        </div>

        {/* DİĞER BLOGLAR */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-30 ">
          {otherBlogs.map((blog) => (
            <div className="card2" key={blog.id}>
              <img
                className="rounded-sm w-full h-40"
                src={`http://localhost/Projeler/PixelEvren/PixelEvren_BackEnd/${blog.resim}`}
                alt=""
              />

              <div>
                <h2 className="baslik text-xl font-bold text-black">
                  {blog.baslik}
                </h2>

                <span className="icerik flex items-center text-black text-sm gap-1 mb-2.5">
                  <BiCategory className="text-black text-xs" />
                  {blog.kategori}
                </span>

                <p className="icerik text-gray-600 text-md">
                  {truncateText(blog.aciklama)}
                </p>

                <Link to={`/BlogContent/${blog.id}`}>
                  <button className="border bg-white text-black text-sm px-2 py-1 mt-2 rounded-md hover:scale-110 hover:shadow-lg hover:shadow-black duration-300 cursor-pointer hover:rotate-z-10 ">
                    Devamını Oku
                  </button>
                </Link>

                <div className="border-b- py-2"></div>

                <h3 className="flex items-center text-black gap-1 mt-2 text-sm">
                  <BiSolidCalendarEdit className="text-black text-xs" />
                  {blog.tarih}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BHero;
