$(".menuItems a").click(function () {
  setSelectedPage($(this).attr("id"));
});

$(".rightMenu a").click(function () {
  setSelectedPage($(this).attr("id"));
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

if (userEmail !== "Not Found") {
  let users = JSON.parse(localStorage.getItem("userData"));
  let img;
  for (var i = 0; i < users.length; i++) {
    if (userEmail === users[i].email) img = users[i].image;
  }
  $("#profile").css("display", "unset");
  $("#profile img").attr("src", img);
}

$("#signInbtn").click(function () {
  if (userEmail !== "Not Found") {
    cookie.deleteCookie("useremail");
  }
  setSelectedPage("signInbtn");
});

function changeSignInOut() {
  if (userEmail != "Not Found") {
    $("#signInbtn").html("Sign out");
  }
}
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

changeSignInOut();

updateUserwishListNumber();
