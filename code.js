/*
 * http://developers.soundcloud.com/docs/api/html5-widget
 *
 * To Do
 *  - Have playlist loop.
 *  - Make look good on iphone.
 */
var audio_state = "playing"; // "paused";
var sc_widget = null;
var rotate_covers_timer = null;
var checking_scroll = false;
var checking_doc_top = 0;
var image_index = 0;

var promo_images = [
    {
        "src"  : "images/promo_yellow_yellow.jpg",
        "desc" : "Yellow Yellow"
    },
];

$(function() {
    create_bullets();
    setup_soundcloud_player();

    // Having issues controlling SoundCloud player on iOS so hiding the control buttons on iOS.
    // And increasing the SoundCloud player's height at the bottom of the page.
    if (navigator.userAgent.match(/(iPod|iPhone|iPad)/)) {
        $("#controls").css("display", "none");
        $("#soundcloud_player_iframe").css("height","400px");
        $("#social_links").css("margin-top", "100px");
    }

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
    //$(document).on('scroll', check_scroll);

    $(".album_cover").on("mouseover", function() {
        $(this).attr("src", $(this).data("back"));
    });
    $(".album_cover").on("mouseout", function() {
        $(this).attr("src", $(this).data("cover"));
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

// get state from player and figure what to set play/pause buttons/labels to
function play_pause_display() {
    $(".col_action").html("play");
    //$(this).find(".col_action").html("pause");
}


function rotate_images() {
    var cur_image = $("#promo_image").attr("src");
    image_index++;
    if (image_index >= promo_images.length) {
        image_index = 0;
    }
    update_promo_image(image_index);
}

function update_promo_image(index) {
    $("#promo_image").attr("src", promo_images[index]["src"]);
    $(".bullet").removeClass("bullet_selected");
    $(".bullet[data-index=" + index + "]").addClass("bullet_selected");
    image_index = index;
}

/**
 * Create bullets under promo images.
 */
function create_bullets() {
    var bullets_html = "";
    for (var i = 0; i < promo_images.length; i++) {
        bullets_html += "<div data-index=\"" + i + "\" title=\"" + promo_images[i]["desc"] +
            "\" class=\"bullet\">&bull;</div>";
    }
    $("#bullets").html(bullets_html);
    $(".bullet").on("click", function() {
        var index = $(this).data("index");
        update_promo_image(index);
    });
    update_promo_image(image_index);
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



/**
 * Not longer used.
 * Check scroll position to figure out if you need to start video playing.
 */
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
        $("#button_play_pause").attr("src","images/button_play.png");
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
