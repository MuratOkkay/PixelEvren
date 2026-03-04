<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "pixelevren";
try {
    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        "status" => "error",
        "message" => "Veritabanı bağlantı hatası"
    ]);
    exit;
}

