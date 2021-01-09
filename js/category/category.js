$("#header").load("./navbar.html");
$("#searchbar").load("./search.html");
$("#footer").load("./footer.html");
$("#sideBar").load("./sideBar.html");

setTimeout(function () {
  $("#bodyDivId").show();
  $("#header").show();
  $("#footer").show();
  $("#sideBar").show();
  $("#preLoader").hide();
}, 300);

$(window).scroll(function (event) {
  if (
    $(window).scrollTop() + $(window).height() >=
    $(document).height() - 300
  ) {
    $("#sideBar").css("visibility", "hidden");
  } else {
    $("#sideBar").css("visibility", "visible");
  }
  // Do something
});

var booksJsObj;

$("document").ready(function () {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "../../DB/booksData.json");
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4)
      if (xhr.status >= 200 && xhr.status <= 300) {
        booksJsObj = JSON.parse(xhr.responseText);

        var booksObjKeys = Object.keys(booksJsObj);

        for (var i = 0; i < Object.keys(booksJsObj).length; i++) {
          var checkFirstCreation = true;
          var CategDivData = createCategDiv(i, booksJsObj, checkFirstCreation);
          var catBooksdivID = CategDivData[0];

          for (var j = 0; j < 3; j++) {
            createBooksDiv(i, j, booksJsObj, CategDivData);
          }
        }
      }
  };
  xhr.send("");
});
