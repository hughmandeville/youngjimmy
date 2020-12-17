var ids = { albums: 0, videos: 0 };
var videos = [
  "xK6mYENLsfo",
  "DuwOr4_74cg",
  "qF_HVIrmcsY",
  "nfKMVYzotT8",
  "uC3PjsUqikE",
];
var albums = [
  {
    font: "album_cover_rockett_88.jpg",
    back: "album_back_rockett_88.jpg",
    title:
      "ROCKETT 88<br/>DEBUT STUDIO ALBUM<br/>3/19/2021<br/>PRE-ORDER 2/12/2021",
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
    album["title"] +
    `"></a><div class="album_title"><a href="` +
    album["url"] +
    `">` +
    album["title"] +
    `</a></div>`;
  $("#album").html(html);
  $(".album_cover").on("mouseover", function () {
    $(this).attr("src", $(this).data("back"));
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

// Shopify merchandise links.

/*<![CDATA[*/
(function () {
  var scriptURL =
    "https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js";
  if (window.ShopifyBuy) {
    if (window.ShopifyBuy.UI) {
      ShopifyBuyInit();
    } else {
      loadScript();
    }
  } else {
    loadScript();
  }
  function loadScript() {
    var script = document.createElement("script");
    script.async = true;
    script.src = scriptURL;
    (
      document.getElementsByTagName("head")[0] ||
      document.getElementsByTagName("body")[0]
    ).appendChild(script);
    script.onload = ShopifyBuyInit;
  }
  function ShopifyBuyInit() {
    var client = ShopifyBuy.buildClient({
      domain: "hood-rock-records.myshopify.com",
      storefrontAccessToken: "cb7c415588c189067d14346ef59a3103",
    });
    ShopifyBuy.UI.onReady(client).then(function (ui) {
      ui.createComponent("collection", {
        id: "237882900662",
        node: document.getElementById("collection-component-1608128092468"),
        moneyFormat: "%24%7B%7Bamount%7D%7D",
        options: {
          product: {
            styles: {
              product: {
                "@media (min-width: 601px)": {
                  "max-width": "calc(25% - 20px)",
                  "margin-left": "20px",
                  "margin-bottom": "50px",
                  width: "calc(25% - 20px)",
                },
                img: {
                  height: "calc(100% - 15px)",
                  position: "absolute",
                  left: "0",
                  right: "0",
                  top: "0",
                },
                imgWrapper: {
                  "padding-top": "calc(75% + 15px)",
                  position: "relative",
                  height: "0",
                },
              },
              title: {
                color: "#050505",
              },
              button: {
                ":hover": {
                  "background-color": "#e10505",
                },
                "background-color": "#fa0606",
                ":focus": {
                  "background-color": "#e10505",
                },
              },
              price: {
                color: "#050505",
              },
              compareAt: {
                color: "#050505",
              },
              unitPrice: {
                color: "#050505",
              },
            },
            buttonDestination: "checkout",
            contents: {
              button: false,
              buttonWithQuantity: true,
            },
            text: {
              button: "Buy now",
            },
          },
          productSet: {
            styles: {
              products: {
                "@media (min-width: 601px)": {
                  "margin-left": "-20px",
                },
              },
            },
          },
          modalProduct: {
            contents: {
              img: false,
              imgWithCarousel: true,
              button: false,
              buttonWithQuantity: true,
            },
            styles: {
              product: {
                "@media (min-width: 601px)": {
                  "max-width": "100%",
                  "margin-left": "0px",
                  "margin-bottom": "0px",
                },
              },
              button: {
                ":hover": {
                  "background-color": "#e10505",
                },
                "background-color": "#fa0606",
                ":focus": {
                  "background-color": "#e10505",
                },
              },
            },
            text: {
              button: "Add to cart",
            },
          },
          option: {
            styles: {
              label: {
                "font-weight": "bold",
              },
              select: {
                "font-weight": "bold",
              },
            },
          },
          cart: {
            styles: {
              button: {
                ":hover": {
                  "background-color": "#e10505",
                },
                "background-color": "#fa0606",
                ":focus": {
                  "background-color": "#e10505",
                },
              },
            },
            text: {
              total: "Subtotal",
              button: "Checkout",
            },
          },
          toggle: {
            styles: {
              toggle: {
                "background-color": "#fa0606",
                ":hover": {
                  "background-color": "#e10505",
                },
                ":focus": {
                  "background-color": "#e10505",
                },
              },
            },
          },
        },
      });
    });
  }
})();
/*]]>*/
