$(".bookimg").hover(function () {
  $(this).toggleClass("classWithShadow");
});
$("#header").load("./navbar.html");
$("#searchbar").load("./search.html");
$("#footer").load("./footer.html");

setTimeout(function () {
  $("#bodyDivId").show();
  $("#header").show();
  $("#footer").show();
  $("#preLoader").hide();
}, 300);

var booksJsObj;
var cellClassnum = -1;

$("document").ready(function () {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "../../DB/booksData.json");
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4)
      if (xhr.status >= 200 && xhr.status <= 300) {
        booksJsObj = JSON.parse(xhr.responseText);

        var catTitledivId = "categTitle";
        var catBooksdivID = "bkdiv";
        for (var i = 0; i < Object.keys(booksJsObj).length; i++) {
          var catBooksdiv = document.createElement("div");
          catBooksdivID += "I";
          catBooksdiv.setAttribute("id", catBooksdivID);
          catBooksdiv.setAttribute("class", "bkdiv");
          document.getElementById("categories").appendChild(catBooksdiv);

          var catTitlediv = document.createElement("div");
          catTitledivId += "I";
          catTitlediv.setAttribute("id", catTitledivId);
          catTitlediv.setAttribute("class", "categTitle");
          var categoryTiltle = Object.keys(booksJsObj)[i];
          catTitlediv.innerHTML = "<b>" + categoryTiltle + "</b>";
          document.getElementsByClassName("bkdiv")[i].appendChild(catTitlediv);

          var leftimgdiv = document.createElement("div");
          leftimgdiv.setAttribute("class", "cell");
          var lftArrDid = "lftArrDiv" + i;
          leftimgdiv.setAttribute("id", lftArrDid);
          cellClassnum++;
          document.getElementsByClassName("bkdiv")[i].appendChild(leftimgdiv);

          var leftimg = document.createElement("img");
          leftimg.setAttribute("class", "arrowimg");
          leftimg.src = "../../images/left.png";
          document.getElementsByClassName("cell")[cellClassnum].append(leftimg);
          var BooksNum = booksJsObj[Object.keys(booksJsObj)[i]].length;
          leftimg.addEventListener(
            "click",
            (function (catBooksdivID, i, BooksNum) {
              return function () {
                return swipToRight(catBooksdivID, i, BooksNum);
              };
            })(catBooksdivID, i, BooksNum)
          );
          leftimg.style.visibility = "hidden";

          for (var j = 0; j < 4; j++) {
            var bkimgdiv = document.createElement("div");
            bkimgdiv.setAttribute("class", "cell");
            var imDivId = booksJsObj[Object.keys(booksJsObj)[i]][j]["id"];
            bkimgdiv.setAttribute("id", imDivId);
            cellClassnum++;
            document.getElementsByClassName("bkdiv")[i].appendChild(bkimgdiv);

            var bkimg = document.createElement("img");
            bkimg.setAttribute("class", "bookimg");
            var imgId = "book" + (j + 1).toString + "img";
            bkimg.setAttribute("id", imgId);
            bkimg.src =
              "../../images/" +
              booksJsObj[Object.keys(booksJsObj)[i]][j]["image"];
            var bookid = booksJsObj[Object.keys(booksJsObj)[i]][j]["id"];
            console.log(bookid);
            bkimg.addEventListener(
              "click",
              (function (bookid) {
                return function () {
                  return cookie.setCookie("selectedBook", bookid);
                };
              })(bookid)
            );

            document.getElementsByClassName("cell")[cellClassnum].append(bkimg);

            var authLabel = document.createElement("label");
            authLabel.setAttribute("class", "AuthLab");
            authLabel.innerHTML =
              "$" + booksJsObj[Object.keys(booksJsObj)[i]][j]["author"];
            document
              .getElementsByClassName("cell")
              [cellClassnum].append(authLabel);

            var priceLabel = document.createElement("label");
            priceLabel.setAttribute("class", "PricLab");
            priceLabel.innerHTML =
              "$" + booksJsObj[Object.keys(booksJsObj)[i]][j]["price"];
            document
              .getElementsByClassName("cell")
              [cellClassnum].append(priceLabel);
          }

          var rightimgdiv = document.createElement("div");
          rightimgdiv.setAttribute("class", "cell");
          var rightDid = "rightDivID" + i;
          rightimgdiv.setAttribute("id", rightDid);
          cellClassnum++;
          document.getElementsByClassName("bkdiv")[i].appendChild(rightimgdiv);

          var rightimg = document.createElement("img");
          rightimg.setAttribute("class", "arrowimg");
          var rightimid = "right" + i;
          rightimg.setAttribute("id", rightimid);
          rightimg.src = "../../images/right.png";
          document
            .getElementsByClassName("cell")
            [cellClassnum].append(rightimg);
          rightimg.addEventListener(
            "click",
            (function (catBooksdivID, i, BooksNum) {
              return function () {
                return swipToLeft(catBooksdivID, i, BooksNum);
              };
            })(catBooksdivID, i, BooksNum)
          );
        }

        $(".bookimg").hover(function () {
          $(this).toggleClass("classWithShadow");
        });
      }
  };
  xhr.send("");
});

var rightHidden = false; //array?
var leftHidden = true; //array?

function swipToLeft(cID, idx, NumofBooks) {
  var temp = document.getElementById(cID);
  var bookId = $("#" + cID)
    .find("div:eq(2)")
    .attr("id");

  var BookIdx = findItemIndex(
    booksJsObj[Object.keys(booksJsObj)[idx]],
    +bookId
  );

  if (BookIdx < booksJsObj[Object.keys(booksJsObj)[idx]].length - 4) {
    document.getElementById("categories").removeChild(temp);

    var catBooksdiv = document.createElement("div");
    var catBkdivID = "bkdiv";
    for (j = 0; j <= idx; j++) {
      catBkdivID += "I";
    }
    var nextNode = catBkdivID + "I";
    catBooksdiv.setAttribute("id", catBkdivID);
    catBooksdiv.setAttribute("class", "bkdiv");
    document
      .getElementById("categories")
      .insertBefore(catBooksdiv, document.getElementById(nextNode));

    var catTitlediv = document.createElement("div");
    var catTitId = "categTitle";
    for (j = 0; j < idx; j++) {
      catTitId += "I";
    }
    catTitlediv.setAttribute("id", catTitId);
    catTitlediv.setAttribute("class", "categTitle");
    var categoryTiltle = Object.keys(booksJsObj)[idx];
    catTitlediv.innerHTML = "<b>" + categoryTiltle + "</b>";
    document.getElementById(catBkdivID).appendChild(catTitlediv);

    var leftimgdiv = document.createElement("div");
    leftimgdiv.setAttribute("class", "cell");
    var lftArrDivid = "lftArrDiv" + idx;
    leftimgdiv.setAttribute("id", lftArrDivid);

    document.getElementById(catBkdivID).appendChild(leftimgdiv);

    var leftimg = document.createElement("img");
    leftimg.setAttribute("class", "arrowimg");
    var leftimgid = "left" + idx;
    leftimg.setAttribute("id", leftimgid);
    leftimg.src = "../../images/left.png";
    document.getElementById(lftArrDivid).append(leftimg);
    leftimg.addEventListener(
      "click",
      (function (cID, idx, NumofBooks) {
        return function () {
          return swipToRight(cID, idx, NumofBooks);
        };
      })(cID, idx, NumofBooks)
    );

    for (j = +BookIdx + 1; j <= +BookIdx + 4; j++) {
      var bkimgdiv = document.createElement("div");
      bkimgdiv.setAttribute("class", "cell");
      //var imDivId = "ImDiv"+idx+""+j;
      var imDivId = booksJsObj[Object.keys(booksJsObj)[idx]][j]["id"];

      bkimgdiv.setAttribute("id", imDivId);
      document.getElementById(catBkdivID).appendChild(bkimgdiv);

      var bkimg = document.createElement("img");
      bkimg.setAttribute("class", "bookimg");

      bkimg.src =
        "../../images/" + booksJsObj[Object.keys(booksJsObj)[idx]][j]["image"];
      var bookid = booksJsObj[Object.keys(booksJsObj)[idx]][j]["id"];
      bkimg.addEventListener(
        "click",
        (function (bookid) {
          return function () {
            return cookie.setCookie("selectedBook", bookid);
          };
        })(bookid)
      );

      document.getElementById(imDivId).append(bkimg);

      var authLabel = document.createElement("label");
      authLabel.setAttribute("class", "AuthLab");
      authLabel.innerHTML =
        "$" + booksJsObj[Object.keys(booksJsObj)[idx]][j]["author"];
      document.getElementById(imDivId).append(authLabel);

      var priceLabel = document.createElement("label");
      priceLabel.setAttribute("class", "PricLab");
      priceLabel.innerHTML =
        "$" + booksJsObj[Object.keys(booksJsObj)[idx]][j]["price"];
      document.getElementById(imDivId).append(priceLabel);
    }

    var rightimgdiv = document.createElement("div");
    rightimgdiv.setAttribute("class", "cell");
    var rightDivID = "rightDivID" + idx;
    rightimgdiv.setAttribute("id", rightDivID);

    document.getElementById(catBkdivID).appendChild(rightimgdiv);

    var rightimg = document.createElement("img");
    rightimg.setAttribute("class", "arrowimg");
    var rightimgid = "right" + idx;
    rightimg.setAttribute("id", rightimgid);
    rightimg.src = "../../images/right.png";
    document.getElementById(rightDivID).append(rightimg);

    rightimg.addEventListener(
      "click",
      (function (cID, idx, NumofBooks) {
        return function () {
          return swipToLeft(cID, idx, NumofBooks);
        };
      })(cID, idx, NumofBooks)
    );

    $(".bookimg").hover(function () {
      $(this).toggleClass("classWithShadow");
    });
    console.log(BookIdx);

    if (+BookIdx + 1 == booksJsObj[Object.keys(booksJsObj)[idx]].length - 4) {
      var _imid = "right" + idx;
      document.getElementById(_imid).style.visibility = "hidden";
      rightHidden = true;
    }
  }
}

function swipToRight(cID, idx, NumofBooks) {
  var temp = document.getElementById(cID);
  var bookId = $("#" + cID)
    .find("div:eq(2)")
    .attr("id");

  var BookIdx = findItemIndex(
    booksJsObj[Object.keys(booksJsObj)[idx]],
    +bookId
  );

  if (0 < +BookIdx) {
    var temp = document.getElementById(cID);
    document.getElementById("categories").removeChild(temp);

    var catBooksdiv = document.createElement("div");
    var catBkdivID = "bkdiv";
    for (j = 0; j <= idx; j++) {
      catBkdivID += "I";
    }
    var nextNode = catBkdivID + "I";
    catBooksdiv.setAttribute("id", catBkdivID);
    catBooksdiv.setAttribute("class", "bkdiv");
    document
      .getElementById("categories")
      .insertBefore(catBooksdiv, document.getElementById(nextNode));

    var catTitlediv = document.createElement("div");
    var catTitId = "categTitle";
    for (j = 0; j < idx; j++) {
      catTitId += "I";
    }
    catTitlediv.setAttribute("id", catTitId);
    catTitlediv.setAttribute("class", "categTitle");
    var categoryTiltle = Object.keys(booksJsObj)[idx];
    catTitlediv.innerHTML = "<b>" + categoryTiltle + "</b>";
    document.getElementById(catBkdivID).appendChild(catTitlediv);

    var leftimgdiv = document.createElement("div");
    leftimgdiv.setAttribute("class", "cell");
    var lftArrDivid = "lftArrDiv" + idx;
    leftimgdiv.setAttribute("id", lftArrDivid);

    document.getElementById(catBkdivID).appendChild(leftimgdiv);

    var leftimg = document.createElement("img");
    leftimg.setAttribute("class", "arrowimg");
    var leftimgid = "left" + idx;
    leftimg.setAttribute("id", leftimgid);
    leftimg.src = "../../images/left.png";
    document.getElementById(lftArrDivid).append(leftimg);

    for (j = +BookIdx - 1; j < +BookIdx + 3; j++) {
      var bkimgdiv = document.createElement("div");
      bkimgdiv.setAttribute("class", "cell");
      var imDivId = booksJsObj[Object.keys(booksJsObj)[idx]][j]["id"];
      bkimgdiv.setAttribute("id", imDivId);
      document.getElementById(catBkdivID).appendChild(bkimgdiv);

      var bkimg = document.createElement("img");
      bkimg.setAttribute("class", "bookimg");
      bkimg.src =
        "../../images/" + booksJsObj[Object.keys(booksJsObj)[idx]][j]["image"];
      var bookid = booksJsObj[Object.keys(booksJsObj)[idx]][j]["id"];
      bkimg.addEventListener(
        "click",
        (function (bookid) {
          return function () {
            return cookie.setCookie("selectedBook", bookid);
          };
        })(bookid)
      );

      document.getElementById(imDivId).append(bkimg);

      var authLabel = document.createElement("label");
      authLabel.setAttribute("class", "AuthLab");
      authLabel.innerHTML =
        "$" + booksJsObj[Object.keys(booksJsObj)[idx]][j]["author"];
      document.getElementById(imDivId).append(authLabel);

      var priceLabel = document.createElement("label");
      priceLabel.setAttribute("class", "PricLab");
      priceLabel.innerHTML =
        "$" + booksJsObj[Object.keys(booksJsObj)[idx]][j]["price"];
      document.getElementById(imDivId).append(priceLabel);
    }

    var rightimgdiv = document.createElement("div");
    rightimgdiv.setAttribute("class", "cell");
    var rightDivID = "rightDivID" + idx;
    rightimgdiv.setAttribute("id", rightDivID);

    document.getElementById(catBkdivID).appendChild(rightimgdiv);

    var rightimg = document.createElement("img");
    rightimg.setAttribute("class", "arrowimg");
    var rightimgid = "right" + idx;
    rightimg.setAttribute("id", rightimgid);
    rightimg.src = "../../images/right.png";
    document.getElementById(rightDivID).append(rightimg);
    rightimg.addEventListener(
      "click",
      (function (cID, idx, NumofBooks) {
        return function () {
          return swipToLeft(cID, idx, NumofBooks);
        };
      })(cID, idx, NumofBooks)
    );

    leftimg.addEventListener(
      "click",
      (function (cID, idx, NumofBooks) {
        return function () {
          return swipToRight(cID, idx, NumofBooks);
        };
      })(cID, idx, NumofBooks)
    );

    $(".bookimg").hover(function () {
      $(this).toggleClass("classWithShadow");
    });

    if (+BookIdx == 1) {
      var _imid = "left" + idx;
      document.getElementById(_imid).style.visibility = "hidden";
      leftHidden = true;
    }
  }
}
