import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [mode, setMode] = useState("login");
  const [kullaniciAdi, setKullaniciAdi] = useState("");
  const [email, setEmail] = useState("");
  const [sifre, setSifre] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginSifre, setLoginSifre] = useState("");
  const navigate = useNavigate();

  const handleSave = async () => {
    const formData = new FormData();
    formData.append("kullaniciAdi", kullaniciAdi);
    formData.append("email", email);
    formData.append("sifre", sifre);
    const response = await fetch(
      "http://localhost/Projeler/PixelEvren/PixelEvren_BackEnd/Api/members.php",
      {
        method: "POST",
        body: formData, // ❗ Content-Type YAZMA
      },
    );

    const result = await response.json();
    alert(result.message);
  };

  const handleLogin = async () => {
    const formData = new FormData();
    formData.append("email", loginEmail);
    formData.append("sifre", loginSifre);

    const response = await fetch(
      "http://localhost/Projeler/PixelEvren/PixelEvren_BackEnd/Api/login.php",
      {
        method: "POST",
        body: formData,
      },
    );

    const result = await response.json();

    if (result.status === "success") {
      localStorage.setItem("user", JSON.stringify(result.user));
      window.dispatchEvent(new Event("storage"));
      alert("Hoş geldin " + result.user.kullaniciAdi);
      navigate("/", { replace: true });
    } else {
      alert(result.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center ">
      <div className="relative w-full max-w-md">
        <AnimatePresence mode="wait">
          {mode === "login" ? (
            <motion.div
              key="login"
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 40 }}
              transition={{ duration: 0.4 }}
              className="bg-gradient-to-br from-slate-900 via-gray-900 to-black border border-white/20 rounded-2xl shadow-xl p-8"
            >
              <h2 className="text-2xl font-bold text-white mb-2">Giriş Yap</h2>
              <p className="text-gray-400 mb-6 text-sm">Hesabına giriş yap</p>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleLogin();
                }}
                className="space-y-4"
              >
                <input
                  type="email"
                  required
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="E-posta"
                  className="w-full px-4 py-3 rounded-xl bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <input
                  type="password"
                  required
                  onChange={(e) => setLoginSifre(e.target.value)}
                  placeholder="Şifre"
                  className="w-full px-4 py-3 rounded-xl bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 transition text-white font-semibold"
                >
                  Giriş Yap
                </button>
              </form>

              <p className="text-gray-400 text-sm mt-6 text-center">
                Hesabın yok mu?{" "}
                <button
                  onClick={() => setMode("register")}
                  className="text-indigo-400 hover:underline"
                >
                  Kayıt Ol
                </button>
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="register"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.4 }}
              className="bg-gradient-to-br from-slate-900 via-gray-900 to-black border border-white/20 rounded-2xl shadow-xl p-8"
            >
              <h2 className="text-2xl font-bold text-white mb-2">Kayıt Ol</h2>
              <p className="text-gray-400 mb-6 text-sm">Yeni hesap oluştur</p>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSave();
                }}
                className="space-y-4"
              >
                <input
                  type="text"
                  onChange={(e) => setKullaniciAdi(e.target.value)}
                  placeholder="Kullanıcı Adı"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <input
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="E-posta"
                  className="w-full px-4 py-3 rounded-xl bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <input
                  type="password"
                  onChange={(e) => setSifre(e.target.value)}
                  required
                  placeholder="Şifre"
                  className="w-full px-4 py-3 rounded-xl bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 transition text-white font-semibold"
                >
                  Kayıt Ol
                </button>
              </form>

              <p className="text-gray-400 text-sm mt-6 text-center">
                Zaten hesabın var mı?{" "}
                <button
                  onClick={() => setMode("login")}
                  className="text-indigo-400 hover:underline"
                >
                  Giriş Yap
                </button>
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
