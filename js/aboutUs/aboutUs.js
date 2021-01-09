cookie.setCookie("selected", "about");
$("#aboutUsNavBar").load("../html/navbar.html");
$("#aboutUsFooter").load("../html/footer.html");

document.getElementsByClassName("ourTeam")[0].classList.add("active");
document
  .getElementsByClassName("displayourTeam")[0]
  .classList.add("displayactive");

setTimeout(function () {
  $("#aboutUsNavBar").show();
  $("#aboutUsContainer").show();
  $("#preLoader").hide();
}, 300);

var collectionInfoHeader = document.getElementsByClassName("aboutUsInfo")[0]
  .children;
var collectionDisplayInfo = document.getElementsByClassName(
  "displayAboutUsInfo"
)[0].children;

for (var x = 0; x < collectionInfoHeader.length; x++) {
  (function (y) {
    collectionInfoHeader[y].onclick = function () {
      removeClassActive(collectionInfoHeader, "active");
      removeClassActive(collectionDisplayInfo, "displayactive");
      collectionInfoHeader[y].classList.add("active");
      collectionDisplayInfo[y].classList.add("displayactive");
    };
  })(x);
}

function removeClassActive(collection, className) {
  for (var i = 0; i < collection.length; i++)
    collection[i].classList.remove(className);
}
