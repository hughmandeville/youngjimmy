var ids = { albums: 0, images: 0, videos: 0 };

var albums = [
  {
    font: "album_cover_rockett_88_new.jpg",
    back: "",
    title: "ROCKETT 88 (Deluxe)<br/>2023",
    alt: "ROCKETT 88",
    url: "https://music.apple.com/us/album/rockett-88/1562590289",
  },
  {
    font: "album_cover_rockett_88.jpg",
    back: "album_back_rockett_88.jpg",
    title: "ROCKETT 88<br/>Debut Studio Album<br/>OUT NOW!",
    alt: "ROCKETT 88",
    url: "https://music.apple.com/us/album/rockett-88/1562590289",
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
  {
    font: "album_cover_pull_up_to_the_party.jpg",
    back: "",
    title: "Pull Up to the Party<br/>1/27/2023",
    alt: "Pull Up to the Party",
    url: "https://youngjimmy.lnk.to/pulluptotheparty",
  },
  {
    font: "album_cover_sweet_maria.jpg",
    back: "",
    title: "Sweet Maria<br/>2/17/2023",
    alt: "Sweet Maria",
    url: "https://itunes.apple.com/ca/artist/young-jimmy/579723816",
  },
  {
    font: "album_cover_come_as_you_are.jpg",
    back: "",
    title: "Come As You Are<br/> 3/24/2023",
    alt: "Come As You Are",
    url: "https://itunes.apple.com/ca/artist/young-jimmy/579723816",
  },
];
var images = [
  //"yj_main_5.jpg",
  //"yj_main_6.jpg",
  //"yj_main_7.jpg",
  //"yj_main_8.jpg",
  "yj_main_9.jpg",
  "yj_main_10.jpg",
  "yj_main_11.jpg",
];

var videos = [
  "W8ey9YNbEAM", // Pull Up To The Party
  "Y9QAvd7ZDzU", // Summer Days
  "DuwOr4_74cg", // Uptown Gun Sounds
  "5m7gpzyyX3Y", // The Movies
  "R-wFKlSaMck", // Beast Mode
  "ycg0657Pgb8", // C'est La Vie In NYC
  "uC3PjsUqikE", // Date Night
  "fanQHFAxXH0", // Afropunk
];

$(function () {
  setAlbum();
  setVideo();
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
    $(this).attr("src", "images/logo_hood_rock_records_black.png");
  });

  window.addEventListener("resize", function () {
    if (window.innerWidth >= 1280) {
      $("#menu_panel").hide();
    }
  });
  setInterval(nextImage, 30000);
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

function nextImage() {
  ids["images"]++;
  if (ids["images"] >= images.length) {
    ids["images"] = 0;
  }
  $("#main_img").attr("src", "images/" + images[ids["images"]]);
}

function setVideo() {
  $("#video").attr(
    "src",
    "https://www.youtube.com/embed/" + videos[ids["videos"]]
  );
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
