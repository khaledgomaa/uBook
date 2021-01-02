(function () {
  var booksCat = [];
  var categorizedBooks = [];
  var allBooks = [];
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "/DB/booksData.json");
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4) {
      if (xhr.status >= 200 && xhr.status < 300) {
        booksCat = JSON.parse(xhr.responseText);
        for (var i = 0; i < Object.keys(booksCat).length; i++) {
          categorizedBooks.push(booksCat[Object.keys(booksCat)[i]]);
        }
        allBooks.push([].concat.apply([], categorizedBooks));
      }
    }
  };
  xhr.send();
  var books = {
    readDbFile: function () {},

    getCategorizedBooks: function () {
      return categorizedBooks;
    },

    getAllBooks: function () {
      return allBooks;
    },
  };
  window.books = books;
})();
