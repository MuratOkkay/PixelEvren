<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Content-Type: application/json; charset=utf-8");

require_once "conn.php";
$id = $_GET['id'] ?? 0;
$stmt = $conn->prepare("SELECT id, baslik, kategori, forum_sahibi, tarih FROM forumlar WHERE id = ? ORDER BY id DESC");
$stmt->execute([$id]);
$data = $stmt->fetch(PDO::FETCH_ASSOC);

echo json_encode($data);

?>