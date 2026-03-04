<?php
ini_set('display_errors', 0);
error_reporting(E_ALL);

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/json');


require_once "conn.php";

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(["status" => "error", "message" => "Geçersiz istek"]);
    exit;
}

/* 🔽 MEVCUT AYARLAR */
$stmt = $conn->query("SELECT baslik, icerik, resim, resim2, resim3, btn1, btn2 FROM hero WHERE id = 1");
$current = $stmt->fetch(PDO::FETCH_ASSOC);

$baslik = !empty($_POST['baslik']) ? $_POST['baslik'] : $current['baslik'];
$icerik = !empty($_POST['icerik']) ? $_POST['icerik'] : $current['icerik'];
$btn1 = !empty($_POST['btn1']) ? $_POST['btn1'] : $current['btn1'];
$btn2 = !empty($_POST['btn2']) ? $_POST['btn2'] : $current['btn2'];
$resimPath = $current['resim'] ?? null;
$resim2Path = $current['resim2'] ?? null;
$resim3Path = $current['resim3'] ?? null;


/* 🔽 UPLOAD KLASÖRÜ */
$uploadDir = "../uploads/hero/";
if (!is_dir($uploadDir)) {
    mkdir($uploadDir, 0777, true);
}

/* 🔽 RESİMLER */
if (!empty($_FILES['resim']['name'])) {
    $resimName = time() . "_resim_" . basename($_FILES['resim']['name']);
    $resimTarget = $uploadDir . $resimName;

    if (move_uploaded_file($_FILES['resim']['tmp_name'], $resimTarget)) {
        $resimPath = "uploads/hero/" . $resimName;
    }
}
if (!empty($_FILES['resim2']['name'])) {
    $resim2Name = time() . "_resim2_" . basename($_FILES['resim2']['name']);
    $resim2Target = $uploadDir . $resim2Name;

    if (move_uploaded_file($_FILES['resim2']['tmp_name'], $resim2Target)) {
        $resim2Path = "uploads/hero/" . $resim2Name;
    }
}
if (!empty($_FILES['resim3']['name'])) {
    $resim3Name = time() . "_resim3_" . basename($_FILES['resim3']['name']);
    $resim3Target = $uploadDir . $resim3Name;

    if (move_uploaded_file($_FILES['resim3']['tmp_name'], $resim3Target)) {
        $resim3Path = "uploads/hero/" . $resim3Name;
    }
}


/* 🔽 UPDATE */

try {
    $stmt = $conn->prepare("
        UPDATE hero 
        SET baslik = ?, icerik = ?, resim = ?, resim2 = ?, resim3 = ?, btn1 = ?, btn2 = ?
       where id = 1
    ");

    $stmt->execute([$baslik, $icerik, $resimPath, $resim2Path, $resim3Path, $btn1, $btn2]);
    echo json_encode([
        "status" => "success",
        "message" => "Hero ayarları başarıyla güncellendi ✅"
    ]);

} catch (PDOException $e) {
    echo json_encode([
        "status" => "error",
        "message" => "DB Hatası: " . $e->getMessage()
    ]);
}

