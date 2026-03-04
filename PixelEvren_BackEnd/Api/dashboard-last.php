<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Content-Type: application/json; charset=utf-8");

require_once "conn.php";

$data = [];


$stmt = $conn->query("
    SELECT id, baslik, aciklama, icerikbaslik, icerik1, icerik2, icerik3, icerik4, blogsoz, resim, kategori, tarih
    FROM bloglar
    ORDER BY id DESC
    LIMIT 5
");
$data['bloglar'] = $stmt->fetchAll(PDO::FETCH_ASSOC);


$stmt = $conn->query("
    SELECT id, baslik, kategori, forum_sahibi, tarih
    FROM forumlar
    ORDER BY id DESC
    LIMIT 5
");
$data['forumlar'] = $stmt->fetchAll(PDO::FETCH_ASSOC);


$stmt = $conn->query("
    SELECT id, kullanici_adi, tarih
    FROM uyeler
    ORDER BY id DESC
    LIMIT 5
");
$data['uyeler'] = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($data);
