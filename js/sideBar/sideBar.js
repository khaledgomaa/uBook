var booksJsObj,
    resultBooks = [];
$("document").ready(function () {
  var xhr = new XMLHttpRequest(); // create request
  xhr.open("GET", "../DB/booksData.json");
  xhr.send();
  xhr.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200)  {
        booksJsObj = JSON.parse(xhr.responseText);
        var booksObjKeys = Object.keys(booksJsObj);
        createCategoriesContainer();   // div contains radio buttons and lables for each category
        for (var i = 0; i < booksObjKeys.length; i++) {
          createRadioButton(booksObjKeys[i]);
        }
        createSlider();
      }
  };

  // scrolling back to top
  $(window).scroll(function () {
    if ($(window).scrollTop() > 300) $("#up").css("display", "block");
    else $("#up").css("display", "none");
  });
  $("#up").click(function () {
    $("html, body").animate({ scrollTop: 0 });
  });

});

function createCategoriesContainer() {
  var divCreation = document.createElement("div");
  divCreation.setAttribute("id", "catsContainer");
  document.getElementById("sideCategDiv").append(divCreation);

}

function createRadioButton(categoryName) {

  var innerDiv = document.createElement("div");
  innerDiv.setAttribute("id", "innerDiv");

  var inputCreation = document.createElement("input");
  inputCreation.setAttribute("type", "checkbox");
  inputCreation.setAttribute("name", categoryName);
  inputCreation.setAttribute("value", categoryName);
  innerDiv.append(inputCreation);

  inputCreation.addEventListener("change", searchResult);

  var labelCreation = document.createElement("label");
  labelCreation.setAttribute("for", categoryName);

  var textCreation = document.createTextNode(categoryName);
  labelCreation.append(textCreation);
  innerDiv.append(labelCreation);
  document.getElementById("catsContainer").append(innerDiv);
}

//get slider range min -- max 

function getMaxMinPrices() {
  var min = booksJsObj[Object.keys(booksJsObj)[0]][0]["price"];
  var max = booksJsObj[Object.keys(booksJsObj)[0]][0]["price"];
  for (var i = 0; i < Object.keys(booksJsObj).length; i++) {
    for (var j = 0; j < booksJsObj[Object.keys(booksJsObj)[i]].length; j++) {
      if (booksJsObj[Object.keys(booksJsObj)[i]][j]["price"] < min)
        min = booksJsObj[Object.keys(booksJsObj)[i]][j]["price"];

      if (booksJsObj[Object.keys(booksJsObj)[i]][j]["price"] > max)
        max = booksJsObj[Object.keys(booksJsObj)[i]][j]["price"];
    }
  }

  return [min, max];
}

// create slider

function createSlider() {
  var priceRange = getMaxMinPrices();
  var min = priceRange[0];
  var max = priceRange[1];

  var sliderCreation = document.createElement("input");
  sliderCreation.setAttribute("type", "range");
  sliderCreation.setAttribute("min", min);
  sliderCreation.setAttribute("max", max);
  sliderCreation.setAttribute("value",max);
  sliderCreation.setAttribute("id", "myRange");

  $("#fromtxt").val(min);
  $("#totxt").val(sliderCreation.value);

  sliderCreation.addEventListener("change", function () {
    $("#totxt").val(this.value);
    searchResult();
  });
  
  document.getElementById("slider-range").append(sliderCreation);
}

function getAllBooksWithPriceRange(minBookPrice,maxBookPrice) {
  for (var b in booksJsObj)
  {
    for (book in booksJsObj[b])
      if (booksJsObj[b][book].price <= maxBookPrice && booksJsObj[b][book].price >= minBookPrice)
        resultBooks = resultBooks.concat(booksJsObj[b][book]);
  }
}

function searchResult() {

  resultBooks = [];  // get the final result
  var selectedCategoryBooks = [];  // get all books from selected categories

  var checkBoxCollection = document.querySelectorAll("#catsContainer input")

  for (var b in checkBoxCollection)
    if (checkBoxCollection[b].checked == true)
      selectedCategoryBooks = selectedCategoryBooks.concat(booksJsObj[checkBoxCollection[b].name]);
  
  var minBookPrice = $("#fromtxt").val(),
    maxBookPrice = $("#totxt").val();
  
  //check if users didn't select any category and search on price only

  if (selectedCategoryBooks.length != 0) {
    for (var b in selectedCategoryBooks) {
      if (selectedCategoryBooks[b].price <= maxBookPrice && selectedCategoryBooks[b].price >= minBookPrice)
        resultBooks = resultBooks.concat(selectedCategoryBooks[b]);
    }
  }
  else {
      getAllBooksWithPriceRange(minBookPrice,maxBookPrice);
  }
  
  displayAllResultSearch();  // display the results inside CategoryDetails page
}

function displayAllResultSearch() {
 // console.log(resultBooks);
  document.getElementById("searchSideBarResult").innerHTML = "";
  $("#categories").hide();
  for (x in resultBooks) {
    (function (b) {
      var book = resultBooks[b];
      var bookDiv = document.createElement("div");
      bookDiv.setAttribute("class", "bookCell");
  
      var anchorCreation = document.createElement("a");
      anchorCreation.setAttribute("href", "bookDetails.html");
  
      var imageCreation = document.createElement("img");
      imageCreation.setAttribute("src", "../images/" + book.image);
      imageCreation.setAttribute("width", "300");
      imageCreation.setAttribute("height", "350");
      imageCreation.setAttribute("class","searchBookImage")
      anchorCreation.append(imageCreation);
      bookDiv.append(anchorCreation);
  
      var authorLabel = document.createElement("label");
      authorLabel.setAttribute("class", "AuthLab");
      authorLabel.append(document.createTextNode(book.author));
      bookDiv.append(authorLabel);
  
      var priceLabel = document.createElement("label");
      priceLabel.setAttribute("class", "AuthLab");
      priceLabel.append(document.createTextNode(book.price + "$"));
      bookDiv.append(priceLabel);
  
      bookDiv.addEventListener("click", function () {
        cookie.setCookie("selectedBook", (book.id).toString());
      });
      
      document.getElementById("searchSideBarResult").append(bookDiv);
    })(x);
    
  }
    
}

