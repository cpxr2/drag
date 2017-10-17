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
                
                //*************** TEXTE **********************

                if(idDrag=="btnTexte"){

                    //*************** MODAL ******************


                    $( "#modText" ).dialog({
                        dialogClass: "no-close",
                        width: 510,
                        buttons: [
                            {
                                text: "OK",

                                click: function() {

                                    $( this ).dialog( "close" );

                                    // je recupere le contenu de l'editeur de texte et je le met dans ma colonne
                                    $(col).html($(this).summernote('code'));
                                    // je lui donne un "id" en auto increment
                                    $(col).children().attr('id', 'elt'+(nb++));
                                    // je rajoute les boutons d'edition et de suppression
                                    $(col).append(edition);

                                    //*********** FONCTION BOUTON **********************

                                    $(".supprime").click(function(){
                                        // je supprime toute le contenu de la colonne qui contient le bouton
                                        $(this).parent().parent().parent().empty();
                                    });

                                    $(".edition").click(function(){
                                        // je recupere le texte dans la colonne
                                        editionText = $(this).parent().parent().text();
                                        console.log(editionText);

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
                    $('#modText').summernote({                        
                        height: 200, 
                        width: 500,
                        minHeight: null,             
                        maxHeight: null,             
                        focus: true
                    });
                    if(editionText == ""){
                        $('#mod').summernote('editor.insertText', texteDefault);
                    }else{
                        $('#mod').summernote('editor.insertText', editionText);  
                    }

                } 

                if(idDrag=="btnImg"){

                    $( "#modVideo" ).dialog({
                        dialogClass: "no-close",
                        buttons: [
                            {
                                text: "OK",
                                click: function() {
                                    let lien = $("#lienVideo").val();
                                    $( this ).dialog( "close" );
                                    $(col).html('<span><iframe width="450" height="280" src=' +lien+ ' frameborder="0" allowfullscreen></iframe></span>');
                                    $(col).append(edition);
                                    
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
                                            buttons: [
                                                {
                                                    text: "OK",
                                                    click: function() {
                                                        $( this ).dialog( "close" );
                                                        $(col).find('span').html('<iframe width="560" height="315" src=' +lien+ ' frameborder="0" allowfullscreen></iframe>');
                                                        
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


