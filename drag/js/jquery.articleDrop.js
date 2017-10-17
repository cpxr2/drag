(function($){
    $.fn.articleDrop = function(options) {
 
        // Options par defaut
        var defaults = {};
 
        var options = $.extend(defaults, options);
 
        this.each(function(){
 
            var obj = $(this);
 
            var compteur = 0;

    $("#b1").click(function(){
        compteur ++
        $("#page_drop").append('<div class="test elem' + compteur + '">' + $("#text_drag").val() + '</div>');
        //$(".test").addClass("element"+compteur);
        $("#text_drag").val("");
    });


    $(".test").draggable({
        containment: "#page_drop",
        grid: [20,20],
       scroll: false


        //revert: true,

    });


    $("#page_drop").droppable({
        accept: "li",
        drop: function(){
            console.log("reussi");
        }
    });
 
        });
        // On continue le chainage JQuery
        return this;
    };
})(jQuery);