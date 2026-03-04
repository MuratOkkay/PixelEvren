import React, { useEffect, useState } from "react";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import { useParams } from "react-router-dom";
export default function ForumDetail() {
  const { id } = useParams();

  const [comments, setComments] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const isLoggedIn = !!user;
  const [newComment, setNewComment] = useState("");
  const [topics, setTopics] = useState(null);
  useEffect(() => {
    fetch(
      `http://localhost/Projeler/PixelEvren/PixelEvren_BackEnd/Api/get-forum-2.php?id=${id}`,
    )
      .then((res) => res.json())
      .then((data) => setTopics(data));
  }, [id]);
  const fetchComments = () => {
    fetch(
      `http://localhost/Projeler/PixelEvren/PixelEvren_BackEnd/Api/get-forum-comments.php?forum_id=${id}`,
    )
      .then((res) => res.json())
      .then(setComments);
  };

  const addComment = async () => {
    if (!newComment.trim()) return;

    const formData = new FormData();
    formData.append("forum_id", id);
    formData.append("yorum", newComment);
    formData.append("yorum_sahibi", user.kullaniciAdi);

    const res = await fetch(
      "http://localhost/Projeler/PixelEvren/PixelEvren_BackEnd/Api/add-forum-comments.php",
      {
        method: "POST",
        body: formData,
        credentials: "include",
      },
    );

    const data = await res.json();

    if (data.status === "success") {
      setNewComment("");
      fetchComments(); // 🔥 TEK DOĞRU HAMLE
    }
  };

  useEffect(() => {
    fetch(
      `http://localhost/Projeler/PixelEvren/PixelEvren_BackEnd/Api/get-forum-comments.php?forum_id=${id}`,
    )
      .then((res) => res.json())
      .then((data) => setComments(data));
  }, [id]);

  // Like toggle
  const toggleLike = async (yorumId) => {
    if (!isLoggedIn) return;

    await fetch(
      "http://localhost/Projeler/PixelEvren/PixelEvren_BackEnd/Api/forum-comments-like.php",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `id=${yorumId}`,
      },
    );

    setComments((prev) =>
      prev.map((c) =>
        c.id === yorumId ? { ...c, begeni: Number(c.begeni) + 1 } : c,
      ),
    );
  };

  return (
    <div className="min-h-screen px-6 md:px-16 mt-10 relative z-99">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        {topics && (
          <div className="mb-8">
            <h1 className="baslik text-3xl text-black font-bold mb-2">
              {topics.baslik}
            </h1>

            <div className="icerik text-md text-black flex items-center gap-3">
              <span>{topics.forum_sahibi}</span>
              <span>•</span>
              <span className="bg-zinc-400 px-2 py-1 rounded-full">
                {topics.kategori}
              </span>
            </div>
          </div>
        )}

        {/* Comments */}
        <h2 className="text-xl font-semibold mb-4">Yorumlar</h2>

        <div className="space-y-4 mb-6">
          {comments.map((c) => (
            <div
              key={c.id}
              className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 flex justify-between gap-4"
            >
              <div>
                <p className="text-sm text-indigo-400 mb-1">{c.yorum_sahibi}</p>
                <p className="text-zinc-300 text-sm">{c.yorum}</p>
              </div>

              {/* Like */}
              <button
                onClick={() => toggleLike(c.id)}
                disabled={!isLoggedIn}
                className="flex items-center gap-1 text-sm text-zinc-400"
              >
                <AiOutlineLike size={18} />
                <span>{c.begeni}</span>
              </button>
            </div>
          ))}
        </div>

        {/* Add Comment */}
        {isLoggedIn ? (
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Yorumunu yaz..."
              className="w-full h-24 bg-zinc-800 border border-zinc-700 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <div className="flex justify-end mt-3">
              <button
                onClick={addComment}
                className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-xl text-sm font-semibold text-white"
              >
                Yorum Yap
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6 text-center">
            <p className="text-zinc-400 mb-4">
              Yorum ve beğeni için üye girişi yapmalısın.
            </p>
            <button className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-xl text-sm font-semibold text-white">
              Giriş Yap / Kayıt Ol
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
