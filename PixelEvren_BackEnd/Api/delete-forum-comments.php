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

$stmt = $conn->prepare("SELECT forum_id, yorum, yorum_sahibi, begeni, tarih FROM forum_yorumlar WHERE id = ?");
$stmt->execute([$id]);
$data = $stmt->fetch(PDO::FETCH_ASSOC);

if (!$data) {
    echo json_encode([
        "status" => "error",
        "message" => "Kayıt bulunamadı"
    ]);
    exit;
}


$delete = $conn->prepare("DELETE FROM forum_yorumlar WHERE id = ?");
$delete->execute([$id]);

echo json_encode([
    "status" => "success",
    "message" => "Forum yorumu başarıyla silindi"
]);
?>