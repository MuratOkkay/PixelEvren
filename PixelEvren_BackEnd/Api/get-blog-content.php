<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Content-Type: application/json; charset=utf-8");

require_once "conn.php";

$id = intval($_GET["id"]);

$stmt = $conn->prepare("
  SELECT id, baslik, icerikbaslik, resim, aciklama,
         icerik1, icerik2, icerik3, icerik4,
         blogsoz, kategori, tarih
  FROM bloglar
  WHERE id = ?
");

$stmt->execute([$id]);

$data = $stmt->fetch(PDO::FETCH_ASSOC);

echo json_encode($data);
