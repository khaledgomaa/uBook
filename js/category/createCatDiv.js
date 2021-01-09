function createCategDiv(i, objectKeys, checkFirstcreation) {
  var catBooksdiv = document.createElement("div");
  var catBooksdivID = "bkdiv" + i;
  catBooksdiv.setAttribute("id", catBooksdivID);
  catBooksdiv.setAttribute("class", "bkdiv");
  if (checkFirstcreation) {
    document.getElementById("categories").appendChild(catBooksdiv);
  } else {
    var nextNode = "bkdiv" + (i + 1);
    document
      .getElementById("categories")
      .insertBefore(catBooksdiv, document.getElementById(nextNode));
  }

  var catTitlediv = document.createElement("div");
  var catTitledivId = "categTitle" + i;
  catTitlediv.setAttribute("id", catTitledivId);
  catTitlediv.setAttribute("class", "categTitle");
  var categoryTiltle = Object.keys(booksJsObj)[i];
  catTitlediv.innerHTML = "<b>" + categoryTiltle + "</b>";
  document.getElementById(catBooksdivID).appendChild(catTitlediv);

  var leftimgdiv = document.createElement("div");
  leftimgdiv.setAttribute("class", "rightArrow");
  var lftArrDid = "lftArrDiv" + i;
  leftimgdiv.setAttribute("id", lftArrDid);
  document.getElementById(catBooksdivID).appendChild(leftimgdiv);

  var leftimg = document.createElement("img");
  leftimg.setAttribute("class", "arrowimg");
  var leftimgid = "left" + i;
  leftimg.setAttribute("id", leftimgid);
  leftimg.src = "../images/left.png";
  document.getElementById(lftArrDid).append(leftimg);
  leftimg.addEventListener(
    "click",
    (function (catBooksdivID, i) {
      return function () {
        return clickLeft(catBooksdivID, i);
      };
    })(catBooksdivID, i)
  );

  if (checkFirstcreation) {
    leftimg.style.visibility = "hidden";
  }

  var rightimgdiv = document.createElement("div");
  rightimgdiv.setAttribute("class", "rightArrow");
  var rightDid = "rightDivID" + i;
  rightimgdiv.setAttribute("id", rightDid);
  document.getElementById(catBooksdivID).appendChild(rightimgdiv);

  var rightimg = document.createElement("img");
  rightimg.setAttribute("class", "arrowimg");
  var rightimid = "right" + i;
  rightimg.setAttribute("id", rightimid);
  rightimg.src = "../images/right.png";

  document.getElementById(rightDid).append(rightimg);
  rightimg.addEventListener(
    "click",
    (function (catBooksdivID, i) {
      return function () {
        return clickRight(catBooksdivID, i);
      };
    })(catBooksdivID, i)
  );

  return [catBooksdivID, rightimgdiv];
}

function createBooksDiv(i, j, objectKeys, categData) {
  //debugger;
  var bkimgdiv = document.createElement("div");
  bkimgdiv.setAttribute("class", "cell");
  var imDivId = booksJsObj[Object.keys(booksJsObj)[i]][j]["id"];
  bkimgdiv.setAttribute("id", imDivId);

  document.getElementById(categData[0]).insertBefore(bkimgdiv, categData[1]);

  var bkimg = document.createElement("img");
  bkimg.setAttribute("class", "bookimg");
  var imgId = "book" + i + j + "img";
  bkimg.setAttribute("id", imgId);
  bkimg.src = "../images/" + booksJsObj[Object.keys(booksJsObj)[i]][j]["image"];
  var bookid = booksJsObj[Object.keys(booksJsObj)[i]][j]["id"];
  bkimg.addEventListener(
    "click",
    (function (bookid) {
      return function () {
        return cookie.setCookie("selectedBook", bookid);
      };
    })(bookid)
  );

  var anchId = "anch" + i + j;
  $("#" + imDivId).append("<a href=bookDetails.html id='" + anchId + "'></a>");
  document.getElementById(anchId).append(bkimg);
  bkimgdiv.append(document.getElementById(anchId));

  applyImgHover(imgId);

  var authLabel = document.createElement("label");
  authLabel.setAttribute("class", "AuthLab");
  authLabel.innerHTML = booksJsObj[Object.keys(booksJsObj)[i]][j]["author"];
  //document.getElementById(imDivId).append(authLabel);
  bkimgdiv.append(authLabel);

  var priceLabel = document.createElement("label");
  priceLabel.setAttribute("class", "PricLab");
  priceLabel.innerHTML =
    "$" + booksJsObj[Object.keys(booksJsObj)[i]][j]["price"];
  //document.getElementById(imDivId).append(priceLabel);
  bkimgdiv.append(priceLabel);
}

function applyImgHover(imgId) {
  
  $("#" + imgId).hover(function () {
    $(this).toggleClass("classWithShadow");
  });
}
