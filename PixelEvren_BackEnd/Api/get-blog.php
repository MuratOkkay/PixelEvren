<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Content-Type: application/json; charset=utf-8");

require_once "conn.php";

$stmt = $conn->query("SELECT id, baslik, icerikbaslik, resim, aciklama, icerik1, icerik2, icerik3, icerik4, blogsoz, kategori, tarih FROM bloglar ORDER BY id DESC");
$data = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($data);

?>