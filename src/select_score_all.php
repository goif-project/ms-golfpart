<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');

//  DB接続
require_once('db_connect.php');

$stmt = $pdo->prepare("SELECT * FROM total_score ORDER BY total_score_id ASC");
$stmt->execute();
$result = $stmt->fetchAll();
//$resurt = $stmt->fetchAll();
$param = array("list" => $result);
echo json_encode($param);

?>
