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


$baslik = $_POST['baslik'] ?? null;
$kategori = $_POST['kategori'] ?? null;
$forum_sahibi = $_POST['forum_sahibi'] ?? null;




/* 🔽 İnsert */
try {
    $stmt = $conn->prepare("
        INSERT INTO  forumlar
        SET baslik = ?, kategori = ?, forum_sahibi = ?, tarih = ?    
    ");

    $stmt->execute([$baslik, $kategori, $forum_sahibi, date('d-m-Y H:i:s')]);

    echo json_encode([
        "status" => "success",
        "message" => "Forum başarıyla oluşturuldu. ✅"
    ]);
} catch (PDOException $e) {
    echo json_encode([
        "status" => "error",
        "message" => "DB Hatası: " . $e->getMessage()
    ]);
}