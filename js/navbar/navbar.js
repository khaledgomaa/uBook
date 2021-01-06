$(".menuItems a").click(function () {
  setSelectedPage($(this).attr("id"));
});

$("#signInbtn").click(function () {
  setSelectedPage("signInbtn");
});

$("#shoppingCart").click(function () {
  setSelectedPage("cartlogo");
});

var userEmail = cookie.getCookie("useremail");
var allCartItems = JSON.parse(localStorage.getItem("cartItems"));
var cartitem = findItem(allCartItems, userEmail);
var wishItems = findItem(
  JSON.parse(localStorage.getItem("wishListCart")),
  userEmail
);

function changeSeletedItemStyle() {
  var selected = cookie.getCookie("selected").trim();
  if (selected !== "Not Found") {
    $("#" + selected).addClass("selectedItem");
  } else {
    setSelectedPage("home");
    changeSeletedItemStyle();
  }
}

function setSelectedPage(item) {
  cookie.setCookie("selected", item);
}

function computeTotalItems() {
  var total = 0;
  if (cartitem !== undefined) {
    for (var i = 0; i < cartitem.items.length; i++) {
      total += cartitem.items[i].qty;
    }
  }

  return total;
}

function computeTotalWishItems() {
  var total = 0;
  if (wishItems !== undefined) {
    total = wishItems.items.length;
  }

  return total;
}

function updateUsercartItemsNumber() {
  document.getElementsByClassName("numberlogo")[0].innerHTML =
    userEmail == "Not Found" ? 0 : computeTotalItems();
}

function updateUserwishListNumber() {
  document.getElementsByClassName("numberwish")[0].innerHTML =
    userEmail == "Not Found" ? 0 : computeTotalWishItems();
}

changeSeletedItemStyle();
updateUsercartItemsNumber();
updateUserwishListNumber();
