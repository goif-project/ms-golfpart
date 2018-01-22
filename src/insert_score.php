<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');

//  DB接続
require_once('db_connect.php');

//  jsonの中身を格納
$userName  = isset($_POST["userName"]) ? $_POST["userName"] : "";
$userScore = isset($_POST["userScore"]) ? $_POST["userScore"] : "";

$id = NULL;

/* -----INSESRT----- */
$stmt = $pdo -> prepare("INSERT INTO total_score(total_score_id, score, user_name) VALUES (:total_score_id, :score, :user_name)");
$stmt->bindParam(':total_score_id', $id, PDO::PARAM_INT);
$stmt->bindParam(':score', $userScore, PDO::PARAM_INT);
$stmt->bindParam(':user_name', $userName, PDO::PARAM_STR);

$stmt->execute();

echo json_encode($userName);
?>
