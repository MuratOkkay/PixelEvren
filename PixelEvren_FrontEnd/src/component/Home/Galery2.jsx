import { useEffect, useState } from "react";

const Galery2 = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetch(
      "http://localhost/Projeler/PixelEvren/PixelEvren_BackEnd/Api/get-galery.php",
    )
      .then((res) => res.json())
      .then((data) => {
        console.log("API DATA:", data);
        setImages(data);
      })
      .catch((err) => console.error("Galeri yüklenemedi:", err));
  }, []);

  return (
    <div className="mx-auto px-6 md:px-12 py-12 mt-20 mb-20">
      <h2 className="text-3xl font-bold text-center mb-10">Galeri</h2>

      <div className="grid grid-cols-2 md:grid-cols-6 gap-6">
        {Array.isArray(images) && images.length > 0 ? (
          images.map((resim, i) => (
            <div
              key={resim.id ?? i}
              className="relative group overflow-hidden rounded-lg shadow-lg"
            >
              <img
                src={`http://localhost/Projeler/PixelEvren/PixelEvren_BackEnd/${resim.resim}`}
                alt={`Galery ${resim.id ?? i}`}
                className="w-full h-40 object-cover grayscale
                           group-hover:grayscale-0 group-hover:scale-110
                           transition duration-700"
              />
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-400">
            Galeri yükleniyor...
          </p>
        )}
      </div>
    </div>
  );
};

export default Galery2;
