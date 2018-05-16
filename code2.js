/*
 * http://developers.soundcloud.com/docs/api/html5-widget
 *
 */
var audio_state = "paused"; // playing or paused
var sc_widget = null;

$(function() {
    set_content();
    setup_soundcloud_player();
    $("#menu_pulldown").on("click", function() {
        $("#menu_panel").toggle();
    });
    $(".album_cover").on("mouseover", function() {
        $(this).attr("src", $(this).data("back"));
    });
    $(".album_cover").on("mouseout", function() {
        $(this).attr("src", $(this).data("cover"));
    });
});

/**
 * Set the page content.  Get page name from path or anchor.
 */
function set_content() {
    var page = window.location.pathname.substr(1);
    var anchor = getAnchor();
    if (anchor != null) {
        page = anchor;
    }
    if ((page == "") || (page == "index.html") || (page == "index2.html")) {
        page = "index";
    }
    if (page == "index") {
        $("#content").html(
            "<a href='https://itunes.apple.com/album/id1375809976?ls=1&app=itunes'><img class='big_img' src='images/promo_yellow_yellow.jpg'/></a><br/><br/><br/><br/>" +
            "<a href='https://www.ticketweb.com/event/late-to-the-party-yj-sobs-tickets/8361045?pl=sobs&edpPlParam=%3Fpl%3Dsobs'><img class='big_img' src='images/poster_show_jun_12_2018.jpg'></a><br/>");
            // "<img class='big_img' src='images/yj_main_2_alone.jpg'/>"
    } else if (page == "merch") {
        $("#content").html("<div class='box'><img class='hat' src='images/hat_kap_ernick.png'></div>" +
                           "<div class='box'><img class='hat' src='images/hat_yjdad.png'></div>" +
                           "<div class='box'><img class='hat' src='images/hat_supremacy.png'></div>" +
                           "<div class='box'><img class='hat' src='images/hat_pink_panther.png'></div>");
    } else if (page == "music") {
        $("#content").html(
            "<div class='box'><a href='https://itunes.apple.com/album/id1375809976?ls=1&app=itunes'><img class='album_cover' src='images/album_cover_yy.jpg' data-cover='images/album_cover_yy.jpg' data-back='images/album_back_yy.jpg' alt='Yellow Yellow'/></a></div>" +
            "<div class='box'><a href='https://itunes.apple.com/us/album/the-partys-over-ep/1304105898'><img class='album_cover' data-cover='images/album_cover_partys_over.jpg' data-back='images/album_back_partys_over.jpg' src='images/album_cover_partys_over.jpg' alt='The Partys Over'/></a></div>" +
            "<div class='box'><a href='https://soundcloud.com/cheezcakekidzrecords/sets/tha-black-punks'><img class='album_cover' data-cover='images/album_cover_black_punks.jpg' data-back='images/album_back_black_punks.jpg' src='images/album_cover_black_punks.jpg' alt='Tha Black Punks'/></a></div>" +
            "<div class='box'><a href='https://soundcloud.com/cheezcakekidzrecords/sets/young-jimmy-hood-rock'><img class='album_cover' data-cover='images/album_cover_hood_rock.jpg' data-back='images/album_cover_hood_rock.jpg' src='images/album_cover_hood_rock.jpg' alt='Hood Rock'/></a></div>" +
            "<div class='box'><a href='images/album_back_hood_rock_2.jpg'><img class='album_cover' data-cover='images/album_cover_hood_rock_2.jpg' data-back='images/album_back_hood_rock_2.jpg' src='images/album_cover_hood_rock_2.jpg' alt='Hood Rock 2'/></a></div>" +
            "<div class='box'><a href='https://soundcloud.com/cheezcakekidzrecords/sets/to-my-chagrin'><img class='album_cover' data-cover='images/album_cover_sankofa.jpg' data-back='images/album_cover_sankofa.jpg' src='images/album_cover_sankofa.jpg' alt='Sankofa'/></a></div>"
                          );
        $("#soundcloud_player_iframe").css("height", "400px");
        $("#soundcloud_player_iframe").css("position", "relative");
    } else if (page == "press") {
        $("#content").html("<a href='http://afropunk.com/2014/10/new-music-unreleased-sankofa-album-to-my-chagrin-featuring-young-jimmy/'><img class='big_img' src='images/yj_afropunk.jpg' alt='Afropunk'/></a>");
    } else if (page == "shows") {
        $("#content").html(
            "<div class='box'><a href='https://www.ticketweb.com/event/late-to-the-party-yj-sobs-tickets/8361045?pl=sobs&edpPlParam=%3Fpl%3Dsobs'><img class='poster' src='images/poster_show_jun_12_2018.jpg'></a><br/>June 12, 2018</div>" +
            "<div class='box'><img class='poster' src='images/poster_tour_ces_cru.jpg'><br/>March 18, 2018</div>" +
            "<div class='box'><img class='poster' src='images/poster_show_jan_7.jpg'><br/>January 7, 2018</div>" +
            "<div class='box'><img class='poster' src='images/poster_show_sep_23_2017.jpg'><br/>September 23, 2017</div>");
    }
}


function getAnchor() {
    return (document.URL.split('#').length > 1) ? document.URL.split('#')[1] : null;
}

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
        $("#button_play_pause i").html("pause");
        audio_state = "playing";
        update_song_info();
    });
    $("#button_next").on("click", function() {
        sc_widget.next();
        $("#button_play_pause i").html("pause");
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
    if (sc_widget == null) {
        return;
    }
    sc_widget.getCurrentSound(function(sound) {
        $("#song_title").html("<a href=\"https://soundcloud.com/cheezcakekidzrecords/" + sound.permalink + "\">" + sound.title + "</a>");
        // See Waveform.js for showing waveforms.
        // https://developers.soundcloud.com/blog/waveforms-let-s-talk-about-them
        // sound.waveform_url
    });
}
