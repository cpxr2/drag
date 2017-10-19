<?php
require 'connexion.php';
    $tabImg=[];
    $req = $bdd->query('SELECT chemin_img FROM images');
    while($res = $req->fetch()){
        $tabImg[count($tabImg)] = $res;
    } 
echo json_encode($tabImg);