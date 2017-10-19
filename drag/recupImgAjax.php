<?php
require 'connexion.php';
    $tabImg=[];
    $req = $bdd->query('SELECT chemin_img FROM images');
    while($res = $req->fetch(PDO::FETCH_NUM )){
        $tabImg[count($tabImg)] = $res;
    } 
echo json_encode($tabImg);