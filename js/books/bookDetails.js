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
var wishListitems = JSON.parse(localStorage.getItem("wishListCart"));
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
      document.getElementsByClassName("bookRate")[0].innerHTML = bookinfo.rate;
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

  if (currentUser == "" || currentUser == null || currentUser == undefined)
    document.getElementsByClassName("numberlogo")[0].innerHTML = 0;
  else {
    for (idx in storedItems) {
      if (storedItems[idx].useremail == currentUser) {
        for (x in storedItems[idx].items) {
          if (storedItems[idx].items[x].id == bookinfo.id) {
            var itemQuan = storedItems[idx].items[x].qty;
            itemQuan += num;
            if (itemQuan == 0) {
              $(".addCartBtn").show();
              if (!checkWishList()) {
                $(".addWishBtn").show();
              }
              $(".secondTime").hide();
              storedItems[idx].items.splice(x, 1);
            } else {
              storedItems[idx].items[x].qty = itemQuan;
              $(".selectedItems").text(
                "(" + storedItems[idx].items[x].qty + ") in cart"
              );
            }
            totalNumberOfItems += num;
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
      });
      localStorage.setItem("wishListCart", JSON.stringify(wishListitems));
      $(".numberwish").text(+$(".numberwish").text() + 1);
      return;
    }
  }
  ///if the current user doesn't have wishes before
  var addNewWishList = [];
  $(".addWishBtn").hide();
  addNewWishList.push({
    // add new object to storage
    useremail: currentUser,
    items: [
      {
        id: bookinfo.id,
        title: bookinfo.title,
        price: bookinfo.price,
        qty: 1,
        image: bookinfo.image,
      },
    ],
  });
  //document.getElementsByClassName("numberlogo")[0].innerHTML = 1;
  $(".numberwish").text(+$(".numberwish").text() + 1);
  localStorage.setItem("wishListCart", JSON.stringify(addNewWishList));
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
      });
      totalNumberOfItems += 1; // display number of items
      document.getElementsByClassName(
        "numberlogo"
      )[0].innerHTML = totalNumberOfItems;
      $(".selectedItems").text("(1) in cart");
      localStorage.setItem("cartItems", JSON.stringify(storedItems)); // update variable in storage
      return;
    }
  }
  removeFromWishList();
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
      },
    ],
  });
  totalNumberOfItems += 1;
  document.getElementsByClassName("numberlogo")[0].innerHTML = 1;
  $(".selectedItems").text("(1) in cart");
  localStorage.setItem("userCart", JSON.stringify(storedItems));
  $(".addCartBtn").hide(); // if it's the first time for user to add elements
  $(".addWishBtn").hide();
  $(".secondTime").show();
  return;
}
