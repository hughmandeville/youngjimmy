$(function() {

    

    
    $(document).on( 'scroll', function(){
        var boyz_top = $("#video_boyz").position().top;
        var boyz_bottom = boyz_top + $("#video_boyz").height();
        var document_top = $(document).scrollTop();

        if ((document_top >= (boyz_top - 50)) && (document_top <= (boyz_bottom + 50))) {
            $("#video_boyz").get(0).play();
        } else {
            $("#video_boyz").get(0).pause();
        }
    });

});


