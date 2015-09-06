/*
 * http://developers.soundcloud.com/docs/api/html5-widget
 *
 * To Do
 *  - Have playlist loop.
 *  - Fix play/pause buttons on iphone.
 *  - Make look good on iphone.
 */
var audio_state = "paused";
var sc_widget = null;

$(function() {
    var sc_iframe = document.querySelector('#soundcloud_player_iframe');
    sc_widget = SC.Widget(sc_iframe);

    sc_widget.bind(SC.Widget.Events.READY, function() {
        update_song_info();
    });


    $("#button_play_pause").on("click", function() {
        update_song_info();
        // XXX: instead of state could check isPaused
        if (audio_state == "playing") {
            $("#button_play_pause").html("&#x25B6;");
            audio_state = "paused";
            sc_widget.pause();
        } else {
            $("#button_play_pause").html("&#9612;&#9612;");
            audio_state = "playing";
            sc_widget.play();
        }
    });
    $("#button_previous").on("click", function() {
        sc_widget.prev();
        $("#button_play_pause").html("&#9612;&#9612;");
        audio_state = "playing";
        update_song_info();
    });
    $("#button_next").on("click", function() {
        sc_widget.next();
        $("#button_play_pause").html("&#9612;&#9612;");
        audio_state = "playing";
        update_song_info();
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




function update_song_info() {
    sc_widget.getCurrentSound(function(sound) {
        $("#song_title").html("<a href=\"" + sound.permalink + "\">" + sound.title + "</a>");

        $("#nav").css("background-image", "linear-gradient( rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.9) ), url('" + sound.waveform_url + "')");

        /*
        if (sound.artwork_url != null) {
            $("#song_art").attr("src", sound.artwork_url);
            $("#song_art").css("display", "inline-block");
        } else {
            $("#song_art").attr("src", "");
            $("#song_art").css("display", "none");
        }
        */

    });
}
