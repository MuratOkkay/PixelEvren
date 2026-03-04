<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Content-Type: application/json; charset=utf-8");

require_once "conn.php";

$stmt = $conn->query("SELECT baslik, icerik, resim, resim2, resim3, btn1, btn2 FROM hero LIMIT 1");
$data = $stmt->fetch(PDO::FETCH_ASSOC);

echo json_encode($data);

?>