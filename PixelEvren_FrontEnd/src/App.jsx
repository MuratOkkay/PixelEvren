import "./App.css";
import { Routes, Route } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import HNavbar from "./component/Home/HNavbar";
import HHero from "./component/Home/HHero";
import BlogTrending from "./component/Home/BlogTrending";
import PrivievForum from "./component/Home/PreviewForum";
import DotGrid from "../src/component/Background/DotGrid";
import { useEffect } from "react";
import Team from "./component/Home/Team";
import Communication from "./component/Home/Communication";
import Galery from "./component/Home/Galery";
import Footer from "./component/Home/Footer";
import BHero from "./component/Blog/BHero";
import Login from "./component/Home/Login";
import BlogContent from "./component/Blog/BlogContent";
import Forum from "./component/Forum/Forum";
import ForumDetail from "./component/Forum/ForumDetail";
import Galery2 from "./component/Home/Galery2";
import Admin from "./component/Admin/Admin";
import Navbar from "./component/Admin/Navbar";
import SiteSettings from "./component/Admin/SiteSettings";
import FooterSettings from "./component/Admin/FooterSettings";
import HeroSettings from "./component/Admin/HeroSettings";
import ProtectedRoute from "./component/ProtectedRoute";

function App() {
  useEffect(() => {
    AOS.init({
      duration: 800, // animasyon süresi (ms)
      once: true, // sadece bir kez çalışsın
      offset: 100, // scroll mesafesi
    });
  }, []);

  return (
    <>
      <Routes>
        {/* Ana Sayfa */}
        <Route
          path="/"
          element={
            <>
              <HNavbar />
              <HHero />
              <div className="arkaplan relative w-full overflow-hidden bg-gray-900 min-h-screen">
                <div className="absolute inset-0 z-0 h-full w-full">
                  <DotGrid
                    dotSize={2}
                    gap={25}
                    baseColor="black"
                    activeColor="#B58C22"
                    proximity={150}
                    shockRadius={250}
                    shockStrength={5}
                    resistance={750}
                    returnDuration={1.5}
                  />
                </div>
                <BlogTrending />
                <PrivievForum />
                <Team />
                <Communication />
                <Galery />
              </div>
              <Footer />
            </>
          }
        />

        {/* Blog Sayfası */}
        <Route
          path="/blog"
          element={
            <>
              <HNavbar />
              <div className="arkaplan relative w-full overflow-hidden bg-gray-900 min-h-screen">
                <div className="absolute inset-0 z-0 h-full w-full">
                  <DotGrid
                    dotSize={2}
                    gap={25}
                    baseColor="black"
                    activeColor="#B58C22"
                    proximity={150}
                    shockRadius={250}
                    shockStrength={5}
                    resistance={750}
                    returnDuration={1.5}
                  />
                </div>
                <BHero />
                <Galery2 />
              </div>
              <Footer />
            </>
          }
        />
        {/* Blog İçeriği */}
        <Route
          path="/BlogContent/:id"
          element={
            <>
              <HNavbar />
              <div className="arkaplan relative w-full overflow-hidden bg-gray-900 min-h-screen">
                <div className="absolute inset-0 z-0 h-full w-full">
                  <DotGrid
                    dotSize={2}
                    gap={25}
                    baseColor="black"
                    activeColor="#B58C22"
                    proximity={150}
                    shockRadius={250}
                    shockStrength={5}
                    resistance={750}
                    returnDuration={1.5}
                  />
                </div>
                <BlogContent />
                <Galery2 />
              </div>
              <Footer />
            </>
          }
        />
        {/* Forum Sayfası */}
        <Route
          path="/forum"
          element={
            <>
              <HNavbar />
              <div className="arkaplan relative w-full overflow-hidden bg-gray-900 min-h-screen">
                <div className="absolute  inset-0 z-0 h-full w-full">
                  <DotGrid
                    dotSize={2}
                    gap={25}
                    baseColor="black"
                    activeColor="#B58C22"
                    proximity={150}
                    shockRadius={250}
                    shockStrength={5}
                    resistance={750}
                    returnDuration={1.5}
                  />
                </div>
                <ProtectedRoute>
                  <Forum />
                </ProtectedRoute>
                <Galery2 />
              </div>
              <Footer />
            </>
          }
        />
        {/* Forum İçceiği */}
        <Route
          path="/ForumDetail/:id"
          element={
            <>
              <HNavbar />
              <div className="arkaplan relative w-full overflow-hidden bg-gray-900 min-h-screen">
                <div className="absolute inset-0 z-0 h-full w-full">
                  <DotGrid
                    dotSize={2}
                    gap={25}
                    baseColor="black"
                    activeColor="#B58C22"
                    proximity={150}
                    shockRadius={250}
                    shockStrength={5}
                    resistance={750}
                    returnDuration={1.5}
                  />
                </div>
                <ProtectedRoute>
                  <ForumDetail />
                </ProtectedRoute>
                <Galery2 />
              </div>
              <Footer />
            </>
          }
        />
        {/* Login Sayfası */}
        <Route
          path="/login"
          element={
            <>
              <HNavbar />
              <div className="arkaplan relative w-full overflow-hidden bg-gray-900 min-h-screen">
                <div className="absolute  inset-0 z-0 h-full w-full">
                  <DotGrid
                    dotSize={2}
                    gap={25}
                    baseColor="black"
                    activeColor="#B58C22"
                    proximity={150}
                    shockRadius={250}
                    shockStrength={5}
                    resistance={750}
                    returnDuration={1.5}
                  />
                </div>
                <Login />
              </div>
              <Footer />
            </>
          }
        />
        {/* Admin Sayfası */}
        <Route
          path="/admin"
          element={
            <>
              <Navbar />
              <div className=" relative w-full overflow-hidden bg-[#F5F5F5 ] min-h-screen">
                <AdminRoute>
                  <Admin />
                </AdminRoute>
              </div>
            </>
          }
        />
        {/* Admin Sayfası Bölümleri */}
        <Route
          path="/admin/siteayarlari"
          element={
            <>
              <Navbar />
              <div className=" relative w-full overflow-hidden bg-[#F5F5F5 ] min-h-screen">
                <AdminRoute>
                  <SiteSettings />
                </AdminRoute>
              </div>
            </>
          }
        />
        <Route
          path="/admin/footerayarlari"
          element={
            <>
              <Navbar />
              <div className=" relative w-full overflow-hidden bg-[#F5F5F5 ] min-h-screen">
                <AdminRoute>
                  <FooterSettings />
                </AdminRoute>
              </div>
            </>
          }
        />
        <Route
          path="/admin/heroayarlari"
          element={
            <>
              <Navbar />
              <div className=" relative w-full overflow-hidden bg-[#F5F5F5 ] min-h-screen">
                <AdminRoute>
                  <HeroSettings />
                </AdminRoute>
              </div>
            </>
          }
        />
        <Route
          path="/admin/galeriayarlari"
          element={
            <>
              <Navbar />
              <div className=" relative w-full overflow-hidden bg-[#F5F5F5 ] min-h-screen">
                <AdminRoute>
                  <GalerySettings />
                </AdminRoute>
              </div>
            </>
          }
        />
        <Route
          path="/admin/blogekle"
          element={
            <>
              <Navbar />
              <div className=" relative w-full overflow-hidden bg-[#F5F5F5 ] min-h-screen">
                <AdminRoute>
                  <BlogAdd />
                </AdminRoute>
              </div>
            </>
          }
        />
        <Route
          path="/admin/blogdüzenle"
          element={
            <>
              <Navbar />
              <div className=" relative w-full overflow-hidden bg-[#F5F5F5 ] min-h-screen">
                <AdminRoute>
                  <BlogEdit />
                </AdminRoute>
              </div>
            </>
          }
        />
        <Route
          path="/admin/blogdüzenle/icerik/:id"
          element={
            <>
              <Navbar />
              <div className=" relative w-full overflow-hidden bg-[#F5F5F5 ] min-h-screen">
                <AdminRoute>
                  <BlogContentsEdit />
                </AdminRoute>
              </div>
            </>
          }
        />
        <Route
          path="/admin/blogkategoriler"
          element={
            <>
              <Navbar />
              <div className=" relative w-full overflow-hidden bg-[#F5F5F5 ] min-h-screen">
                <AdminRoute>
                  <BlogCategories />
                </AdminRoute>
              </div>
            </>
          }
        />
        <Route
          path="/admin/forumdüzenle"
          element={
            <>
              <Navbar />
              <div className=" relative w-full overflow-hidden bg-[#F5F5F5 ] min-h-screen">
                <AdminRoute>
                  <ForumEdit />
                </AdminRoute>
              </div>
            </>
          }
        />
        <Route
          path="/admin/forumkategoriler"
          element={
            <>
              <Navbar />
              <div className=" relative w-full overflow-hidden bg-[#F5F5F5 ] min-h-screen">
                <AdminRoute>
                  <ForumCategories />
                </AdminRoute>
              </div>
            </>
          }
        />
        <Route
          path="/admin/forumyorumlari"
          element={
            <>
              <Navbar />
              <div className=" relative w-full overflow-hidden bg-[#F5F5F5 ] min-h-screen">
                <AdminRoute>
                  <ForumComments />
                </AdminRoute>
              </div>
            </>
          }
        />
        <Route
          path="/admin/uyeler"
          element={
            <>
              <Navbar />
              <div className=" relative w-full overflow-hidden bg-[#F5F5F5 ] min-h-screen">
                <AdminRoute>
                  <Members />
                </AdminRoute>
              </div>
            </>
          }
        />
        <Route
          path="/admin/mesajlar"
          element={
            <>
              <Navbar />
              <div className=" relative w-full overflow-hidden bg-[#F5F5F5 ] min-h-screen">
                <AdminRoute>
                  <Messages />
                </AdminRoute>
              </div>
            </>
          }
        />
        <Route
          path="/admin/loglar"
          element={
            <>
              <Navbar />
              <div className=" relative w-full overflow-hidden bg-[#F5F5F5 ] min-h-screen"></div>
            </>
          }
        />
      </Routes>
    </>
  );
}
import GalerySettings from "./component/Admin/GalerySettings";
import BlogAdd from "./component/Admin/BlogAdd";
import BlogCategories from "./component/Admin/BlogCategories";
import ForumCategories from "./component/Admin/ForumCategories";
import BlogEdit from "./component/Admin/BlogEdit";
import BlogContentsEdit from "./component/Admin/BlogContentsEdit";
import Messages from "./component/Admin/Messages";
import AdminRoute from "./component/AdminRoute";
import Members from "./component/Admin/Members";
import ForumEdit from "./component/Admin/ForumEdit";
import ForumComments from "./component/Admin/ForumComments";
export default App;
