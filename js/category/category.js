
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

$("document").ready(function () {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "../../DB/booksData.json");
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4)
      if (xhr.status >= 200 && xhr.status <= 300) {
        booksJsObj = JSON.parse(xhr.responseText);

        var booksObjKeys =  Object.keys(booksJsObj);
          
        for (var i = 0; i < Object.keys(booksJsObj).length; i++) {
            
          var checkFirstCreation=true;
          var CategDivData = createCategDiv(i, Object.keys(booksJsObj), checkFirstCreation);
          var catBooksdivID=CategDivData[0]
          
          for (var j = 0; j < 4; j++) {
              
            createBooksDiv(i, j, Object.keys(booksJsObj), CategDivData);
            
          }
        }
        
          applyImgHover();
      }
    };
  xhr.send("");
});


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
    
      applyImgHover();

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
      
    applyImgHover(); 
      
    if (+BookIdx == 1) {
      var _imid = "left" + idx;
      document.getElementById(_imid).style.visibility = "hidden";
    }
  }
}

function applyImgHover(){
    $(".bookimg").hover(function () {
      $(this).toggleClass("classWithShadow");
    }); 
}
