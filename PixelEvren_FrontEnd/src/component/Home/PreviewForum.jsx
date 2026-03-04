import React, { useEffect, useState } from "react";
import { IoIosArrowForward, IoIosChatboxes } from "react-icons/io";
import { Link } from "react-router-dom";

import Profile from "../../assets/profil/p1.jpg";
import Profile2 from "../../assets/profil/p2.jpg";
import Profile3 from "../../assets/profil/P3.jpg";
import Profile4 from "../../assets/profil/P4.jpg";

const PreviewForum = () => {
  const [forums, setForums] = useState([]);

  useEffect(() => {
    const loadForums = async () => {
      const res = await fetch(
        "http://localhost/Projeler/PixelEvren/PixelEvren_BackEnd/Api/get-forum.php",
      );
      const data = await res.json();
      setForums(data);
    };
    loadForums();
  }, []);

  return (
    <div className="mx-auto px-10 md:px-20 py-10">
      <div className="mb-10 flex items-center justify-between">
        <h1 className="baslik text-2xl font-bold">Öne Çıkan Konular</h1>
        <Link to="/forum" className="flex items-center gap-1">
          <span className="text-xl font-semibold">Forum</span>
          <IoIosArrowForward className="text-2xl arrow-animate" />
        </Link>
      </div>

      <div className="flex flex-col gap-5">
        {forums.map((forum, index) => (
          <div
            key={forum.id}
            className={`card rounded-md hover:shadow-black hover:shadow-md 
              ${index % 2 === 0 ? "skew-x-12" : "-skew-x-12"} 
              hover:skew-0 px-4 py-4`}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-2">
              <div>
                <h2 className="baslik text-xl">{forum.baslik}</h2>
                <div className="flex gap-5">
                  <span className="icerik">{forum.forum_sahibi}</span>
                  <span className="icerik">
                    {new Date(forum.tarih).toLocaleDateString("tr-TR")}
                  </span>
                </div>
              </div>

              <div className="flex justify-end items-center gap-5">
                <div className="flex">
                  <img className="w-6 h-6 rounded-full" src={Profile} />
                  <img className="w-6 h-6 rounded-full -ml-2" src={Profile2} />
                  <img className="w-6 h-6 rounded-full -ml-2" src={Profile3} />
                  <img className="w-6 h-6 rounded-full -ml-2" src={Profile4} />
                </div>

                <div className="flex items-center gap-1">
                  <IoIosChatboxes className="text-2xl text-white" />
                  <span>{forum.yorum_sayisi}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PreviewForum;
