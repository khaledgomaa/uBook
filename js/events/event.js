cookie.setCookie("selected", "event");
$("#eventsNavBar").load("../html/navbar.html");
$("#eventsFooter").load("../html/footer.html");

document.getElementsByClassName("event1")[0].classList.add("active");
document
  .getElementsByClassName("displayEvent1")[0]
  .classList.add("detailsActive");

setTimeout(function () {
  $("#eventsNavBar").show();
  $("#eventsBodyContainer").show();
  $("#preLoader").hide();
}, 300);

var collectionInfoHeader = document.getElementsByClassName("events-schedule")[0]
  .children;
var collectionDisplayInfo = document.getElementsByClassName("eventsDetails")[0]
  .children;

for (var x = 0; x < collectionInfoHeader.length; x++) {
  (function (y) {
    collectionInfoHeader[y].onclick = function () {
      removeClassActive(collectionInfoHeader, "active");
      removeClassActive(collectionDisplayInfo, "detailsActive");
      collectionInfoHeader[y].classList.add("active");
      collectionDisplayInfo[y].classList.add("detailsActive");
    };
  })(x);
}

function removeClassActive(collection, className) {
  for (var i = 0; i < collection.length; i++)
    collection[i].classList.remove(className);
}
