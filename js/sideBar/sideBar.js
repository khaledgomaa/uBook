/*  $( function() {
    $( "#sliderRange" ).slider();
  } );
*/
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
          createDiv(i, Object.keys(booksJsObj)[i]);
        }
        createSlider();
      }
  };
  xhr.send("");
});

function createDiv(i, categTitle) {
  $("#sideCategDiv").append(
    "<div class='checkbox-custom'>" +
      "<a href='selectedCateg.html'><input type='button' class='categbtn' id='" +
      (i + 1) +
      "' value='" +
      categTitle +
      "'></a>" +
      "</div>"
  );
  createClickEventListener(i + 1, categTitle);
}

function createClickEventListener(btnid, categTitle) {
  document.getElementById(btnid).addEventListener("click", function () {
    cookie.setCookie("selectedCategory", categTitle);
  });
}

function getMaxMinPrices() {
  var min = booksJsObj[Object.keys(booksJsObj)[0]][0]["price"];
  var max = booksJsObj[Object.keys(booksJsObj)[0]][0]["price"];
  for (var i = 0; i < Object.keys(booksJsObj).length; i++) {
    for (var j = 0; j < booksJsObj[Object.keys(booksJsObj)[i]].length; j++) {
      if (booksJsObj[Object.keys(booksJsObj)[i]][j]["price"] < min)
        min = booksJsObj[Object.keys(booksJsObj)[i]][j]["price"];

      if (booksJsObj[Object.keys(booksJsObj)[i]][j]["price"] > max)
        max = booksJsObj[Object.keys(booksJsObj)[i]][j]["price"];
    }
  }

  return [min, max];
}

function createSlider() {
  var priceRange = getMaxMinPrices();
  var min = priceRange[0];
  var max = priceRange[1];
  $("#slider-range").append(
    "<input type='range' min='" +
      min +
      "' max='" +
      max +
      "' value='" +
      max +
      "' class='slider' id='myRange'><br/><a href='booksByPrice.html'><input type='button' value='Find books in range' id='rangebtn' class='categbtn'></a>"
  );

  $("#fromtxt").val(min);
  addSliderEventListener();
  addPriceBtnEvtListnr();
}

function addSliderEventListener() {
  document.getElementById("myRange").addEventListener("change", function () {
    $("#totxt").val(this.value);
  });
}

function addPriceBtnEvtListnr() {
  document.getElementById("rangebtn").addEventListener("click", function () {
    max = $("#totxt").val();
    min = $("#fromtxt").val();
    cookie.setCookie("maxPrice", max);
    cookie.setCookie("minPrice", min);
  });
}
