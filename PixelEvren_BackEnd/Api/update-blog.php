<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Content-Type: application/json; charset=utf-8");

require_once "conn.php";

$id = $_POST['id'] ?? null;
if (!$id) {
    echo json_encode(["status" => "error", "message" => "ID eksik"]);
    exit;
}

$kategori = $_POST['kategori'] ?? '';
$baslik = $_POST['baslik'] ?? '';
$icerikbaslik = $_POST['icerikbaslik'] ?? '';
$aciklama = $_POST['aciklama'] ?? '';
$icerik1 = $_POST['icerik1'] ?? '';
$icerik2 = $_POST['icerik2'] ?? '';
$icerik3 = $_POST['icerik3'] ?? '';
$icerik4 = $_POST['icerik4'] ?? '';
$blogsoz = $_POST['blogsoz'] ?? '';

/* 🔥 ESKİ RESMİ AL */
$stmt = $conn->prepare("SELECT resim FROM bloglar WHERE id = ?");
$stmt->execute([$id]);
$oldBlog = $stmt->fetch(PDO::FETCH_ASSOC);
$oldImage = $oldBlog['resim'] ?? null;

/* 🔥 YENİ RESİM VAR MI? */
$resimPath = $oldImage;

if (!empty($_FILES['resim']['name'])) {

    $uploadDir = "../uploads/blog/";
    if (!is_dir($uploadDir)) {
        mkdir($uploadDir, 0777, true);
    }

    $ext = pathinfo($_FILES['resim']['name'], PATHINFO_EXTENSION);
    $newName = uniqid("blog_", true) . "." . $ext;
    $targetPath = $uploadDir . $newName;

    if (move_uploaded_file($_FILES['resim']['tmp_name'], $targetPath)) {
        // eski resmi sil
        if ($oldImage && file_exists("../" . $oldImage)) {
            unlink("../" . $oldImage);
        }

        $resimPath = "uploads/blog/" . $newName;
    }
}

/* 🔥 UPDATE */
$stmt = $conn->prepare("
  UPDATE bloglar SET
    baslik = ?,
    aciklama = ?,
    icerikbaslik = ?,
    icerik1 = ?,
    icerik2 = ?,
    icerik3 = ?,
    icerik4 = ?,
    blogsoz = ?,
    kategori = ?,
    resim = ?
  WHERE id = ?
");

$ok = $stmt->execute([
    $baslik,
    $aciklama,
    $icerikbaslik,
    $icerik1,
    $icerik2,
    $icerik3,
    $icerik4,
    $blogsoz,
    $kategori,
    $resimPath,
    $id
]);

echo json_encode([
    "status" => $ok ? "success" : "error",
    "message" => $ok ? "Blog güncellendi" : "Güncelleme başarısız"
]);
