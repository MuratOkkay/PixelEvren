<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Content-Type: application/json; charset=utf-8");

require_once "conn.php";

$stmt = $conn->query("SELECT id, kullanici_adi, email, sifre, rol, tarih FROM uyeler ORDER BY id DESC ");
$data = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($data);

?>