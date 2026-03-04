import React from "react";
import { SlSocialInstagram } from "react-icons/sl";
import { FaXTwitter } from "react-icons/fa6";
import Profile from "../../assets/profil/p1.jpg";
import Profile2 from "../../assets/profil/p2.jpg";
import Profile3 from "../../assets/profil/P3.jpg";
import Profile4 from "../../assets/profil/P4.jpg";
const Team = () => {
  return (
    <div className="mx-auto px-10 md:px-20 py-10 ">
      <div>
        <div className="flex flex-col gap-3 items-center text-center">
          <h1 className="baslik text-3xl font-bold  ">PixelEvren Akibi</h1>
          <p className="icerik text-gray-800 text-xl w-[350px] sm:w-[800px]">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            Blanditiis, autem quia quis perspiciatis reprehenderit maiores
            dolores pariatur sequi ipsa vitae soluta ut odit culpa provident
            officia, velit placeat rerum ratione!
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-10 ">
          <div className="flex flex-col items-center z-99">
            <img className="w-60 h-60 rounded-full mb-2" src={Profile} alt="" />
            <h3 className="icerik font-bold text-2xl ">Whitney Francis</h3>
            <span className="icerik font-semibold text-xl mb-2 ">Admin</span>
            <div className="flex justify-center items-center gap-4">
              <a href="#">
                <SlSocialInstagram className="text-xl text-pink-800 cursor-pointer" />
              </a>
              <a href="#">
                <FaXTwitter className="text-xl text-pink-800 cursor-pointer" />
              </a>
            </div>
          </div>
          <div className="flex flex-col items-center z-99">
            <img
              className="w-60 h-60 rounded-full mb-2"
              src={Profile2}
              alt=""
            />
            <h3 className="icerik font-bold text-2xl ">Leonard Krasner</h3>
            <span className="icerik font-semibold text-xl mb-2 ">Admin</span>
            <div className="flex justify-center items-center gap-4">
              <a href="#">
                <SlSocialInstagram className="text-xl text-pink-800 cursor-pointer" />
              </a>
              <a href="#">
                <FaXTwitter className="text-xl text-pink-800 cursor-pointer" />
              </a>
            </div>
          </div>
          <div className="flex flex-col items-center z-99">
            <img
              className="w-60 h-60 rounded-full mb-2"
              src={Profile4}
              alt=""
            />
            <h3 className="icerik font-bold text-2xl ">Kristin Watson</h3>
            <span className="icerik font-semibold text-xl mb-2 ">Admin</span>
            <div className="flex justify-center items-center gap-4">
              <a href="#">
                <SlSocialInstagram className="text-xl text-pink-800 cursor-pointer" />
              </a>
              <a href="#">
                <FaXTwitter className="text-xl text-pink-800 cursor-pointer" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Team;
