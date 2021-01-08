function clickRight(cID, idx) {
  var bookId = $("#" + cID)
    .find("div:eq(2)")
    .attr("id");

  var BookIdx = findItemIndex(
    booksJsObj[Object.keys(booksJsObj)[idx]],
    +bookId
  );

  if (BookIdx < booksJsObj[Object.keys(booksJsObj)[idx]].length - 4) {
      var categElem = document.getElementById(cID);
      document.getElementById("categories").removeChild(categElem);

      var checkFirstCreation=false;
      var CategDivData = createCategDiv(idx, Object.keys(booksJsObj), checkFirstCreation); 
      var catBkdivID = CategDivData[0];
      
    for (j = +BookIdx + 1; j <= +BookIdx + 4; j++) {
      createBooksDiv(idx, j, Object.keys(booksJsObj), CategDivData);

    }
    
     

    if (+BookIdx + 1 == booksJsObj[Object.keys(booksJsObj)[idx]].length - 4) {
      var _imid = "right" + idx;
      document.getElementById(_imid).style.visibility = "hidden";}
  }
}

function clickLeft(cID, idx) {
  var bookId = $("#" + cID)
    .find("div:eq(2)")
    .attr("id");

  var BookIdx = findItemIndex(
    booksJsObj[Object.keys(booksJsObj)[idx]],
    +bookId
  );

  if (0 < +BookIdx) {
    var categElem = document.getElementById(cID);
    document.getElementById("categories").removeChild(categElem);
      
      var checkFirstCreation=false;
      var CategDivData = createCategDiv(idx, Object.keys(booksJsObj), checkFirstCreation); 
      var catBkdivID = CategDivData[0];
      
    for (j = +BookIdx - 1; j < +BookIdx + 3; j++) {
       createBooksDiv(idx, j, Object.keys(booksJsObj), CategDivData);

    }
      
      
      
    if (+BookIdx == 1) {
      var _imid = "left" + idx;
      document.getElementById(_imid).style.visibility = "hidden";
    }
  }
}