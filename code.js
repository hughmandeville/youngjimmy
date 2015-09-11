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
var rotate_covers_timer = null;
var checking_scroll = false;
var checking_doc_top = 0;

$(function() {
    setup_soundcloud_player();

    rotate_images_timer = setInterval(rotate_images, 10000);

    // the video is 1920x1080
    var width = $(window).width();
    var height = Math.ceil((width / 1920) * 1080);
    $("#vimeo_iframe").css("height", height);
    $("#vimeo_iframe").css("width", width);
    $(window).resize(function() {
        var width = $(window).width();
        var height = Math.ceil((width / 1920) * 1080);
        $("#vimeo_iframe").css("height", height);
        $("#vimeo_iframe").css("width", width);
    });

    
    /* play or pause video depending on scroll position */
    $(document).on('scroll', check_scroll);

    $("#button_xray").on("click", function() {
        if ($("#modal_jaw").css("display") == "none") {
            $("#modal_jaw").css("display","block");
        }
    });
    $("#modal_jaw").on("click", function() {   
        $("#modal_jaw").css("display","none");
    });
});


function check_scroll() {
    if (checking_scroll == true) {
        return;
    }        
    checking_scroll = true;
    
    var vimeo_top = $("#vimeo_iframe").position().top;
    var vimeo_bottom = vimeo_top + $("#vimeo_iframe").height();
    var document_top = $(document).scrollTop();

    checking_doc_top = document_top;
    
    var vimeo_iframe = $("#vimeo_iframe");
    if ((document_top >= (vimeo_top - 50)) && (document_top <= (vimeo_bottom + 50))) {
        //"https://player.vimeo.com";
        $("#button_play_pause").html("&#x25B6;");
        audio_state = "paused";
        sc_widget.pause();
        vimeo_iframe[0].contentWindow.postMessage({method: "play"}, "*");
    } else {
        vimeo_iframe[0].contentWindow.postMessage({method: "pause"}, "*");
    }
    window.setTimeout(function() {
        checking_scroll = false;
        var document_top = $(document).scrollTop();
        if (checking_doc_top != document_top) {
            check_scroll();
        }
    }, 1000);        
}


/**
 * Setup the SoundCloud player.
 */
function setup_soundcloud_player() {
    var sc_iframe = document.querySelector('#soundcloud_player_iframe');
    sc_widget = SC.Widget(sc_iframe);

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

    $(".track").on("click", function() {
        $(".col_action").html("play");
        $(this).find(".col_action").html("pause");
        sc_widget.skip($(this).data("track"));
        $("#button_play_pause").html("&#9612;&#9612;");
        audio_state = "playing";
        update_song_info();
    });

}

// get state from player and figure what to set play/pause buttons/labels to
function play_pause_display() {
    $(".col_action").html("play");
    //$(this).find(".col_action").html("pause");
}


function rotate_images() {
    if ($("#hood_rock_2_cover").attr("src") == "images/hood_rock_2_front_400x400.png") {
        $("#hood_rock_2_cover").attr("src", "images/hood_rock_2_back_400x400.png");
    } else {
        $("#hood_rock_2_cover").attr("src", "images/hood_rock_2_front_400x400.png");
    }
    if ($("#promo_image").attr("src") == "images/hood_rock_2_promo.jpg") {
        $("#promo_image").attr("src", "images/date_night_promo.jpg");
    } else if ($("#promo_image").attr("src") == "images/date_night_promo.jpg") {
        $("#promo_image").attr("src", "images/hood_rock_2_promo_2.jpg");
    } else if ($("#promo_image").attr("src") == "images/hood_rock_promo_2.jpg") {
        $("#promo_image").attr("src", "images/hood_rock_2_promo_.jpg");
    } else {
        $("#promo_image").attr("src", "images/hood_rock_2_promo.jpg");
    }
}


function update_song_info() {
    sc_widget.getCurrentSound(function(sound) {
        $("#song_title").html("<a href=\"https://soundcloud.com/cheezcakekidzrecords/" + sound.permalink + "\">" + sound.title + "</a>");

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
