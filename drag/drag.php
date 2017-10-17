<!DOCTYPE html>
<html lang="">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Article Drag</title>

        <script src="https://use.fontawesome.com/fe74c9687c.js"></script>

        <link href="https://fonts.googleapis.com/css?family=Ubuntu" rel="stylesheet">

        <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
        <link rel="stylesheet" href="https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/themes/smoothness/jquery-ui.css">
        <link href="http://cdnjs.cloudflare.com/ajax/libs/summernote/0.8.8/summernote.css" rel="stylesheet">
        <link rel="stylesheet" href="css/style.css">
    </head>

    <body>
        <div class="container">
            <div class="row" id="page">
                <div class="col-sm-2" id="menu">
                    <ul>
                        <p class="title">Mise en page</p><br />
                        <li class="drag" id="1c">1 colonne</li>
                        <li class="drag" id="2c">2 colonnes</li>
                        <li class="drag" id="3c">3 colonnes</li>
                        <li class="drag" id="4c">4 colonnes</li>
                    </ul>
                    <br /><br />
                    <p class="title">Element HTML</p><br />
                    <div class="row">
                        <div id="btnTexte" class="col-sm-4 htmlElt"><i class="fa fa-font" aria-hidden="true"></i></div>
                        <div id="btnImg" class="col-sm-4 htmlElt"><i class="fa fa-picture-o" aria-hidden="true"></i></div>
                        <div id="btnImg" class="col-sm-4 htmlElt"><i class="fa fa-youtube" aria-hidden="true"></i></div>
                    </div>
                </div>


                <!-- la zone de drop-->
                <div class="col-sm-10" id="page_drop">
                    <ul></ul>
                </div>

                <!-- ****************************** MODAL *************************-->

                <div id="modVideo" title="Ajouter une video"><input type="text" id="lienVideo" /></div>
                <div id="modText"></div>


                <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
                <script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js"></script>
                <script src="http://cdnjs.cloudflare.com/ajax/libs/summernote/0.8.8/summernote.js"></script>
                <script src="js/fonctions.js"></script>
                <script src="js/script.js"></script>

                </body>
            </html>
        <!--Ad quibusdam fidelissimae, se do magna voluptate.-->



