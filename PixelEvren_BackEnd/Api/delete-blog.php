<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

require_once "conn.php";

if (!isset($_POST['id'])) {
    echo json_encode([
        "status" => "error",
        "message" => "ID eksik"
    ]);
    exit;
}

$id = intval($_POST['id']);

$stmt = $conn->prepare("SELECT baslik, aciklama, icerikbaslik, icerik1, icerik2, icerik3, icerik4, blogsoz, resim, kategori, tarih FROM bloglar WHERE id = ?");
$stmt->execute([$id]);
$data = $stmt->fetch(PDO::FETCH_ASSOC);

if (!$data) {
    echo json_encode([
        "status" => "error",
        "message" => "Kayıt bulunamadı"
    ]);
    exit;
}
$categories = $data['kategori'];

$delete = $conn->prepare("DELETE FROM bloglar WHERE id = ?");
$delete->execute([$id]);

echo json_encode([
    "status" => "success",
    "message" => "Blog  başarıyla silindi"
]);
?>