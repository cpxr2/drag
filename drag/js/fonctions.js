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