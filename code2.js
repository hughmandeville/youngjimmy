/*
 * http://developers.soundcloud.com/docs/api/html5-widget
 *
 */
var audio_state = "paused"; // playing or paused
var sc_widget = null;

$(function() {
    setup_soundcloud_player();
    $("#menu_pulldown").on("click", function() {
        $("#menu_panel").toggle();
    });
});


/**
 * Setup the SoundCloud player.
 */
function setup_soundcloud_player() {
    var sc_iframe = document.querySelector('#soundcloud_player_iframe');
    sc_widget = SC.Widget(sc_iframe);

    if (sc_widget == null) {
        return;
    }

    sc_widget.bind(SC.Widget.Events.READY, function() {
        update_song_info();
    });
    sc_widget.bind(SC.Widget.Events.FINISH, function() {
        update_song_info();
    });
    sc_widget.bind(SC.Widget.Events.PLAY, function() {
        update_song_info();
    });

    $("#button_play_pause").on("click", function() {
        update_song_info();
        // XXX: instead of state could check isPaused
        if (audio_state == "playing") {
            $("#button_play_pause i").html("play_arrow");
            audio_state = "paused";
            sc_widget.pause();
        } else {
            $("#button_play_pause i").html("pause");
            audio_state = "playing";
            sc_widget.play();
        }
    });
    $("#button_previous").on("click", function() {
        sc_widget.prev();
        $("#button_play_pause").attr("src","images/button_pause.png");
        audio_state = "playing";
        update_song_info();
    });
    $("#button_next").on("click", function() {
        sc_widget.next();
        $("#button_play_pause").attr("src","images/button_pause.png");
        audio_state = "playing";
        update_song_info();
    });

    $(".track").on("click", function() {
        if ($(this).data("track").length == 0) {
            return;
        }
        $(".col_action").html("play");
        $(this).find(".col_action").html("pause");
        sc_widget.skip($(this).data("track"));
        $("#button_play_pause").attr("src","images/button_pause.png");
        audio_state = "playing";
        update_song_info();
    });
}

/**
 * Update song info.
 */
function update_song_info() {
    sc_widget.getCurrentSound(function(sound) {
        $("#song_title").html("<a href=\"https://soundcloud.com/cheezcakekidzrecords/" + sound.permalink + "\">" + sound.title + "</a>");
        // See Waveform.js for showing waveforms.
        // https://developers.soundcloud.com/blog/waveforms-let-s-talk-about-them
        // sound.waveform_url
    });
}
