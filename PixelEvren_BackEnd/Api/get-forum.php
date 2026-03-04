<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Content-Type: application/json; charset=utf-8");

require_once "conn.php";

$stmt = $conn->prepare("
    SELECT 
        f.id,
        f.baslik,
        f.kategori,
        f.forum_sahibi,
        f.tarih,
        COUNT(y.id) AS yorum_sayisi
    FROM forumlar f
    LEFT JOIN forum_yorumlar y ON y.forum_id = f.id
    GROUP BY f.id
    ORDER BY f.id DESC
");

$stmt->execute();
$data = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($data);
