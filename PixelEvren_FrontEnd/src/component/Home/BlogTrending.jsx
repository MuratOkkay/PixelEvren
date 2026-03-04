import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { BiCategory } from "react-icons/bi";
import { BiSolidCalendarEdit } from "react-icons/bi";
import DotGrid from "../Background/DotGrid";
const BlogTrending = () => {
  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    fetch(
      "http://localhost/Projeler/PixelEvren/PixelEvren_BackEnd/Api/get-blog.php",
    )
      .then((res) => res.json())
      .then((data) => setBlogs(data));
  }, []);
  const truncateText = (text, limit = 120) =>
    text.length > limit ? text.substring(0, limit) + "..." : text;
  return (
    <div>
      <div
        data-aos="fade-up"
        data-aos-duration="700"
        className="mx-auto px-10 md:px-20 py-10 "
      >
        <div className="relative inline-block mb-10">
          <h1 className="baslik text-3xl font-bold ">Bloglar</h1>
          <span className="icerik absolute -top-4.5 -left-6  text-red-600 text-xl text-shadow-white text-shadow-lg   duration-300">
            Popüler
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-10 ">
          {blogs[0] && (
            <div className="bg-gray-500 drop-shadow-xl drop-shadow-white px-4 py-4">
              <img
                className="w-250 rounded-2xl"
                src={`http://localhost/Projeler/PixelEvren/PixelEvren_BackEnd/${blogs[0].resim}`}
                alt=""
              />

              <div className="mt-8 px-6">
                <h2 className="baslik text-2xl font-bold">{blogs[0].baslik}</h2>

                <span className="icerik flex items-center gap-1 mb-2.5">
                  <BiCategory className="text-white text-sm" />
                  {blogs[0].kategori}
                </span>

                <p className="icerik text-gray-300 text-xl">
                  {truncateText(blogs[0].icerik1, 200)}
                </p>

                <Link
                  to={`/BlogContent/${blogs[0].id}`}
                  className="border bg-white px-2 py-1 mt-2 rounded-md hover:scale-110 hover:shadow-lg hover:shadow-black duration-300 cursor-pointer hover:rotate-z-10"
                >
                  Devamını Oku
                </Link>

                <div className="border-b- py-2"></div>

                <h3 className="flex items-center gap-1 mt-2 text-md">
                  <BiSolidCalendarEdit className="text-white text-sm" />
                  {blogs[0].tarih}
                </h3>
              </div>
            </div>
          )}

          <div className="flex flex-col justify-center items-center gap-10 ">
            <div className="flex flex-col justify-center items-center gap-10">
              {blogs.slice(1, 4).map((blog) => (
                <div
                  key={blog.id}
                  className="flex flex-col sm:flex-row justify-center items-center gap-5"
                >
                  <img
                    className="w-80 rounded-2xl"
                    src={`http://localhost/Projeler/PixelEvren/PixelEvren_BackEnd/${blog.resim}`}
                    alt=""
                  />

                  <div>
                    <h2 className="baslik text-xl font-bold">{blog.baslik}</h2>

                    <span className="icerik flex items-center gap-1 mb-2.5 text-sm">
                      <BiCategory className="text-white text-xs" />
                      {blog.kategori}
                    </span>

                    <p className="icerik text-gray-300 text-md">
                      {truncateText(blog.icerik1, 100)}
                    </p>

                    <Link
                      to={`/BlogContent/${blog.id}`}
                      className="text-sm border bg-white px-2 py-1 mt-2 rounded-md hover:scale-110 hover:shadow-lg hover:shadow-black duration-300 cursor-pointer hover:rotate-z-10"
                    >
                      Devamını Oku
                    </Link>

                    <div className="border-b py-2"></div>

                    <h3 className="flex items-center gap-1 mt-2 text-sm">
                      <BiSolidCalendarEdit className="text-white text-sm" />
                      {blog.tarih}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogTrending;
