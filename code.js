/*
 * https://developers.soundcloud.com/docs/api/html5-widget
 *
 */
var audio_state = "playing"; // playing or paused
var sc_widget = null;

$(function () {
  set_content();
  setup_soundcloud_player();
  $("#more").on("click", function () {
    $("#social_links").toggle();
  });
  $("#menu_pulldown").on("click", function () {
    $("#menu_panel").toggle();
  });
  $(".album_cover").on("mouseover", function () {
    $(this).attr("src", $(this).data("back"));
  });
  $(".album_cover").on("mouseout", function () {
    $(this).attr("src", $(this).data("cover"));
  });
  $(".link_subscribe").on("click", function () {
    $("#modal_subscribe").toggle();
  });
  $("#modal_close").on("click", function () {
    $("#modal_subscribe").hide();
  });

  window.addEventListener("resize", function () {
    if (window.innerWidth >= 1280) {
      $("#social_links").show();
    }
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
  if (page == "" || page == "index.html" || page == "index2.html") {
    page = "index";
  }
  $("body").removeClass();
  $("body").addClass("bg_yellow");
  if (page == "bio") {
    $("#content").html($("#template_bio").html());
  } else if (page == "index") {
    $("body").removeClass();
    $("body").addClass("bg_black");
    $("#content").html($("#template_index").html());
  } else if (page == "merch") {
    $("#content").html($("#template_merch").html());
  } else if (page == "music") {
    $("#content").html($("#template_music").html());
    $("#soundcloud_player_iframe").css("height", "400px");
    $("#soundcloud_player_iframe").css("position", "relative");
  } else if (page == "press") {
    $("#content").html($("#template_press").html());
  } else if (page == "shows") {
    $("#content").html($("#template_shows").html());
  }
}

function getAnchor() {
  return document.URL.split("#").length > 1 ? document.URL.split("#")[1] : null;
}

/**
 * Setup the SoundCloud player.
 */
function setup_soundcloud_player() {
  var sc_iframe = document.querySelector("#soundcloud_player_iframe");
  sc_widget = SC.Widget(sc_iframe);

  if (sc_widget == null) {
    return;
  }

  sc_widget.bind(SC.Widget.Events.READY, function () {
    update_song_info();
  });
  sc_widget.bind(SC.Widget.Events.FINISH, function () {
    update_song_info();
  });
  sc_widget.bind(SC.Widget.Events.PLAY, function () {
    update_song_info();
  });

  $("#button_play_pause").on("click", function () {
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
  $("#button_previous").on("click", function () {
    sc_widget.prev();
    $("#button_play_pause i").html("pause");
    audio_state = "playing";
    update_song_info();
  });
  $("#button_next").on("click", function () {
    sc_widget.next();
    $("#button_play_pause i").html("pause");
    audio_state = "playing";
    update_song_info();
  });

  $(".track").on("click", function () {
    if ($(this).data("track").length == 0) {
      return;
    }
    $(".col_action").html("play");
    $(this).find(".col_action").html("pause");
    sc_widget.skip($(this).data("track"));
    $("#button_play_pause").attr("src", "images/button_pause.png");
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
  sc_widget.getCurrentSound(function (sound) {
    $("#song_title").html(
      '<a href="https://soundcloud.com/cheezcakekidzrecords/' +
        sound.permalink +
        '">' +
        sound.title +
        "</a>"
    );
    // See Waveform.js for showing waveforms.
    // https://developers.soundcloud.com/blog/waveforms-let-s-talk-about-them
    // sound.waveform_url
  });
}
