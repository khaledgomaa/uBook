onload = function () {
  $("#header").load("./navbar.html");
  $("#searchbar").load("./search.html");

  displayBooks("Top rated ebooks", "top", getTopRated(4));
  displayBooks("Most trending ebooks", "trend", getRandomBooks(4));
  $("#footer").load("./footer.html");
  var images = [
    "../images/slideShow1.jpg",
    "../images/slideShow2.jpg",
    "../images/slideShow3.jpg",
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

  // -------- Function to get the next image

  $("#next").click(function () {
    goToSlide(index + 1);
  });

  //------------ function to get the previus Image

  $("#prev").click(function () {
    goToSlide(index - 1);
  });

  //-----------function to display slideshow

  setInterval(function () {
    goToSlide(index + 1);
  }, 3000);

  var paginationElements = document.createElement("ul");

  paginationElements.setAttribute("id", "pagination-ul");

  paginationElements.style.textAlign = "center";
  // create list of lis based on images.length

  for (var i = 1; i <= images.length; i++) {
    var liItem = document.createElement("li");
    liItem.setAttribute("data-index", i); // set data index for each element
    liItem.setAttribute("class", "dot"); // add class active to li
    paginationElements.appendChild(liItem); // add li to ul
  }

  document.getElementById("pagination").appendChild(paginationElements); // append ul to document
  paginationElements.children[index].classList.add("active"); // set the current index to be active

  for (var i = 0; i < paginationElements.children.length; i++) {
    paginationElements.children[i].onclick = function () {
      index = parseInt(this.getAttribute("data-index")) - 1;
      goToSlide(index);
    };
  }

  function goToSlide(num) {
    index = (num + images.length) % images.length; // set index
    slide.setAttribute("src", images[index]);
    checkPagination();
  }

  // function to set the current li element only to active
  function checkPagination() {
    for (var x = 0; x < paginationElements.children.length; x++)
      paginationElements.children[x].classList.remove("active");
    paginationElements.children[index].classList.add("active");
  }

  //display Top rated books
  function displayBooks(categorName, id, items) {
    $("<div class=bkdiv id=" + id + "></div>").insertBefore("#up");
    $("#" + id).append(
      "<div class=categTitle><strong>" + categorName + "</strong></div>"
    );
    for (var i = 0; i < items.length; i++) {
      $("#" + id).append(
        "<div class=cell id=" +
          id +
          i +
          "><a href><img src=../images/" +
          items[i].image +
          " width=350 height=350/></a><label class=AuthLab>" +
          items[i].author +
          "</label><label class=AuthLab>" +
          items[i].price +
          "$" +
          "</label></div>"
      );
      createOnCLickAction(id + i, items[i].id);
    }
  }

  function createOnCLickAction(elementId, bookId) {
    document
      .getElementById(elementId.toString())
      .addEventListener("click", function () {
        cookie.setCookie("selectedBook", bookId);
        console.log(bookId);
      });
  }

  //to reorder books everyTime
  function shuffle(array) {
    var curtIndex = array.length,
      temp,
      randomIndex;

    while (curtIndex !== 0) {
      randomIndex = Math.floor(Math.random() * curtIndex);
      curtIndex -= 1;

      temp = array[curtIndex];
      array[curtIndex] = array[randomIndex];
      array[randomIndex] = temp;
    }

    return array;
  }

  function getAllBooks() {
    //returned from getCategorizedBooks is array of array of objects so one more step
    //needed to concat all elements.
    var allBooks = books.getCategorizedBooks();
    return [].concat.apply([], allBooks);
  }

  //Get top 4 rated books
  function getTopRated(numOfelements) {
    var allBooks = getAllBooks();
    return allBooks
      .sort(function (a, b) {
        return +b.rate - +a.rate;
      })
      .slice(0, numOfelements);
  }

  //Get random books
  function getRandomBooks(numOfelements) {
    return shuffle(getAllBooks()).slice(0, numOfelements);
  }

  /* *** back to up*** */

  $(window).scroll(function () {
    if ($(window).scrollTop() > 300) $("#up").css("display", "block");
    else $("#up").css("display", "none");
  });
  $("#up").click(function () {
    $("html, body").animate({ scrollTop: 0 });
  });
};
