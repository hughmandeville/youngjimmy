var ids = { albums: 0, videos: 0 };
var videos = ["xK6mYENLsfo", "DuwOr4_74cg", "qF_HVIrmcsY", "nfKMVYzotT8"];
var albums = [
  {
    font: "album_cover_rockett_88.jpg",
    back: "album_cover_rockett_88.jpg",
    title: "Rockett 88 - 2/26/2021",
    url: "https://itunes.apple.com/ca/artist/young-jimmy/579723816",
  },
  {
    font: "album_cover_yy.jpg",
    back: "album_back_yy.jpg",
    title: "Yellow Yellow",
    url: "https://itunes.apple.com/ca/artist/young-jimmy/579723816",
  },
];
var album_id = 0;

$(function () {
  setVideo();
  setAlbum();
  handleLink("videos");
  handleLink("music");
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
    album["title"] +
    `"></a><div class="album_title"><a href="` +
    album["url"] +
    `">` +
    album["title"] +
    `</a></div>`;
  $("#album").html(html);
}

function handleLink(name) {
  $(".link_" + name).click(function () {
    $([document.documentElement, document.body]).animate(
      {
        scrollTop: $("#" + name).offset().top,
      },
      1000
    );
  });
}

/*
  setup_soundcloud_player();
  $(".album_cover").on("mouseover", function () {
    $(this).attr("src", $(this).data("back"));
  });
  $(".album_cover").on("mouseout", function () {
    $(this).attr("src", $(this).data("cover"));
  });
*/
