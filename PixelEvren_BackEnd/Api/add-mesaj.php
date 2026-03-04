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


$mesaj = $_POST['mesaj'] ?? '';




/* 🔽 İnsert */
try {
    $stmt = $conn->prepare("
        INSERT INTO  mesajlar
        SET mesaj = ?, tarih = ?    
    ");

    $stmt->execute([$mesaj, date('d-m-Y H:i:s')]);

    echo json_encode([
        "status" => "success",
        "message" => "Mesaj başarıyla gönderildi. ✅"
    ]);
} catch (PDOException $e) {
    echo json_encode([
        "status" => "error",
        "message" => "DB Hatası: " . $e->getMessage()
    ]);
}