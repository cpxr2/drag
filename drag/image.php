<?php
require 'connexion.php';

$nb = round(gettimeofday(true));

if ($_FILES['imgUp']['name'] !='')

    // Si une image  a été uploadée
    //   ********** Récupération de l'image ************** 
    if(isset($_FILES['imgUp']) && $_FILES['imgUp']['error'] === UPLOAD_ERR_OK)
    {

        // On vérifie s’il n’y a pas eu d’erreur
        if ($_FILES['imgUp']['error'] === UPLOAD_ERR_OK)
        {
            $taille_maxi = 2000000;
            $taille = filesize($_FILES['imgUp']['tmp_name']);
            $extensions = array('.png', '.gif', '.jpg', '.jpeg');
            $extension = strrchr($_FILES['imgUp']['name'], '.'); 

            // Début des vérifications de sécurité...
            if(!in_array($extension, $extensions)) //Si l'extension n'est pas dans le tableau
            {
                echo 'Vous devez uploader un fichier de type png, gif, jpg, jpeg';
                exit();
            }
            if($taille>$taille_maxi)
            {
                echo $erreur = 'Le fichier est trop gros...';
                exit();
            }

            // S'il n'y a pas d'erreur, on upload (on définit le nom de l’image)
            $nom_image= 'f' . $nb . $extension;
            
            $req = $bdd->query('INSERT INTO images (chemin_img) VALUE ("images/' . $nom_image.'")');

            if(move_uploaded_file($_FILES['imgUp']['tmp_name'], 'images/' . $nom_image )!=true) 
            {
                echo 'Erreur lors de l\'upload de l\'image.';
                exit();
            }
        }

        echo 'Le fichier a été uploadé';
    }

