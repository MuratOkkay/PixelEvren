<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

require_once "conn.php";

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(200);
    exit;
}

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    echo json_encode(["status" => "error", "message" => "Geçersiz istek"]);
    exit;
}

$email = $_POST["email"] ?? "";
$sifre = $_POST["sifre"] ?? "";

if ($email === "" || $sifre === "") {
    echo json_encode(["status" => "error", "message" => "Tüm alanlar zorunlu"]);
    exit;
}

$stmt = $conn->prepare("SELECT * FROM uyeler WHERE email = ?");
$stmt->execute([$email]);
$user = $stmt->fetch();

if (!$user) {
    echo json_encode(["status" => "error", "message" => "Kullanıcı bulunamadı"]);
    exit;
}

if (!password_verify($sifre, $user["sifre"])) {
    echo json_encode(["status" => "error", "message" => "Şifre hatalı"]);
    exit;
}

echo json_encode([
    "status" => "success",
    "message" => "Giriş başarılı",
    "user" => [
        "id" => $user["id"],
        "kullaniciAdi" => $user["kullanici_adi"],
        "email" => $user["email"],
        "role" => $user["rol"]
    ]
]);
