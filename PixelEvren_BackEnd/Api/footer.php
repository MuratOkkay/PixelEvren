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
$stmt = $conn->query("SELECT baslik, tanitim, logo, instagram, facebook, twitter, youtube FROM footer WHERE id = 1");
$current = $stmt->fetch(PDO::FETCH_ASSOC);

$baslik = !empty($_POST['baslik']) ? $_POST['baslik'] : $current['baslik'];
$tanitim = !empty($_POST['tanitim']) ? $_POST['tanitim'] : $current['tanitim'];

$logoPath = $current['logo'] ?? null;
$instagram = !empty($_POST['instagram']) ? $_POST['instagram'] : $current['instagram'];
$facebook = !empty($_POST['facebook']) ? $_POST['facebook'] : $current['facebook'];
$twitter = !empty($_POST['twitter']) ? $_POST['twitter'] : $current['twitter'];
$youtube = !empty($_POST['youtube']) ? $_POST['youtube'] : $current['youtube'];

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


/* 🔽 UPDATE */
try {
    $stmt = $conn->prepare("
        UPDATE footer 
        SET baslik = ?, tanitim = ?, logo = ?, instagram = ?, facebook = ?, twitter = ?, youtube = ?
       where id = 1
    ");

    $stmt->execute([$baslik, $tanitim, $logoPath, $instagram, $facebook, $twitter, $youtube]);

    echo json_encode([
        "status" => "success",
        "message" => "Footer ayarları başarıyla güncellendi ✅"
    ]);
} catch (PDOException $e) {
    echo json_encode([
        "status" => "error",
        "message" => "DB Hatası: " . $e->getMessage()
    ]);
}