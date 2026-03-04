import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BiCategory } from "react-icons/bi";

const BlogContent = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    fetch(
      `http://localhost/Projeler/PixelEvren/PixelEvren_BackEnd/Api/get-blog-content.php?id=${id}`,
    )
      .then((res) => res.json())
      .then((data) => setBlog(data));
  }, [id]);

  if (!blog) return null;

  return (
    <div className="mx-auto max-w-7xl px-4 md:px-10 mt-16 relative">
      <section className="relative overflow-hidden rounded-2xl">
        <img
          src={`http://localhost/Projeler/PixelEvren/PixelEvren_BackEnd/${blog.resim}`}
          alt="Blog hero"
          className="absolute inset-0 h-full w-full bg-cover scale-105"
        />

        <div className="relative z-10 flex min-h-[420px] flex-col justify-end px-6 md:px-16 py-10 text-gray-100">
          <span className="mb-3 inline-flex w-fit items-center gap-2 rounded-full bg-pink-600/20 px-4 py-1 text-sm font-medium text-pink-400 backdrop-blur">
            <BiCategory className="text-base" />
            {blog.kategori}
          </span>

          <h1 className="mb-4 max-w-4xl text-3xl font-bold leading-tight md:text-5xl">
            {blog.baslik}
          </h1>

          <p className="max-w-2xl text-base md:text-lg text-gray-300">
            {blog.aciklama}
          </p>
        </div>
      </section>

      <div className="mx-auto mt-20 max-w-3xl text-gray-200">
        <h2 className="mb-6 text-2xl font-bold md:text-3xl">
          {blog.icerikbaslik}
        </h2>

        <div className="space-y-6 text-lg leading-relaxed text-gray-300">
          <p className="indent-8">{blog.icerik1}</p>

          {blog.icerik2 && <p>{blog.icerik2}</p>}

          {blog.blogsoz && (
            <p className="border-l-4 border-pink-500 bg-white/5 px-6 py-4 italic text-gray-200">
              {blog.blogsoz}
            </p>
          )}

          {blog.icerik3 && <p>{blog.icerik3}</p>}

          {blog.icerik4 && <p>{blog.icerik4}</p>}
        </div>
      </div>
    </div>
  );
};

export default BlogContent;
