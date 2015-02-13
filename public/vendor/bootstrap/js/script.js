$(function(){
    var current = $( ".note-element:first-of-type" );
    var show = function(element){
        element.css( "display", 'block' );
    };

    var hide = function(element){
        element.css( "display", 'none' );
    };

    show(current);

    setInterval(function(){
        var old = current;
        current = current.next();

        if(current.hasClass('note-element')){
            show(current);
            hide(old);
        }
        else{
            current = $( ".note-element:first-of-type" );
            show(current);
            hide(old);

        }
    }, 5000);

});