onload = function () {
  $("#header").load("./navbar.html");
  var images = [
    "./images/slideShow1.jpg",
    "./images/slideShow2.jpg",
    "./images/slideShow3.jpg",
  ];
  var textImage = [
    `Reading is important because it develops our thoughts, gives us endless
  knowledge and lessons while keeping our minds active. Books can hold and
  keep all kinds of information, stories, thoughts and feelings unlike
  anything else in this world`,
    `Reading is great fun for many people, but it also has many
     benefits for your mental health in the form of thinking and understanding.
      By concentrating on the words and the storyline,
       it stimulates your brain and cognitive functions.`,
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
