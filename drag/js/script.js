var i = 0;
var t = 0;
var cpt = 0;
var nb = 0;
var contenu = $("body").html(); // tout le contenu HTML pour la bdd
var texteDefault = "Pariatur varias lorem et malis, duis eiusmod in esse varias. Admodum irure proident quamquam. Ita dolor doctrina transferrem sed eiusmod aliqua vidisse.Senserit ita summis, appellat aute ipsum ea summis. Quo nescius ab admodum, sednam familiaritatem. Ex ullamco si offendit ad ita elit nescius distinguantur iishic dolor proident te dolor qui laborum eu aute hic quo varias tempor autappellat noster tamen ut malis, ad elit offendit sed illum do voluptate.Occaecat a eram arbitror, duis de iudicem qui velit. Hic a culpa eram irure non consequat legam irure ut tamen."
var colonneHtml = {
    '1c': '<div class="col-md-12 column"></div>',
    '2c': '<div class="col-md-6 column"></div><div class="col-md-6 column"></div>',
    '3c': '<div class="col-md-4 column"></div><div class="col-md-4 column"></div><div class="col-md-4 column"></div>',
    '4c': '<div class="col-md-3 column"></div><div class="col-md-3 column"></div><div class="col-md-3 column"></div><div class="col-md-3 column"></div>'
}
var edition = '<div class="edit"><button class="btn btn-primary btnEdit edition"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></button><button class="btn btn-danger btnEdit supprime"><i class="fa fa-trash" aria-hidden="true"></i></button></div>';
var editionText = "";
var idVideo = "";

//******* FONCTION GOOGLE MAP ********
function initMap(lati, longi, zoom, m) {
    var uluru = {lat: lati, lng: longi};
    var map = new google.maps.Map(document.getElementById(m), {
        zoom: zoom,
        center: uluru,
        draggable: false,
        scrollwheel: false,
        disableDoubleClickZoom: true
    });
    var marker = new google.maps.Marker({
        position: uluru,
        map: map
    });
}

//****** FONCTION ID ALEATOIRE *****
function idAleatoire(){
    var idAl = new Date().getTime();
    return idAl;
}

//********** BOUTON SUPPRIME **********
$(".supprime").each(function(){
    $(this).click(function(){
        // je supprime toute le contenu de la colonne qui contient le bouton
        $(this).parent().parent().parent().empty();
    });    
});

$(".drag").draggable({
    containment: '#page_drop',   
    revert: true
});

$(".htmlElt").draggable({
    containement: '.column',
    revert: true
});

$("#page_drop").droppable({

    accept: ".drag",

    drop: function(e, ui){

        let idDrag = ui.draggable[0].id;// on recupere l'id dans le tableau du parametre "ui" de la fonction
        //console.log(ui);
        $("#page_drop").append('<div class="row ligne" >' + colonneHtml[idDrag] + '</div>');


        //*********** DRAG  DANS LES COLONNES ******************************



        $(".column").droppable({

            accept: ".htmlElt",
            drop: function(e, ui){
                let idDrag = ui.draggable[0].id;
                let col = this;
                //console.log(this);

                /*****************************************************
                        TEXTE
*****************************************************/

                if(idDrag=="btnTexte"){

                    //*************** MODAL ******************


                    $( "#modText" ).dialog({
                        dialogClass: "no-close",
                        width: 510,
                        create: function(e, ui){
                            $('#modText').summernote({                        
                                height: 200, 
                                width: 500,
                                minHeight: null,             
                                maxHeight: null,             
                                focus: true
                            });

                            if(editionText == ""){
                                $('#modText').summernote('editor.insertText', texteDefault);
                            }else{
                                $('#modText').summernote('editor.insertText', editionText);  
                            }
                        },
                        buttons: [
                            {
                                text: "OK",

                                click: function() {
                                    $( this ).dialog( "close" );
                                    // je recupere le contenu de l'editeur de texte et je le met dans ma colonne
                                    $(col).append($(this).summernote('code'));
                                    // je lui donne un "id" en auto increment
                                    $(col).children().attr('id', idAleatoire());
                                    editionText = "";
                                    // je rajoute les boutons d'edition et de suppression
                                    $(col).append(edition);
                                    console.log(editionText);
                                    //*********** FONCTION BOUTON **********************

                                    $(".supprime").click(function(){
                                        // je supprime toute le contenu de la colonne qui contient le bouton
                                        $(this).parent().parent().parent().empty();
                                    });

                                    $(".edition").click(function(){
                                        // je recupere le texte dans la colonne
                                        editionText = $(this).parent().parent().text();
                                        console.log(editionText);

                                        //****************** 2EME MODAL *****************

                                        // je crée un nouvelle MODAL
                                        $( "#modText" ).dialog({
                                            dialogClass: "no-close",
                                            width: 510,
                                            buttons: [
                                                {
                                                    text: "OK",
                                                    click: function() {
                                                        $( this ).dialog( "close" );
                                                        $(col).find('p').html($(this).summernote('code'));
                                                        editionText = "";
                                                    }
                                                }
                                            ]
                                        });
                                    });
                                }
                            }
                        ]
                    });                  
                } 

                /*****************************************************
                        VIDEO
*****************************************************/

                if(idDrag=="btnVideo"){


                    $( "#modVideo" ).dialog({
                        dialogClass: "no-close",
                        create: function(){
                            $("#modVideo").append('<input type="text" id="' + idAleatoire() + '"/>');
                            idVideo = $("#modVideo").find("input").attr("id");
                        },
                        buttons: [
                            {
                                text: "OK",
                                click: function() {
                                    let liensaisi = $('#'+idVideo).val();                                   
                                    lien = liensaisi.replace("watch?v=", "embed/");
                                    //je recupere la largeur de la div et j'adapte la hauteur pour la video
                                    let largeurDiv = $(col).width();
                                    let hauteurDiv = largeurDiv/2;
                                    $(col).html('<span><iframe width="" height="" src="" frameborder="0" allowfullscreen></iframe></span>');
                                    $(col).find('iframe').attr("width", (largeurDiv-20));
                                    $(col).find('iframe').attr("height", hauteurDiv);
                                    $(col).find('iframe').attr("src", lien);
                                    $(col).append(edition);

                                    $( this ).dialog( "close" );
                                    //*********** FONCTION BOUTON **********************

                                    $(".supprime").click(function(){
                                        // je supprime toute le contenu de la colonne qui contient le bouton
                                        $(this).parent().parent().parent().empty();
                                    });

                                    $(".edition").click(function(){


                                        // je crée un nouvelle MODAL
                                        $( "#modvideo" ).dialog({
                                            dialogClass: "no-close",
                                            width: 510,
                                            create: function(){
                                                $("#modVideo").html('<input type="text" id=' + idVideo + '/>');
                                            },
                                            buttons: [
                                                {
                                                    text: "OK",
                                                    click: function() {
                                                        let liensaisi = $(idVideo).val();
                                                        lien = liensaisi.replace("watch?v=", "embed/");
                                                        $( this ).dialog( "close" );
                                                        $(col).find('iframe').attr("src", lien);



                                                    }
                                                }
                                            ]
                                        });


                                    });
                                }
                            }
                        ]
                    });

                }

                /*****************************************************
                            MAPS
*****************************************************/

                if(idDrag=="btnMap"){
                    $( "#modMap" ).dialog({
                        dialogClass: "no-close",
                        create: function(){

                            let longi =  -0.67432;
                            let lati = 44.833078;
                            let zoom = 15;

                            initMap(lati, longi, zoom, "map");
                        },
                        buttons: [
                            {
                                text: "OK",
                                click: function() {
                                    let largeurDiv = $(col).width();                                    
                                    $(col).append('<div class="mapCol" id=' + idAleatoire() + '></div');
                                    let mapID = $(col).children().attr("id");
                                    $(mapID).attr("width", largeurDiv);
                                    //$("#mapCol").attr("height", largeurDiv);


                                    longi = parseFloat($("#longitude").val());
                                    lati = parseFloat($("#latitude").val());
                                    zoom = parseFloat($("#zoom").val());                                  


                                    initMap(lati, longi, zoom, mapID);


                                    $(col).append(edition);

                                    $( this ).dialog( "close" );
                                    //*********** FONCTION BOUTON **********************

                                    $(".supprime").click(function(){
                                        // je supprime toute le contenu de la colonne qui contient le bouton
                                        $(this).parent().parent().parent().empty();
                                    });

                                    $(".edition").click(function(){


                                        // je crée un nouvelle MODAL
                                        $( "#modMap" ).dialog({
                                            dialogClass: "no-close",
                                            width: 510,
                                            create: function(){

                                            },
                                            buttons: [
                                                {
                                                    text: "OK",
                                                    click: function() {

                                                    }
                                                }
                                            ]
                                        });


                                    });
                                }
                            }
                        ]
                    });

                }



                /*****************************************************
                           IMAGES
*****************************************************/           

                if(idDrag=="btnImg"){
                    $( "#modImg" ).dialog({
                        dialogClass: "no-close",
                        width: 600,
                        create: function(){

                            $.post(
                                'recupImgAjax.php',
                                function(d){
                                    data = JSON.parse(d)
                                    console.log(data);
                                    for(i=0; i<data.length; i++){
                                        $("#zone_img").append('<img class="col-xs_4" width="75" height="75" src="' + data[i] + '" />');
                                    }
                                    $("img").click(function(){
                                        // reglage des dimension de l'image
                                        let largeurDiv = $(col).width();
                                        let hauteurDiv = largeurDiv/2;

                                        $(col).find('img').attr("width", (largeurDiv));
                                        $(col).find('img').attr("height", hauteurDiv);

                                        var source = $(this).attr("src");
                                        $(col).append('<img class="imgCol" id="' + idAleatoire() + '" src="" />');
                                        $(col).children().attr('src', source);
                                        $("#modImg").dialog( "close" );
                                        $(col).append(edition);


                                        //*********** FONCTION BOUTON **********************

                                        $(".supprime").click(function(){
                                            // je supprime toute le contenu de la colonne qui contient le bouton
                                            $(this).parent().parent().parent().empty();
                                        });

                                        $(".edition").click(function(){
                                        });
                                    });

                                }
                            );


                        },
                        buttons: 
                        {          

                            "Envoyer": function() {

                                var form = document.forms.namedItem("formImg");
                                var dataImg = new FormData(document.forms.namedItem("formImg"));

                                $.post({
                                    url: "image.php",
                                    data: dataImg,
                                    success: function(d){

                                        $("#zone_img").empty();

                                        data = JSON.parse(d)
                                        console.log(data);
                                        for(i=1; i<data.length; i++){
                                            $("#zone_img").append('<img class="col-xs_4" width="75" height="75" src="' + data[i] + '" />');
                                        }
                                        //affichage du message de resultat de l'upload
                                        $("#resultat").html(data[0]); 

                                        //click sur images
                                        $("img").click(function(){
                                            var source = $(this).attr("src");
                                            $(col).append('<img class="imgCol" id="' + idAleatoire() + '" src="" />');
                                            $(col).children().attr('src', source);
                                            $("#modImg").dialog( "close" );
                                        });

                                    },
                                    processData: false,
                                    contentType: false,
                                });

                                $(col).append(edition);


                                //*********** FONCTION BOUTON **********************

                                $(".supprime").click(function(){
                                    // je supprime toute le contenu de la colonne qui contient le bouton
                                    $(this).parent().parent().parent().empty();
                                });

                                $(".edition").click(function(){
                                });
                            }
                        }

                    });
                }

                // ******* fin du droppable ********
            }});

        $("#page_drop").sortable({
            axis: "y",
            //containement: "#page_drop",
            stop: function(e,ui){
                console.log(ui);
            }            
        });



        //ajax qui renvoi tout le HTML dans la bdd.
        $.post(
            'article_ajax.php',
            {
                "contenu": JSON.stringify(contenu)
            },
            function(data){
                console.log(data);
            },
            'json'
        );
    } 
});


