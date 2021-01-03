$(window).scroll(function () {
  //console.log("scroll" + $(document).scrollTop());
  if ($(document).scrollTop() > 50) {
    $(".navbar").addClass("newOpacity");
  } else {
    $(".navbar").removeClass("newOpacity");
  }
});

$(".menuItems a").click(function () {
  setSelectedPage($(this).attr("id"));
});

$("#signInbtn").click(function () {
  setSelectedPage("signInbtn");
});

$("#shoppingCart").click(function () {
  setSelectedPage("cartlogo");
});

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

changeSeletedItemStyle();
