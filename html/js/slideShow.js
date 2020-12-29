onload = function () {
  var images = [
    "./images/slideShow1.jpg",
    "./images/slideShow2.jpg",
    "./images/slideShow3.jpg",
  ];
  var index = 1;
  var slide = document.getElementById("slideImage");
  setInterval(function () {
    if (index < images.length - 1) {
      index++;
    } else {
      index = 0;
    }
    slide.setAttribute("src", images[index]);
  }, 3000);
};
