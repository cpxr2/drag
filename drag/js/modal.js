//******** MODAL IMAGE *********
function modalImage(col){
    $( "#modImg" ).dialog({
        dialogClass: "no-close",
        width: 600,
        create: function(){

            $.post(
                'recupImgAjax.php',
                function(d){
                    data = JSON.parse(d)

                    for(i=0; i<data.length; i++){
                        $("#zone_img").append('<img class="col-sm-4" width="75" height="75" src="' + data[i] + '" />');
                    }

                    $("img").click(function(){
                        // reglage des dimension de l'image
                        let largeurDiv = $(col).width();
                        let hauteurDiv = largeurDiv/2;

                        var source = $(this).attr("src");
                        $(col).append('<img class="imgCol" id="' + idAleatoire() + '" src="" />');
                        $(col).children().attr('src', source);
                        $(col).find('img').attr("width", (largeurDiv));
                        $(col).find('img').attr("height", hauteurDiv);
                        $("#modImg").dialog( "close" );
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

                        for(i=1; i<data.length; i++){
                            $("#zone_img").append('<img class="col-xs_4" width="75" height="75" src="' + data[i] + '" />');
                        }
                        //affichage du message de resultat de l'upload
                        $("#resultat").html(data[0]); 
                    },
                    processData: false,
                    contentType: false,
                });

                //click sur images
                $("img").click(function(){
                    var source = $(this).attr("src");
                    $(col).append('<img class="imgCol" id="' + idAleatoire() + '" src="" />');
                    $(col).children().attr('src', source);
                    $("#modImg").dialog( "close" );
                });
            }
        }
    });
}

/*****************************************************************
                    MODAL TEXTE
*****************************************************************/
//module d'edition de texte


function modalText(col, editionText, texteDefault){
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


            //initialisation du texte
            if(editionText == ""){
                $('#modText').summernote('editor.insertText', texteDefault);
                console.log("lorem");
            }else{
                $('#modText').summernote('editor.insertText', editionText);  
                console.log("texte origine");
            }
        },
        buttons: [
            {
                text: "OK",

                click: function() {
                    $(col).find("p").empty();
                    // je recupere le contenu de l'editeur de texte et je le met dans ma colonne
                    $(col).append($(this).summernote('code'));
                    // je lui donne un "id" en auto increment
                    $(col).children().attr('id', idAleatoire());
                    $( this ).dialog( "destroy" );




                }
            }
        ]
    });
};

