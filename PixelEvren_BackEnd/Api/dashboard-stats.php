<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Content-Type: application/json; charset=utf-8");

require_once "conn.php";

$response = [];

// Blog sayısı
$stmt = $conn->query("SELECT COUNT(*) AS total FROM bloglar");
$response['blog'] = $stmt->fetch(PDO::FETCH_ASSOC)['total'];

// Forum sayısı
$stmt = $conn->query("SELECT COUNT(*) AS total FROM forumlar");
$response['forum'] = $stmt->fetch(PDO::FETCH_ASSOC)['total'];

// Yorum sayısı
$stmt = $conn->query("SELECT COUNT(*) AS total FROM forum_yorumlar");
$response['yorum'] = $stmt->fetch(PDO::FETCH_ASSOC)['total'];

// Üye sayısı
$stmt = $conn->query("SELECT COUNT(*) AS total FROM uyeler");
$response['uye'] = $stmt->fetch(PDO::FETCH_ASSOC)['total'];

echo json_encode($response);
