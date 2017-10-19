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
                        <div id="btnVideo" class="col-sm-4 htmlElt"><i class="fa fa-youtube" aria-hidden="true"></i></div>
                        <div id="btnMap" class="col-sm-4 htmlElt"><i class="fa fa-map-marker" aria-hidden="true"></i></div>
                    </div>
                </div>


                <!-- la zone de drop-->
                <div class="col-sm-10" id="page_drop">
                    <ul></ul>
                </div>

                <!-- ****************************** MODAL *************************-->

                <div id="modVideo" title="Ajouter une video"></div>
                <div id="modText"></div>

                <div id="modImg" title="Ajouter un image">
                    
                    <div id="zone_img"></div>
                    
                    <div id="form">
                        <form id="formImg" enctype="multipart/form-data" method="post" name="formImg" >
                            <input type='file' id="imgUp" name="imgUp"/>
                        </form>
                    </div>
                </div>

                <div id="modMap">
                    <h3>Google Maps</h3>
                    <div id="map"></div>

                    <div><label for="longitude">Longitude : </label><input type="number" id="longitude" value="-0.673608"/></div><br />                    
                    <div><label for="latitude">Latitude : </label><input type="number" id="latitude" value="44.833088" /></div><br />                    
                    <div><label for="zoom">Zoom : </label><input type="number" id="zoom" value="15" /></div>                    

                </div>


                <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
                <script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js"></script>
                <script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCSGviqWFmjq6gjLveBMNdzAwpj11SkD_o"></script>
                <script src="http://cdnjs.cloudflare.com/ajax/libs/summernote/0.8.8/summernote.js"></script>
                <!--<script src="js/fonctions.js"></script>-->
                <script src="js/script.js"></script>
                <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>

                </body>
            </html>
        <!--Ad quibusdam fidelissimae, se do magna voluptate.-->



