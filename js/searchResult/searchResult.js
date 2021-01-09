onload = function () {
  cookie.setCookie("selected", "searchResult");
  $("#SearchResultNavBar").load("./navbar.html");
  $("#searchFooter").load("footer.html");

  setTimeout(function () {
    $("#SearchResultNavBar").show();
    $("#searchContainer").show();
    $("#preLoader").hide();
  }, 300);

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  let keyWord = urlParams.get("SearchVal");
  if (keyWord == null) {
    location.replace("home.html");
  } else {
    keyWord.toLocaleLowerCase();
  }
  let searchResult = [];

  var xhr = new XMLHttpRequest();
  xhr.open("GET", "/DB/booksData.json");
  xhr.send();

  let books = [];
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4) {
      if (xhr.status >= 200 && xhr.status < 300) {
        let booksWithCat = JSON.parse(xhr.responseText);
        for (let b in booksWithCat) {
          books = books.concat(booksWithCat[b]);
          //books = [...books, ...booksWithCat[b] ];
        }
        search();
      }
    }
  };
  let search = () => {
    for (let b in books) {
      let title = books[b].title.toLowerCase();
      if (title.includes(keyWord)) searchResult.push(books[b]);
    }
    display();
  };

  let display = () => {
    for (var i = 0; i < searchResult.length; i++) {
      let book = searchResult[i];
      $(".books-display").append(
        "<div class=cell id=" +
          book.id +
          "><a href=bookDetails.html><img src=../images/" +
          book.image +
          " width=300 height=350/></a><label class=AuthLab>" +
          book.author +
          "</label><label class=AuthLab>" +
          book.price +
          "$" +
          "</label></div>"
      );
      createOnCLickAction(book.id);
    }
  };
  function createOnCLickAction(bookId) {
    document
      .getElementById(bookId.toString())
      .addEventListener("click", function () {
        cookie.setCookie("selectedBook", bookId);
      });
  }
};

/*
 
                categorizedBooks = [].concat.apply([], categorizedBooks);
                displayBooks(
                    "Top rated ebooks",
                    "top",
                    getTopRated(4, categorizedBooks)
                );
                displayBooks(
                    "Most trending ebooks",
                    "trend",
                    getRandomBooks(4, categorizedBooks)
                );
*/
