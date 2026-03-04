# 🚀 PixelEvren

🎮 **PixelEvren**, blog ve forum sistemini bir araya getiren modern bir full-stack içerik platformudur.  
Kullanıcılar kayıt olup giriş yapabilir, blog yazılarını okuyabilir ve forum tartışmalarına katılabilir.  
Site sahibi ise admin paneli üzerinden içerik ve kullanıcı yönetimini gerçekleştirebilir.

---

## 📸 Proje Önizleme

| 🏠 Ana Sayfa | 📰 Blog Bölümü |
| :----------: | :------------: |
| ![Ana Sayfa](PixelEvren_FrontEnd/assets/Gösterim/Home.png) | ![Blog](PixelEvren_FrontEnd/assets/Gösterim/Blog.png) |

| 💬 Forum Bölümü | 🛠 Admin Paneli |
| :-------------: | :-------------: |
| ![Forum](PixelEvren_FrontEnd/assets/Gösterim/Forum.png) | ![Admin](PixelEvren_FrontEnd/assets/Gösterim/Admin.png) |

---

## 🌐 Özellikler

### 👤 Kullanıcı Tarafı

- Kullanıcı kayıt & giriş sistemi
- Blog içeriklerini görüntüleme
- Forum başlıklarını listeleme
- Kategori bazlı içerik sistemi
- Responsive ve animasyonlu arayüz

### 🛠 Admin Paneli

- Blog ekleme / düzenleme / silme
- İçerik yönetimi
- Kullanıcıları görüntüleme
- Site içeriğini kontrol edebilme

---

## 🧠 Bu Projede Neler Öğrendim?

Bu proje backend dünyasına geçiş yaptığım ilk full-stack çalışmamdır.

Projede şunları öğrendim:

- PHP ile temel backend mantığı
- React frontend ile PHP backend entegrasyonu
- Form işlemleri (POST / GET)
- SQL veritabanı bağlantısı
- Veritabanından veri çekme (SELECT)
- CRUD işlemleri
- Basit admin panel mimarisi

> React frontend ile PHP backend’i birlikte kullanarak full-stack çalışma pratiği kazandım.

---

## 💻 Kullanılan Teknolojiler

### 🎨 Frontend

- React 19
- React Router DOM
- Tailwind CSS 4
- Framer Motion
- GSAP
- Three.js
- AOS
- React Icons
- Vite

### ⚙️ Backend

- PHP (Vanilla PHP)
- MySQL
- WampServer

---

## 📂 Proje Yapısı

Proje iki ana bölümden oluşmaktadır:

1.  **`PixelEvren_FrontEnd`**: React tabanlı modern kullanıcı arayüzü.
2.  **`PHP_Backend`**: API işlemleri, veritabanı bağlantıları ve CRUD operasyonları.

> [!IMPORTANT]
> **Not:** Backend PHP dosya yapısı daha modüler hale getirilebilir (Controller / Model / Config ayrımı yapılabilir). Bu proje öğrenme sürecimin bir parçasıdır ve geliştirmeye açıktır.

---

## ⚙️ Kurulum ve Çalıştırmaa

### 1️⃣ Frontend Kurulumu

```bash
# Proje dizinine gidin
cd PixelEvren_FrontEnd

# Bağımlılıkları yükleyin
npm install

# Projeyi başlatın
npm run dev

2️⃣ Backend Kurulumu
WampServer veya benzeri bir lokal sunucuyu başlatın.

PHP_Backend klasöründeki dosyaları sunucunuzun www  dizinine taşıyın.

MySQL üzerinde veritabanınızı oluşturun.

Veritabanı bağlantı ayarlarını (host, db_name, user, pass) ilgili PHP dosyasından güncelleyin.

📈 Geliştirme Fikirleri

JWT tabanlı authentication

RESTful API yapısı

MVC mimarisine geçiş

Admin panel UI geliştirmeleri

Gerçek zamanlı forum sistemi (WebSocket)

👨‍💻 Geliştirici
Murat Okkay – Frontend Developer
```
