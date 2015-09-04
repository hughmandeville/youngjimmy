var audio_state = "playing";

$(function() {

    $("#button_play_pause").on("click", function() {
        if (audio_state == "playing") {
            $("#button_play_pause").html("&#9612;&#9612;");
            audio_state = "paused";
        } else {
            $("#button_play_pause").html("&#x25B6;");
            audio_state = "playing";
        }
    });

    
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


