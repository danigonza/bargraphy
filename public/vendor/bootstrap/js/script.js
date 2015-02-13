$(function(){
    var current = $( ".note-element:first-of-type" );
    var show = function(element){
        element.css( "display", 'block' );
    };

    var hide = function(element){
        element.css( "display", 'block' );
    };

    show(current);

    setInterval(function(){
        var old = current;
        current = current.next();
        show(current);
        hide(old);
    }, 5000);

});