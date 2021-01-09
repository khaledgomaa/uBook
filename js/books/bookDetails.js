cookie.setCookie("selected", "bookDetails");
$("#bookDetailsHeader").load("./navbar.html"); // include navbar on loading
$("#bookDetailsFooter").load("./footer.html"); //include footer onloading

(bookinfo = {}), (totalNumberOfItems = 0), (totalNumberOfWishList = 0);

setTimeout(function () {
  $("#bodyDivId").show();
  $("#bookDetailsHeader").show();
  $("#bookDetailsFooter").show();
  $("#preLoader").hide();
}, 300);
var bookId = cookie.getCookie("selectedBook");
var currentUser = cookie.getCookie("useremail");
var storedItems = JSON.parse(localStorage.getItem("cartItems"));
if (storedItems == null) {
  storedItems = [];
}
var wishListitems = JSON.parse(localStorage.getItem("wishListCart"));
if (wishListitems == null) {
  wishListitems = [];
}
/* Start XML HTTP REQUEST to get the data file*/

var xhr = new XMLHttpRequest(); // create request
xhr.open("GET", "../DB/booksData.json");
xhr.send();
xhr.onreadystatechange = function () {
  if (bookId === "Not Found") {
    location.replace("home.html");
  } else {
    if (this.readyState === 4 && this.status === 200) {
      var booksObject = JSON.parse(this.responseText);
      for (var category in booksObject)
        for (var book in booksObject[category])
          if (booksObject[category][book].id == bookId)
            bookinfo = booksObject[category][book];
      // Update information of the selected book in bookdetails page

      document.getElementsByClassName("bookTitle")[0].innerHTML =
        bookinfo.title;
      document.getElementsByClassName("bookAuthor")[0].innerHTML =
        bookinfo.author;
      document.getElementsByClassName("bookPrice")[0].innerHTML =
        bookinfo.price;
      var stockNum = getAvailableInStock(bookinfo.id);
      document.getElementsByClassName("bookStock")[0].innerHTML =
        stockNum > -1 ? stockNum : bookinfo.stock;

      if (getCurrentStock() == 0) {
        $(".addCartBtn").hide();
      }

      setBookRate(bookinfo.rate);
      $(".bookImage").attr("src", "../images/" + bookinfo.image);

      if (currentUser == "" || currentUser == null || currentUser == undefined)
        // if user didn't sign in set cart to 0
        document.getElementsByClassName("numberlogo")[0].innerHTML = 0;
      else {
        getTotalNumberOfItems();
        getTotalNumberOfWhishlist();
        //updateUserWishesList();
        //updateUsercartItemsNumber(); // if user signed in  and this is not the first time to add this element
        var bookItem = checkBookInList(storedItems, bookinfo.id);
        if (bookItem !== undefined) {
          $(".selectedItems").text("(" + bookItem.qty + ") in cart");
          $(".addCartBtn").hide();
          $(".addWishBtn").hide();
          $(".secondTime").show();
          if (bookItem.stock == 0) {
            $(".plus").prop("disabled", true);
          } else {
            $(".plus").prop("disabled", false);
          }
        } else {
          bookItem = checkBookInList(wishListitems, bookinfo.id);
          if (bookItem !== undefined) {
            $(".addWishBtn").hide();
          }
        }
      }
    }
  }
};

function checkBookInList(list, bookId) {
  for (idx in list) {
    // display n in cart and hide add to cart
    if (list[idx].useremail == currentUser) {
      for (x in list[idx].items) {
        if (list[idx].items[x].id == bookId) {
          return list[idx].items[x];
        }
      }
    }
  }
}

// when the request and response are okay get json objec
// this is the first time for the user to add elements to cart
document.getElementsByClassName("addCartBtn")[0].onclick = function () {
  // or this first time for the user to add this element to cart
  if (currentUser == "Not Found") location.replace("signin.html");
  // check if user signed in or not
  else {
    addItemsToCart();
  }
};
document.getElementsByClassName("addWishBtn")[0].onclick = function () {
  if (currentUser == "Not Found") {
    location.replace("signin.html");
  } else {
    //document.getElementsByClassName("numberlogo")[0].innerHTML = 0;
    addToWishList();
  }
};
document.getElementsByClassName("plus")[0].onclick = function () {
  updateCurrentQuantity(1);
};
document.getElementsByClassName("minus")[0].onclick = function () {
  updateCurrentQuantity(-1);
};
function updateCurrentQuantity(num) {
  // update the cart according to the current user and his/her cart
  //debugger;
  if (currentUser == "Not Found")
    document.getElementsByClassName("numberlogo")[0].innerHTML = 0;
  else {
    for (idx in storedItems) {
      if (storedItems[idx].useremail == currentUser) {
        for (x in storedItems[idx].items) {
          if (
            storedItems[idx].items[x].id == bookinfo.id &&
            +storedItems[idx].items[x].stock >= 0
          ) {
            var itemQuan = storedItems[idx].items[x].qty;
            itemQuan += num;
            if (itemQuan == 0) {
              $(".addCartBtn").show();
              if (!checkWishList()) {
                $(".addWishBtn").show();
              }
              $(".secondTime").hide();
              if (storedItems[idx].items.length > 1) {
                storedItems[idx].items.splice(x);
              } else {
                storedItems.splice(idx);
              }
            } else {
              storedItems[idx].items[x].qty = itemQuan;
              storedItems[idx].items[x].stock = Math.abs(
                +storedItems[idx].items[x].stock - itemQuan
              );
              $(".selectedItems").text(
                "(" + storedItems[idx].items[x].qty + ") in cart"
              );
            }
            totalNumberOfItems += num;
            var newStock = getCurrentStock() - num;
            updateCurrentStock(newStock);
            updateStockForItemInCartItems(storedItems, bookinfo.id, newStock);
            if (newStock === 0) {
              $(".plus").prop("disabled", true);
            } else {
              $(".plus").prop("disabled", false);
            }
            document.getElementsByClassName(
              "numberlogo"
            )[0].innerHTML = totalNumberOfItems;
            localStorage.setItem("cartItems", JSON.stringify(storedItems));
            return;
          }
        }
      }
    }
  }
}
function getTotalNumberOfItems() {
  for (idx in storedItems) {
    if (storedItems[idx].useremail == currentUser) {
      for (x in storedItems[idx].items) {
        totalNumberOfItems += storedItems[idx].items[x].qty;
      }
    }
  }
}
function getTotalNumberOfWhishlist() {
  for (idx in wishListitems) {
    if (wishListitems[idx].useremail == currentUser) {
      totalNumberOfWishList = wishListitems[idx].items.length;
    }
  }
}
function removeFromWishList() {
  for (idx in wishListitems) {
    if (wishListitems[idx].useremail == currentUser) {
      for (x in wishListitems[idx].items) {
        if (wishListitems[idx].items[x].id == bookinfo.id) {
          wishListitems[idx].items.splice(x, 1);
          localStorage.setItem("wishListCart", JSON.stringify(wishListitems));
          $(".numberwish").text(+$(".numberwish").text() - 1);
        }
      }
    }
  }
}
function checkWishList() {
  for (idx in wishListitems) {
    if (wishListitems[idx].useremail == currentUser) {
      for (x in wishListitems[idx].items) {
        if (wishListitems[idx].items[x].id == bookinfo.id) return true;
      }
    }
  }
  return false;
}

function addToWishList() {
  for (idx in wishListitems) {
    // if the current user already has wishes before
    if (wishListitems[idx].useremail == currentUser) {
      $(".addWishBtn").hide();
      wishListitems[idx].items.push({
        id: bookinfo.id,
        title: bookinfo.title,
        price: bookinfo.price,
        qty: 1,
        image: bookinfo.image,
        stock: bookinfo.stock,
      });
      localStorage.setItem("wishListCart", JSON.stringify(wishListitems));
      $(".numberwish").text(+$(".numberwish").text() + 1);
      return;
    }
  }
  ///if the current user doesn't have wishes before

  $(".addWishBtn").hide();
  if (wishListitems == null) {
    wishListitems = [];
  }
  wishListitems.push({
    // add new object to storage
    useremail: currentUser,
    items: [
      {
        id: bookinfo.id,
        title: bookinfo.title,
        price: bookinfo.price,
        qty: 1,
        image: bookinfo.image,
        stock: bookinfo.stock,
      },
    ],
  });
  //document.getElementsByClassName("numberlogo")[0].innerHTML = 1;
  $(".numberwish").text(+$(".numberwish").text() + 1);
  localStorage.setItem("wishListCart", JSON.stringify(wishListitems));
  return;
}

function addItemsToCart() {
  for (idx in storedItems) {
    if (storedItems[idx].useremail == currentUser) {
      // if user wants to add new items to cart
      $(".addCartBtn").hide();
      $(".addWishBtn").hide();
      $(".secondTime").show();
      removeFromWishList();
      storedItems[idx].items.push({
        id: bookinfo.id,
        title: bookinfo.title,
        price: bookinfo.price,
        qty: 1,
        image: bookinfo.image,
        stock: bookinfo.stock,
      });
      totalNumberOfItems += 1; // display number of items
      var newStockNum = getCurrentStock() - 1;
      updateCurrentStock(newStockNum);
      updateStockForItemInCartItems(storedItems, bookinfo.id, newStockNum);
      if (newStockNum == 0) {
        $(".plus").prop("disabled", true);
      } else {
        $(".plus").prop("disabled", false);
      }
      document.getElementsByClassName(
        "numberlogo"
      )[0].innerHTML = totalNumberOfItems;
      $(".selectedItems").text("(1) in cart");
      localStorage.setItem("cartItems", JSON.stringify(storedItems)); // update variable in storage
      return;
    }
  }
  removeFromWishList();
  if (storedItems == null) {
    storedItems = [];
  }
  storedItems.push({
    // add new object to storage
    useremail: currentUser,
    items: [
      {
        id: bookinfo.id,
        title: bookinfo.title,
        price: bookinfo.price,
        qty: 1,
        image: bookinfo.image,
        stock: bookinfo.stock,
      },
    ],
  });

  totalNumberOfItems += 1;
  var newStockNum = getCurrentStock() - 1;
  updateCurrentStock(newStockNum);
  updateStockForItemInCartItems(storedItems, bookinfo.id, newStockNum);
  if (newStockNum == 0) {
    $(".plus").prop("disabled", true);
  } else {
    $(".plus").prop("disabled", false);
  }
  document.getElementsByClassName("numberlogo")[0].innerHTML = 1;
  $(".selectedItems").text("(1) in cart");
  localStorage.setItem("cartItems", JSON.stringify(storedItems));
  $(".addCartBtn").hide(); // if it's the first time for user to add elements
  $(".addWishBtn").hide();
  $(".secondTime").show();
  return;
}
function setBookRate(num) {
  var bookRateStars = document.getElementsByClassName("bookRate")[0].children;
  for (var x = 0; x < num; x++) {
    bookRateStars[x].classList.add("checked");
  }
}

function getAvailableInStock(id) {
  for (var i in storedItems) {
    var index = findItemIndex(storedItems[i].items, id);
    if (index > -1) {
      return storedItems[i].items[index].stock;
    }
  }
  return -1;
}

function getCurrentStock() {
  return +$(".bookStock").text();
}

function updateCurrentStock(num) {
  $(".bookStock").text(num);
}
