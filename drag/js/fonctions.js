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


//*********** FONCTION MODAL ********

function modal(typeAction, typeContenu){


    $( "#modVideo" ).dialog({
        dialogClass: "no-close",
        buttons: [
            {
                text: "OK",
                click: function() {
                    $( this ).dialog( "close" );

                    fonctionAction(typeAction);
                    $(col).append(edition);
                    creationBoutonEdtion(typeContenu);

                    //*********** FONCTION BOUTON **********************

                    $(".supprime").click(function(){
                        // je supprime toute le contenu de la colonne qui contient le bouton
                        $(this).parent().parent().parent().empty();
                    });

                    $(".edition").click(function(){

                        fonctionEdition

                        // je crée un nouvelle MODAL
                        $( "#modvideo" ).dialog({
                            dialogClass: "no-close",
                            width: 510,
                            buttons: [
                                {
                                    text: "OK",
                                    click: function() {
                                        let liensaisi = $("#lienVideo").val();
                                        lien = liensaisi.replace("watch?v=", "embed/");
                                        $( this ).dialog( "close" );
                                        $(col).find('span').html('<iframe width="560" height="315" src="" frameborder="0" allowfullscreen></iframe>');
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

function fonctionAction(typeAction){
    if(typeAction == video){
        modifModalVideo();
    }else if (typeAction == texte){
        modifModalTexte();
    }
}

//*********** MODIF MODAL VIDEO ********

function modifModalVideo(){

    let liensaisi = $("#lienVideo").val();
    lien = liensaisi.replace("watch?v=", "embed/");    
    $(col).html('<span><iframe width="450" height="280" src="" frameborder="0" allowfullscreen></iframe></span>');
    $(col).find('iframe').attr("src", lien);
    $(col).append(edition);
}
function modifModalVideo(){
    // module editeur de texte
    $('#modText').summernote({                        
        height: 200, 
        width: 500,
        minHeight: null,             
        maxHeight: null,             
        focus: true
    });
    //préremplissage en lorem, ou recuperation du texte deja saisi pour edition
    if(editionText == ""){
        $('#modText').summernote('editor.insertText', texteDefault);
    }else{
        $('#modText').summernote('editor.insertText', editionText);  
    }

    // je recupere le contenu de l'editeur de texte et je le met dans ma colonne
    $(col).html($(this).summernote('code'));
    // je lui donne un "id" en auto increment
    $(col).children().attr('id', 'elt'+(nb++));
}


//*********** FONCTION BOUTON **********************
function creationBoutonEdtion(typeContenu){
    $(".supprime").click(function(){
        // je supprime toute le contenu de la colonne qui contient le bouton
        $(this).parent().parent().parent().empty();
    });

    $(".edition").click(function(){
        if(typeContenu =="texte"){
            // je recupere le texte dans la colonne
            editionText = $(this).parent().parent().text();
            console.log(editionText);
        }
    });
}