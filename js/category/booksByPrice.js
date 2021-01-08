$("#header").load("./navbar.html");
$("#searchbar").load("./search.html");
$("#footer").load("./footer.html");

setTimeout(function () {
  $("#bodyDivId").show();
  $("#header").show();
  $("#footer").show();
  $("#preLoader").hide();
}, 300);

var minPrice=cookie.getCookie("minPrice");
var maxPrice=cookie.getCookie("maxPrice");
var booksJsObj;

var flag;

$("document").ready(function () {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "../../DB/booksData.json");
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4)
      if (xhr.status >= 200 && xhr.status <= 300) {
        booksJsObj = JSON.parse(xhr.responseText);

        var booksObjKeys =  Object.keys(booksJsObj);
          
        for (var i = 0; i < Object.keys(booksJsObj).length; i++) {
            flag=false;
            
          for (var j = 0; j < booksJsObj[Object.keys(booksJsObj)[i]].length && !flag ; j++){
              
              if(booksJsObj[Object.keys(booksJsObj)[i]][j]["price"]>=minPrice
                    && booksJsObj[Object.keys(booksJsObj)[i]][j]["price"] <=maxPrice){
                  flag= true;
                  var checkFirstCreation=true;
                  var CategDivData = createCategDiv(i, Object.keys(booksJsObj), checkFirstCreation);
                  var catBooksdivID=CategDivData[0];
                  
                  
              }
              
          }
        }
      }
    };
  xhr.send("");
});

