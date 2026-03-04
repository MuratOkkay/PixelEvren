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


$resimPath = $_POST['resim'] ?? null;


/* 🔽 UPLOAD KLASÖRÜ */
$uploadDir = "../uploads/galery/";
if (!is_dir($uploadDir)) {
    mkdir($uploadDir, 0777, true);
}

/* 🔽 RESİM */
if (!empty($_FILES['resim']['name'])) {
    $resimName = time() . "_resim_" . basename($_FILES['resim']['name']);
    $resimTarget = $uploadDir . $resimName;

    if (move_uploaded_file($_FILES['resim']['tmp_name'], $resimTarget)) {
        $resimPath = "uploads/galery/" . $resimName;
    }
}



/* 🔽 UPDATE */
try {
    $stmt = $conn->prepare("
        INSERT INTO galery 
        SET resim = ?
       
    ");

    $stmt->execute([$resimPath]);

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