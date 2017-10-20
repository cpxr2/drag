var i = 0;
var t = 0;
var cpt = 0;
var nb = 0;
var contenu = $("body").html(); // tout le contenu HTML pour la bdd
var texteDefault = "Pariatur varias lorem et malis, duis eiusmod in esse varias. Admodum irure proident quamquam. Ita dolor doctrina transferrem sed eiusmod aliqua vidisse.Senserit ita summis, appellat aute ipsum ea summis. Quo nescius ab admodum, sednam familiaritatem. Ex ullamco si offendit ad ita elit nescius distinguantur iishic dolor proident te dolor qui laborum eu aute hic quo varias tempor autappellat noster tamen ut malis, ad elit offendit sed illum do voluptate.Occaecat a eram arbitror, duis de iudicem qui velit. Hic a culpa eram irure non consequat legam irure ut tamen."
var colonneHtml = {
    '1c': '<div class="col-md-12 column columnBorder"></div>',
    '2c': '<div class="col-md-6 column columnBorder"></div><div class="col-md-6 column columnBorder"></div>',
    '3c': '<div class="col-md-4 column columnBorder"></div><div class="col-md-4 column columnBorder"></div><div class="col-md-4 column columnBorder"></div>',
    '4c': '<div class="col-md-3 column columnBorder"></div><div class="col-md-3 column columnBorder"></div><div class="col-md-3 column columnBorder"></div><div class="col-md-3 column columnBorder"></div>'
}
var edition = '<div class="edit"><button class="btn btn-primary btnEdit edition"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></button><button class="btn btn-danger btnEdit supprime"><i class="fa fa-trash" aria-hidden="true"></i></button></div>';
var editionText = "";
var idVideo = "";

function recupId(col){
    var id = $(col).children().attr('id');
    return id;
}

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

$("#save").hide();

$(".drag").draggable({
    containment: '#page_drop',   
    revert: true
});

$(".htmlElt").draggable({
    containement: '.column',
    revert: true
});

/*****************************************************
                DROP
*****************************************************/



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
                var col = this;


                /*****************************************************
                        TEXTE
    *****************************************************/

                if(idDrag=="btnTexte"){

                    modalText(col, editionText, texteDefault);
                    $(col).append(edition);

                    //*********** FONCTION BOUTON **********************

                    $(".supprime").click(function(){
                        // je supprime toute le contenu de la colonne qui contient le bouton
                        $(this).parent().parent().parent().empty();
                    });

                    $(".edition").click(function(){
                        editionText = $(col).find('p').text();
                        console.log(editionText);
                        modalText(col, editionText, texteDefault);
                        editionText = "";
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

                    modalImage(col);
                    $(col).append(edition);


                    //*********** FONCTION BOUTON **********************

                    $(".supprime").click(function(){
                        // je supprime toute le contenu de la colonne qui contient le bouton
                        $(this).parent().parent().parent().empty();
                    });

                    $(".edition").click(function(){
                        $(this).parent().parent().empty();
                        console.log($(this).parent().find("img").attr('id'));

                        modalImage(col);
                        // $(this).trigger("create");
                    });










                    // ******* fin du droppable ********
                    $("#page_drop").sortable({
                        axis: "y",
                        //containement: "#page_drop",
                        stop: function(e,ui){

                        }            
                    });



                    //ajax qui renvoi tout le HTML dans la bdd.
                    $.post(
                        'article_ajax.php',
                        {
                            "contenu": JSON.stringify(contenu)
                        },
                        function(data){

                        },
                        'json'
                    );
                } 
            }
        });
    }
});

var clicPrevi = 0;

$("#previsu").click(function(){
    clicPrevi++;
    if(clicPrevi%2){
        $("#previsu").html("Retour Edition");
        $("#page_drop").removeClass("page_drop");
        $("#menu").hide();
        $("#page").css("background-color", "white");
        $("body").css("background-color", "white");
        $(".column").removeClass("columnBorder");
        $(".edit").hide();
        $("#save").show();
    }
    else{
        $("#previsu").html("Prévisualisation magique");
        $("#page_drop").addClass("page_drop");
        $("#menu").show();
        $("#page").css("background-color", "#DDC9FF");
        $("body").css("background-color", "#FFB2A3");
        $(".column").addClass("columnBorder");
        $(".edit").show();
        $("#save").hide();
    }
});

$("#save").click(function(){
    //ajax qui renvoi tout le HTML dans la bdd.
    $.post(
        'article_ajax.php',
        {
            "contenu": JSON.stringify(contenu)
        },
        function(data){
            $("#message").html(data);
        },
        'json'
    )
})



