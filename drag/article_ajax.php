<?php

require 'connexion.php';
$position=json_decode($_POST['position']);

$contenu = json_decode($_POST['contenu']);

$requete = $bdd->prepare("INSERT INTO article(contenu_art, position_art) VALUES (:contenu, :position)");
$requete->execute([":contenu"=>$contenu,"position"=>$position]);

echo $position;