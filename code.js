var ids = { albums: 0, videos: 0 };
var videos = [
  "uC3PjsUqikE",
  "DuwOr4_74cg",
  "qF_HVIrmcsY",
  "nfKMVYzotT8",
  "fanQHFAxXH0",
  "GomVGDUAe44",
];
var albums = [
  {
    font: "album_cover_rockett_88.jpg",
    back: "album_back_rockett_88.jpg",
    title: "ROCKETT 88<br/>Debut Studio Album<br/>5/7/2021",
    alt: "ROCKETT 88",
    url: "https://itunes.apple.com/ca/artist/young-jimmy/579723816",
  },
  {
    font: "album_cover_beast_mode.jpg",
    back: "",
    title: "BEAST MODE<br/>New Single",
    alt: "BEAST MODE",
    url: "https://itunes.apple.com/ca/artist/young-jimmy/579723816",
  },
  {
    font: "album_cover_yy.jpg",
    back: "",
    title: "YELLOW YELLOW",
    alt: "YELLOW YELLOW",
    url: "https://itunes.apple.com/ca/artist/young-jimmy/579723816",
  },
];
var album_id = 0;

$(function () {
  setVideo();
  setAlbum();
  handleLink("music");
  handleLink("videos");
  handleLink("bio");
  handleLink("subscribe");
  $("#menu_pulldown").on("click", function () {
    $("#menu_panel").toggle();
  });
  $("#button_video_previous").on("click", function () {
    prevID(videos, "videos");
    setVideo();
  });
  $("#button_video_next").on("click", function () {
    nextID(videos, "videos");
    setVideo();
  });
  $("#button_album_previous").on("click", function () {
    prevID(albums, "albums");
    setAlbum();
  });
  $("#button_album_next").on("click", function () {
    nextID(albums, "albums");
    setAlbum();
  });
  $("#button_read_more").on("click", function () {
    console.log("button read more");
    $("#read_more").hide();
    $("#div_bio").css("max-height", "100%");
    $("#div_bio").css("overflow-y", "scroll");
  });

  $("#logo_hood_rock").on("mouseover", function () {
    $(this).attr("src", "images/logo_hood_rock_records_red.png");
  });
  $("#logo_hood_rock").on("mouseout", function () {
    $(this).attr("src", "images/logo_hood_rock_records_white.png");
  });

  window.addEventListener("resize", function () {
    if (window.innerWidth >= 1280) {
      $("#menu_panel").hide();
    }
  });
});

function nextID(arr, id) {
  if (++ids[id] >= arr.length) {
    ids[id] = 0;
  }
}
function prevID(arr, id) {
  if (--ids[id] < 0) {
    ids[id] = arr.length - 1;
  }
}

function setVideo() {
  $("#video").attr(
    "src",
    "https://www.youtube.com/embed/" + videos[ids["videos"]]
  );
}

function setAlbum() {
  let album = albums[ids["albums"]];
  let html =
    `<a href="` +
    album["url"] +
    `"><img class="album_cover"
  src="images/` +
    album["font"] +
    `" data-cover="images/` +
    album["font"] +
    `"` +
    ` data-back="images/` +
    album["back"] +
    `" alt="` +
    album["alt"] +
    `"></a><div class="album_title"><a href="` +
    album["url"] +
    `">` +
    album["title"] +
    `</a></div>`;
  $("#album").html(html);
  $(".album_cover").on("mouseover", function () {
    if ($(this).data("back") !== "images/") {
      $(this).attr("src", $(this).data("back"));
    }
  });
  $(".album_cover").on("mouseout", function () {
    $(this).attr("src", $(this).data("cover"));
  });
}

function handleLink(name) {
  $(".link_" + name).click(function () {
    $([document.documentElement, document.body]).animate(
      {
        scrollTop: $("#" + name).offset().top - 80,
      },
      1000
    );
  });
}
