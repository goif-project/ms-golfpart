<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');

// tryにPDOの処理を記述
try {
    // データベースに接続するために必要なデータソースを変数に格納
    $dsn = 'mysql:host=mysql328.db.sakura.ne.jp;dbname=mayomayooo_golf;charset=utf8';
    $username = 'mayomayooo';
    $password = '05110902postja';

    // PDOインスタンスを生成
    $pdo = new PDO($dsn,$username,$password);

// エラー（例外）が発生した時の処理を記述
} catch (PDOException $e) {
    // 強制終了
    exit;
}
?>
