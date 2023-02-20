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
        node: document.getElementById("collection-component-1676138676332"),
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
                color: "#060000",
              },
              button: {
                "font-weight": "bold",
                color: "#050000",
                ":hover": {
                  color: "#050000",
                  "background-color": "#d2e302",
                },
                "background-color": "#e9fc02",
                ":focus": {
                  "background-color": "#d2e302",
                },
              },
              price: {
                color: "#080000",
              },
              compareAt: {
                color: "#080000",
              },
              unitPrice: {
                color: "#080000",
              },
            },
            buttonDestination: "modal",
            contents: {
              options: false,
            },
            text: {
              button: "View product",
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
                "font-weight": "bold",
                color: "#050000",
                ":hover": {
                  color: "#050000",
                  "background-color": "#d2e302",
                },
                "background-color": "#e9fc02",
                ":focus": {
                  "background-color": "#d2e302",
                },
              },
              title: {
                "font-family": "Helvetica Neue, sans-serif",
                "font-weight": "bold",
                "font-size": "26px",
                color: "#060000",
              },
              price: {
                "font-family": "Helvetica Neue, sans-serif",
                "font-weight": "normal",
                "font-size": "18px",
                color: "#050000",
              },
              compareAt: {
                "font-family": "Helvetica Neue, sans-serif",
                "font-weight": "normal",
                "font-size": "15.299999999999999px",
                color: "#050000",
              },
              unitPrice: {
                "font-family": "Helvetica Neue, sans-serif",
                "font-weight": "normal",
                "font-size": "15.299999999999999px",
                color: "#050000",
              },
              description: {
                color: "#050000",
              },
            },
            text: {
              button: "Add to cart",
            },
          },
          option: {
            styles: {
              label: {
                color: "#050000",
              },
            },
          },
          cart: {
            styles: {
              button: {
                "font-weight": "bold",
                color: "#050000",
                ":hover": {
                  color: "#050000",
                  "background-color": "#d2e302",
                },
                "background-color": "#e9fc02",
                ":focus": {
                  "background-color": "#d2e302",
                },
              },
              title: {
                color: "#0a0000",
              },
              header: {
                color: "#0a0000",
              },
              lineItems: {
                color: "#0a0000",
              },
              subtotalText: {
                color: "#0a0000",
              },
              subtotal: {
                color: "#0a0000",
              },
              notice: {
                color: "#0a0000",
              },
              currency: {
                color: "#0a0000",
              },
              close: {
                color: "#0a0000",
                ":hover": {
                  color: "#0a0000",
                },
              },
              empty: {
                color: "#0a0000",
              },
              noteDescription: {
                color: "#0a0000",
              },
              discountText: {
                color: "#0a0000",
              },
              discountIcon: {
                fill: "#0a0000",
              },
              discountAmount: {
                color: "#0a0000",
              },
              cart: {
                "background-color": "#fffdfd",
              },
              footer: {
                "background-color": "#fffdfd",
              },
            },
            text: {
              total: "Subtotal",
              button: "Checkout",
            },
            popup: false,
          },
          toggle: {
            styles: {
              toggle: {
                "font-weight": "bold",
                "background-color": "#e9fc02",
                ":hover": {
                  "background-color": "#d2e302",
                },
                ":focus": {
                  "background-color": "#d2e302",
                },
              },
              count: {
                color: "#050000",
                ":hover": {
                  color: "#050000",
                },
              },
              iconPath: {
                fill: "#050000",
              },
            },
          },
          lineItem: {
            styles: {
              variantTitle: {
                color: "#0a0000",
              },
              title: {
                color: "#0a0000",
              },
              price: {
                color: "#0a0000",
              },
              fullPrice: {
                color: "#0a0000",
              },
              discount: {
                color: "#0a0000",
              },
              discountIcon: {
                fill: "#0a0000",
              },
              quantity: {
                color: "#0a0000",
              },
              quantityIncrement: {
                color: "#0a0000",
                "border-color": "#0a0000",
              },
              quantityDecrement: {
                color: "#0a0000",
                "border-color": "#0a0000",
              },
              quantityInput: {
                color: "#0a0000",
                "border-color": "#0a0000",
              },
            },
          },
        },
      });
    });
  }
})();
/*]]>*/
