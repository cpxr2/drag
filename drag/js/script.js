var i = 0;
var t = 0;
var cpt = 0;
var contenu = $("body").html(); // tout le contenu HTML pour la bdd
var colonneHtml = {
    '1c': '<div class="col-md-12 column"></div>',
    '2c': '<div class="col-md-6 column"></div><div class="col-md-6 column"></div>',
    '3c': '<div class="col-md-4 column"></div><div class="col-md-4 column"></div><div class="col-md-4 column"></div>',
    '4c': '<div class="col-md-3 column"></div><div class="col-md-3 column"></div><div class="col-md-3 column"></div><div class="col-md-3 column"></div>'
}

/*
$(".drag").draggable({
    containment: '#page_drop',
    grid: [20,20]
});
console.log(cpt);
});*/


//
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
        console.log(ui);
        $("#page_drop").append('<div class="row ligne">' + colonneHtml[idDrag] + '</div>');


        //*********** DRAG  DANS LES COLONNES ******************************



        $(".column").droppable({

            accept: ".htmlElt",
            drop: function(e, ui){
                let idDrag = ui.draggable[0].id;
                let col = this;
                console.log(this);

                if(idDrag=="btnTexte"){
                    //*************** MODAL ******************
                    $( "#mod" ).dialog({
                        dialogClass: "no-close",
                        width: 510,
                        buttons: [
                            {
                                text: "OK",
                                click: function() {
                                    $( this ).dialog( "close" );
                                    $(col).html($(this).summernote('code'));
                                    
                                }
                            }
                        ]
                    });
                    $('#mod').summernote({
                        height: 200, 
                        width: 500,
                        minHeight: null,             
                        maxHeight: null,             
                        focus: true                 
                    });

                } 

            }});



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

 $(".column").sortable({
     
 });
