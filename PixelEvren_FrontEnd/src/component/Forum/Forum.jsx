import React, { useEffect, useState } from "react";
import {
  FaRegCommentDots,
  FaSearch,
  FaPlusCircle,
  FaFire,
} from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Forum() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("Tümü");
  const user = JSON.parse(localStorage.getItem("user"));
  const [showModal, setShowModal] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [categories, setCategories] = useState([]);
  const [topics, setTopics] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  useEffect(() => {
    fetch(
      "http://localhost/Projeler/PixelEvren/PixelEvren_BackEnd/Api/get-forum-categories.php",
    )
      .then((res) => res.json())
      .then((data) => setCategories(data));
  }, []);
  useEffect(() => {
    fetch(
      "http://localhost/Projeler/PixelEvren/PixelEvren_BackEnd/Api/get-forum.php",
    )
      .then((res) => res.json())
      .then((data) => setTopics(data));
  }, []);
  const fetchForums = () => {
    fetch(
      "http://localhost/Projeler/PixelEvren/PixelEvren_BackEnd/Api/get-forum.php",
    )
      .then((res) => res.json())
      .then((data) => setTopics(data));
  };

  useEffect(() => {
    fetchForums();
  }, []);

  const addTopic = async () => {
    if (!newTitle.trim()) return;

    const formData = new FormData();
    formData.append("baslik", newTitle);
    formData.append("kategori", newCategory);
    formData.append("forum_sahibi", user.kullaniciAdi);

    const res = await fetch(
      "http://localhost/Projeler/PixelEvren/PixelEvren_BackEnd/Api/add-forum.php",
      {
        method: "POST",
        body: formData,
      },
    );

    const data = await res.json();
    if (data.status === "success") {
      setShowModal(false);
      setNewTitle("");
      fetchForums();
    }
  };

  return (
    <div className="min-h-screen  text-white px-6 md:px-16 mt-10 relative z-99">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10">
        <div>
          <h1 className="baslik text-3xl text-black font-bold tracking-tight">
            Forum
          </h1>
          <p className="icerik  text-black mt-1">
            Toplulukla fikirlerini paylaş
          </p>
        </div>

        <div className="flex gap-3">
          <div className="relative">
            <FaSearch className="absolute left-3 top-3 w-4 h-4 text-zinc-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Konu ara..."
              className="bg-zinc-800 border border-zinc-700 rounded-xl pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {user && (
            <button
              onClick={() => setShowModal(true)}
              className="flex items-center gap-2 bg-indigo-600 px-4 py-2 rounded-xl"
            >
              <FaPlusCircle size={16} /> Yeni Konu
            </button>
          )}
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex gap-3 mb-6 flex-wrap">
        <button
          onClick={() => setActiveCategory("Tümü")}
          className={`px-4 py-2 rounded-full text-sm border ${
            activeCategory === "Tümü"
              ? "bg-indigo-600 text-white"
              : "bg-zinc-800 text-zinc-400"
          }`}
        >
          Tümü
        </button>

        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.kategori)}
            className={`px-4 py-2 rounded-full text-sm border ${
              activeCategory === cat.kategori
                ? "bg-indigo-600 text-white"
                : "bg-zinc-800 text-zinc-400"
            }`}
          >
            {cat.kategori}
          </button>
        ))}
      </div>

      {/* Forum List */}
      <div className="space-y-4">
        {topics
          .filter(
            (t) =>
              t.baslik.toLowerCase().includes(search.toLowerCase()) &&
              (activeCategory === "Tümü" || t.kategori === activeCategory),
          )
          .map((topic) => (
            <div
              key={topic.id}
              className="card border border-zinc-800 rounded-2xl p-5 hover:border-indigo-500/40 transition"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Link to={`/ForumDetail/${topic.id}`}>
                      <h2 className="text-lg text-black font-semibold hover:text-indigo-400 cursor-pointer">
                        {topic.baslik}
                      </h2>
                    </Link>
                    {topic.hot && (
                      <span className="flex items-center gap-1 text-xs text-orange-400 bg-orange-400/10 px-2 py-1 rounded-full">
                        <FaFire size={12} /> Popüler
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-3 text-xs text-black">
                    <span>{topic.forum_sahibi}</span>
                    <span>•</span>
                    <span className="bg-zinc-400 px-2 py-1 rounded-full">
                      {topic.kategori}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-6 text-sm text-zinc-900">
                  <div className="flex items-center gap-1">
                    <FaRegCommentDots size={16} /> {topic.yorum_sayisi}
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Yeni Konu Aç</h2>

            <input
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="Konu başlığı"
              className="w-full mb-4 bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <select
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              className="w-full mb-6 bg-zinc-800 rounded-xl px-4 py-2"
            >
              <option value="">Kategori Seç</option>

              {categories.map((cat) => (
                <option key={cat.id} value={cat.kategori}>
                  {cat.kategori}
                </option>
              ))}
            </select>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded-xl bg-zinc-700 hover:bg-zinc-600"
              >
                İptal
              </button>
              <button
                onClick={addTopic}
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 font-semibold"
              >
                Paylaş
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
