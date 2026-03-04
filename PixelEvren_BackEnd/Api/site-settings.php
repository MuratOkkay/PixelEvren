<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/json; charset=utf-8');

require_once "conn.php";

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(["status" => "error", "message" => "Geçersiz istek"]);
    exit;
}

/* 🔽 MEVCUT AYARLAR */
$stmt = $conn->query("SELECT baslik, aciklama, logo, icon FROM site_ayarlar WHERE id = 0");
$current = $stmt->fetch(PDO::FETCH_ASSOC);

$baslik = !empty($_POST['baslik']) ? $_POST['baslik'] : $current['baslik'];
$aciklama = !empty($_POST['aciklama']) ? $_POST['aciklama'] : $current['aciklama'];

$logoPath = $current['logo'] ?? null;
$iconPath = $current['icon'] ?? null;

/* 🔽 UPLOAD KLASÖRÜ */
$uploadDir = "../uploads/";
if (!is_dir($uploadDir)) {
    mkdir($uploadDir, 0777, true);
}

/* 🔽 LOGO */
if (!empty($_FILES['logo']['name'])) {
    $logoName = time() . "_logo_" . basename($_FILES['logo']['name']);
    $logoTarget = $uploadDir . $logoName;

    if (move_uploaded_file($_FILES['logo']['tmp_name'], $logoTarget)) {
        $logoPath = "uploads/" . $logoName;
    }
}

/* 🔽 ICON */
if (!empty($_FILES['icon']['name'])) {
    $iconName = time() . "_icon_" . basename($_FILES['icon']['name']);
    $iconTarget = $uploadDir . $iconName;

    if (move_uploaded_file($_FILES['icon']['tmp_name'], $iconTarget)) {
        $iconPath = "uploads/" . $iconName;
    }
}

/* 🔽 UPDATE */
try {
    $stmt = $conn->prepare("
        UPDATE site_ayarlar 
        SET baslik = ?, aciklama = ?, logo = ?, icon = ?
        WHERE id = 0
    ");

    $stmt->execute([$baslik, $aciklama, $logoPath, $iconPath]);

    echo json_encode([
        "status" => "success",
        "message" => "Site ayarları başarıyla güncellendi ✅"
    ]);
} catch (PDOException $e) {
    echo json_encode([
        "status" => "error",
        "message" => "DB Hatası: " . $e->getMessage()
    ]);
}