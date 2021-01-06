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
  for (var i = 0; i < cartitem.items.length; i++) {
    total += cartitem.items[i].qty;
  }

  return total;
}

function updateUsercartItemsNumber() {
  if (userEmail == "Not Found") {
    document.getElementsByClassName("numberlogo")[0].innerHTML = 0;
  } else {
    document.getElementsByClassName(
      "numberlogo"
    )[0].innerHTML = computeTotalItems();
  }
}

changeSeletedItemStyle();
updateUsercartItemsNumber();
