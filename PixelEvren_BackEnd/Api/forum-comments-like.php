<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Content-Type: application/json; charset=utf-8");

require_once "conn.php";

$id = $_POST['id'];

$stmt = $conn->prepare("
  UPDATE forum_yorumlar
  SET begeni = begeni + 1
  WHERE id = ?
");
$stmt->execute([$id]);

echo json_encode(["status" => "success"]);
