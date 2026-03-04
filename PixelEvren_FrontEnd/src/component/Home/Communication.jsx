import React, { useState } from "react";
import NeonReflexGame from "../../assets/NeonReflexGame";

const Communication = () => {
  const [mesaj, setMesaj] = useState("");
  const handleSave = async () => {
    const formData = new FormData();
    formData.append("mesaj", mesaj);

    const response = await fetch(
      "http://localhost/Projeler/PixelEvren/PixelEvren_BackEnd/Api/add-mesaj.php",
      {
        method: "POST",
        body: formData, // ❗ Content-Type YAZMA
      },
    );

    const result = await response.json();
    alert(result.message);
  };
  return (
    <div className="mx-auto px-10 md:px-20 py-10 mt-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 z-99 bg-[#292A2C] py-10 rounded-xl">
        <div className="flex flex-col justify-center items-center ">
          <h1 className="icerik font-bold text-2xl mb-2">
            Önerini Bizimle Paylaş
          </h1>
          <p className="icerik text-lg text-white/60 text-center">
            Küçük bir önerin bile büyük bir değişim yaratabilir. Oyun dünyasını
            birlikte şekillendirmek için fikirlerini, geri bildirimlerini ve
            hayallerini bizimle paylaş. Hemen yaz, gönder ve bu evrenin bir
            parçası ol !
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSave();
            }}
            className="z-99 flex justify-center items-center gap-3 mt-5"
          >
            <input
              type="text"
              onChange={(e) => setMesaj(e.target.value)}
              placeholder="Önerileriniz"
              className="w-50 md:w-60 lg:w-100 bg-gray-500 rounded-md border-none outline-none  px-2 py-2  focus:shadow-pink-800 focus:shadow-lg text-white"
            />
            <button
              type="submit"
              className=" bg-white px-2 py-2  rounded-md hover:scale-110 hover:shadow-lg hover:shadow-pink-800 duration-300 cursor-pointer hover:rotate-z-10 "
            >
              Gönder
            </button>
          </form>
        </div>
        <div className="flex justify-center items-center">
          <NeonReflexGame />
        </div>
      </div>
    </div>
  );
};

export default Communication;
