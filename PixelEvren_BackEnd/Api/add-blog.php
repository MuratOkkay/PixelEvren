<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/json; charset=utf-8');

require_once "conn.php";
date_default_timezone_set('Europe/Istanbul');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(["status" => "error", "message" => "Geçersiz istek"]);
    exit;
}

/* 🔽 MEVCUT AYARLAR */


$selectedCategory = $_POST['kategori'] ?? '';
$baslik = $_POST['baslik'] ?? '';
$icerikbaslik = $_POST['icerikbaslik'] ?? '';
$resim = $_POST['resim'] ?? null;
$aciklama = $_POST['aciklama'] ?? '';
$icerik1 = $_POST['icerik1'] ?? '';
$icerik2 = $_POST['icerik2'] ?? '';
$icerik3 = $_POST['icerik3'] ?? '';
$icerik4 = $_POST['icerik4'] ?? '';
$blogsoz = $_POST['blogsoz'] ?? '';


/* 🔽 UPLOAD KLASÖRÜ */
$uploadDir = "../uploads/blog/";
if (!is_dir($uploadDir)) {
    mkdir($uploadDir, 0777, true);
}

/* 🔽 RESİM */
if (!empty($_FILES['resim']['name'])) {
    $resimName = time() . "_resim_" . basename($_FILES['resim']['name']);
    $resimTarget = $uploadDir . $resimName;

    if (move_uploaded_file($_FILES['resim']['tmp_name'], $resimTarget)) {
        $resimPath = "uploads/blog/" . $resimName;
    }
}


/* 🔽 İnsert */
try {
    $stmt = $conn->prepare("
        INSERT INTO  bloglar
        SET kategori = ?, baslik = ?, icerikbaslik = ?, resim = ?, aciklama = ?, icerik1 = ?, icerik2 = ?, icerik3 = ?, icerik4 = ?, blogsoz = ?, tarih = ?    
    ");

    $stmt->execute([$selectedCategory, $baslik, $icerikbaslik, $resimPath, $aciklama, $icerik1, $icerik2, $icerik3, $icerik4, $blogsoz, date('d-m-Y H:i:s')]);

    echo json_encode([
        "status" => "success",
        "message" => "Blog kategorileri başarıyla eklendi ✅"
    ]);
} catch (PDOException $e) {
    echo json_encode([
        "status" => "error",
        "message" => "DB Hatası: " . $e->getMessage()
    ]);
}