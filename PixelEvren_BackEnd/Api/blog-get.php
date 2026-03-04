<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Content-Type: application/json; charset=utf-8");

require_once "conn.php";

if (!isset($_GET["id"])) {
    echo json_encode([
        "status" => "error",
        "message" => "ID eksik"
    ]);
    exit;
}

$id = intval($_GET["id"]);

$sql = $conn->prepare("SELECT * FROM bloglar WHERE id = ?");
$sql->execute([$id]);
$data = $sql->fetch(PDO::FETCH_ASSOC);

if (!$data) {
    echo json_encode([
        "status" => "error",
        "message" => "Blog bulunamadı"
    ]);
    exit;
}

echo json_encode([
    "status" => "success",
    "data" => $data
]);
