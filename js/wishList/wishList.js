$("#header").load("./navbar.html");
$("#cartfooter").load("./footer.html");
var wishList = [
  {
    useremail: "islam@gmail.com",
    items: [
      {
        id: 2,
        image: "headFirst.jpg",
        title: "Head First Design Patterns",
        qty: 1,
        price: 66,
      },
      {
        id: 3,
        image: "machineLearning.jpg",
        title: "Machine Learning Design Patterns",
        qty: 1,
        price: 35,
      },
    ],
  },

  {
    useremail: "khaled@gmail.com",
    items: [
      {
        id: 0,
        image: "Cplusplus.jpg",
        title: "Design Pattern In C++",
        qty: 2,
        price: 54,
      },
      {
        id: 1,
        image: "headfirst.jpg",
        title: "Design patterns head First",
        qty: 3,
        price: 50,
      },
    ],
  },
];

cookie.setCookie("useremail", "islam@gmail.com");

localStorage.setItem("wishListCart", JSON.stringify(wishList));

//Getting user data
var userEmail = cookie.getCookie("useremail");
var allCartItems = JSON.parse(localStorage.getItem("cartItems"));
var allWishList = JSON.parse(localStorage.getItem("wishListCart"));
var wishitems = findItem(allWishList, userEmail);

var tableBody = document.getElementById("items");

onload = function () {
  checkCart();
  //get tbody element
  displayCartItems(tableBody);

  setTimeout(function () {
    $("#header").show();
    $("#cartContainer").show();
    $("#preLoader").hide();
  }, 300);
};

function checkCart() {
  if (
    userEmail == "Not Found" ||
    wishitems === undefined ||
    wishitems.items.length === 0
  ) {
    showEmptyCart();
  } else {
    showCartItems();
  }
}

function showEmptyCart() {
  $("#tableCart").hide();
  $("#emptyCart").show();
  $(".submitForm").hide();
}

function showCartItems() {
  $("#tableCart").show();
  $("#emptyCart").hide();
  $(".submitForm").show();
}

function displayCartItems() {
  if (wishitems !== undefined) {
    for (var i = 0; i < wishitems.items.length; i++) {
      //create row for each item in cartItems object
      createItem(wishitems.items[i], tableBody, i);
    }
  }
}

function createItem(item, tableBody) {
  var row = createRow(tableBody);
  row.setAttribute("id", "tr" + item.id);
  //image Attribute
  var column = createColumn(row);
  createImageTag(column, item.image, 70, 50);
  //Title
  column = createColumn(row);
  column.innerHTML = item.title;
  //price attribute
  column = createColumn(row);
  column.innerHTML = item.price + "$";

  column = createColumn(row);
  createAddToCartButton(column, item.id);

  column = createColumn(row);
  createRemoveItemFromWishList(column, item.id);
}

function createRow(tableBody) {
  var row = document.createElement("TR");
  tableBody.appendChild(row);
  return row;
}

function createColumn(row) {
  var column = document.createElement("TD");
  row.appendChild(column);
  return column;
}

function createImageTag(column, src, width, height) {
  column.innerHTML =
    "<img src=../images/" +
    src +
    " width=200px" +
    width +
    " height=200px" +
    height +
    " />";
}

function createAddToCartButton(column, id) {
  column.innerHTML =
    "<div class='addTomyCart' id =add" +
    id +
    ">" +
    "<i class='fa fa-cart-plus'></i></div>";
  document.getElementById("add" + id).addEventListener("click", function () {
    var addedItemIndex = findItemIndex(wishitems.items, id);
    var userIndex = findItemIndex(allWishList, userEmail);
    addItemTocartItems(addedItemIndex, userIndex);
    removeItemFromWishList(id, addedItemIndex);
    $(".numberlogo").text(+$(".numberlogo").text() + 1);
    checkCart();
    console.log(JSON.parse(localStorage.getItem("wishListCart")));
    console.log(JSON.parse(localStorage.getItem("cartItems")));
  });
}

function createRemoveItemFromWishList(column, id) {
  column.innerHTML =
    "<div class='remove' id =del" +
    id +
    ">" +
    "<i class='fa fa-trash'></i></div>";
  document.getElementById("del" + id).addEventListener("click", function () {
    removeItemFromWishList(id, findItemIndex(wishitems.items, id));
    checkCart();
    console.log(JSON.parse(localStorage.getItem("wishListCart")));
    console.log(JSON.parse(localStorage.getItem("cartItems")));
  });
}

function removeItemFromWishList(id, addedItemIndex) {
  var userIndex = findItemIndex(allWishList, userEmail);
  wishitems.items.splice(addedItemIndex, 1);
  allWishList = JSON.parse(localStorage.getItem("wishListCart"));
  allWishList[userIndex].items.splice(
    findItemIndex(allWishList[userIndex].items, id),
    1
  );
  document.getElementById("tr" + id).remove();
  localStorage.setItem("wishListCart", JSON.stringify(allWishList));
}

function addItemTocartItems(index) {
  allCartItems[findItemIndex(allCartItems, userEmail)].items.push(
    wishitems.items[index]
  );
  localStorage.setItem("cartItems", JSON.stringify(allCartItems));
}

function computeTotalItems() {
  var total = 0;
  for (var i = 0; i < cartitem.items.length; i++) {
    total += cartitem.items[i].qty;
  }

  return total;
}