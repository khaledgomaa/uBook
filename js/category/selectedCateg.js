
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
var selectCateg=cookie.getCookie("selectedCategory");


$("document").ready(function () {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "../../DB/booksData.json");
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4)
      if (xhr.status >= 200 && xhr.status <= 300) {
        booksJsObj = JSON.parse(xhr.responseText);

        var booksObjKeys =  Object.keys(booksJsObj);
          
        for (var i = 0; i < Object.keys(booksJsObj).length; i++) {
            
          if(Object.keys(booksJsObj)[i]==selectCateg)
          {   
            
              var checkFirstCreation=true;
              var CategDivData = createCategDiv(i, Object.keys(booksJsObj), checkFirstCreation);
              var catBooksdivID=CategDivData[0]

              for (var j = 0; j < 4; j++) {

                createBooksDiv(i, j, Object.keys(booksJsObj), CategDivData);
              }
          }
        }
      }
    };
  xhr.send("");
});
