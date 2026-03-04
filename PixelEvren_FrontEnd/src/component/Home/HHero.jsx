import React, { useEffect, useState } from "react";

const HHero = () => {
  const [hero, setHero] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const loadHero = async () => {
      const res = await fetch(
        "http://localhost/Projeler/PixelEvren/PixelEvren_BackEnd/Api/get-hero.php",
      );
      const data = await res.json();
      setHero(data);
    };
    loadHero();
  }, []);

  const images = hero
    ? [hero.resim, hero.resim2, hero.resim3].filter(Boolean)
    : [];

  useEffect(() => {
    if (images.length === 0) return;

    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
        setFade(true);
      }, 300);
    }, 5000);

    return () => clearInterval(interval);
  }, [images]);

  if (!hero) return null;

  return (
    <div className="mx-auto">
      <div
        className={`transition-opacity duration-1000 ${
          fade ? "opacity-100" : "opacity-0"
        }`}
        style={{
          backgroundImage: `url(http://localhost/Projeler/PixelEvren/PixelEvren_BackEnd/${images[currentIndex]})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="flex justify-center items-center h-[70vh]">
          <div className="text-center backdrop-blur-xs bg-black/10 p-6 rounded-xl shadow-2xl w-[90%] h-[100%] sm:h-[50%] lg:h-[80%] md:w-[70%]">
            <h1 className="text-5xl sm:text-7xl font-semibold text-black">
              {hero.baslik}
            </h1>

            <p className="mt-8 text-sm sm:text-xl text-white">{hero.icerik}</p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 justify-center  mt-6 sm:mt-10">
              <a href="/forum" className="glitch-btn ">
                {hero.btn1}
              </a>
              <a href="/blog" className="glitch-btn2">
                {hero.btn2}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HHero;
