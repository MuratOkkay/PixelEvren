<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Content-Type: application/json; charset=utf-8");

require_once "conn.php";
$forum_id = $_GET['forum_id'] ?? 0;
$stmt = $conn->prepare("SELECT id, forum_id, yorum, yorum_sahibi, begeni, tarih FROM forum_yorumlar WHERE forum_id = ? ORDER BY id DESC");
$stmt->execute([$forum_id]);
$data = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($data);

?>