function hideBouton(){
    $("#image").hide();
    $("#texte").hide();
}



function boutonMenu(btn, elm, cpt){

    $(btn).click(function(){
        hideBouton();
        cpt++;
        if(cpt%2){
            $(elm).show();
        }else{
            $(elm).hide();
        }    
    });
}


//*********** FONCTION BOUTON **********************
function boutonEdition(){
    $(".supprime").click(function(){
        // je supprime toute le contenu de la colonne qui contient le bouton
        $(this).parent().parent().parent().empty();
    });

    $(".edition").click(function(){
        // je recupere le texte dans la colonne
        editionText = $(this).parent().parent().text();
        console.log(editionText);
    });
                        }