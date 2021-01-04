$("#header").load("./navbar.html");
$("#cartfooter").load("./footer.html");
var cartItems = [
  {
    useremail: "islam@gmail.com",
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

//Convert linq expressions to loop
//update local storage when delete

cookie.setCookie("useremail", "khaled@gmail.com");
localStorage.setItem("cartItems", JSON.stringify(cartItems));
var userEmail = cookie.getCookie("useremail");
var allCartItems = JSON.parse(localStorage.getItem("cartItems"));
var cartitem = findItem(allCartItems, userEmail);
var tableBody = document.getElementById("items");

$(".submitForm").click(function () {
  checkoutCartItems();
  displayOrderFinished();
  checkCart();
  console.log(JSON.parse(localStorage.getItem("cartItems")));
});

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
    cartitem === undefined ||
    cartitem.items.length === 0
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
  if (cartitem !== undefined) {
    for (var i = 0; i < cartitem.items.length; i++) {
      //create row for each item in cartItems object
      createItem(cartitem.items[i], tableBody, i);
    }

    var row = createRow(tableBody);
    row.setAttribute("id", "totalItems");
    addTotalElement("Total Items", computeTotalItems(), row);

    row = createRow(tableBody);
    row.setAttribute("id", "totalPrice");
    addTotalElement("Total Price", computeTotalPrice() + "$", row);
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
  //Input tag
  column = createColumn(row);
  createInputTag(column, item.qty, 1, item.id);
  //price attribute
  column = createColumn(row);
  column.innerHTML = item.price + "$";
  //total Price attribute
  column = createColumn(row);
  column.innerHTML = item.qty * item.price + "$";

  column = createColumn(row);
  createDeleteButton(column, item.id);
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
    " width=" +
    width +
    " height=" +
    height +
    " />";
}

function createInputTag(column, value, min, id) {
  column.innerHTML =
    "<input id=qty" +
    id +
    " type='number' min=" +
    min +
    " value=" +
    value +
    " />";
  var inputFeild = document.getElementById("qty" + id);
  inputFeild.addEventListener("change", function () {
    updateTotalPriceForItem(id, inputFeild.value);
    updateCartItem(id, +inputFeild.value);
    updateTotal(computeTotalItems(), computeTotalPrice());
  });
}

function addTotalElement(name, value, row) {
  var column = createColumn(row);
  column.setAttribute("colSpan", 5);
  column.setAttribute("class", "align-right");
  column.innerHTML = name;
  column = createColumn(row);
  column.innerHTML = value;
}

function createDeleteButton(column, id) {
  column.innerHTML =
    "<div class='remove' id =del" +
    id +
    ">" +
    "<i class='fa fa-trash'></i></div>";
  document.getElementById("del" + id).addEventListener("click", function () {
    cartitem.items.splice(findItemIndex(cartitem.items, id), 1);
    var userIndex = findItemIndex(allCartItems, userEmail);
    allCartItems = JSON.parse(localStorage.getItem("cartItems"));
    allCartItems[userIndex].items.splice(
      findItemIndex(allCartItems[userIndex].items, id),
      1
    );
    localStorage.setItem("cartItems", JSON.stringify(allCartItems));
    document.getElementById("tr" + id).remove();
    updateTotal(computeTotalItems(), computeTotalPrice());
    checkCart();
    console.log(JSON.parse(localStorage.getItem("cartItems")));
  });
}

function updateTotalPriceForItem(rowNum, newValue) {
  var row = document.getElementById("tr" + rowNum);
  var curPrice = row.getElementsByTagName("td")[3].innerHTML.replace("$", "");
  row.getElementsByTagName("td")[4].innerHTML = +newValue * +curPrice + "$";
}

function computeTotalItems() {
  var total = 0;
  for (var i = 0; i < cartitem.items.length; i++) {
    total += cartitem.items[i].qty;
  }

  return total;
}

function computeTotalPrice() {
  var total = 0;
  for (var i = 0; i < cartitem.items.length; i++) {
    total += cartitem.items[i].qty * cartitem.items[i].price;
  }

  return total;
}

function updateTotal(totalItems, totalPrice) {
  document
    .getElementById("totalItems")
    .getElementsByTagName("td")[1].innerHTML = totalItems;
  document
    .getElementById("totalPrice")
    .getElementsByTagName("td")[1].innerHTML = totalPrice + "$";
  $(".numberlogo").text(totalItems);
}

function updateCartItem(id, value) {
  cartitem.items[findItemIndex(cartitem.items, id)].qty = value;
  allCartItems[findItemIndex(allCartItems, userEmail)].items = cartitem.items;
  localStorage.setItem("cartItems", JSON.stringify(allCartItems));
  console.log(JSON.parse(localStorage.getItem("cartItems")));
}

function checkoutCartItems() {
  allCartItems.splice(findItemIndex(allCartItems, userEmail), 1);
  cartitem.items = [];
  localStorage.setItem("cartItems", JSON.stringify(allCartItems));
}

function displayOrderFinished() {
  $("#cartImage").attr("src", "../images/checkout.png");
  document.getElementById("message").innerHTML =
    "Thank you , You have successfully purchased the items";
}

function findItem(cartList, value) {
  for (var item in cartList) {
    if (typeof value === "number") {
      if (cartList[item].id == value) {
        return item;
      }
    } else if (typeof value === "string") {
      if (cartList[item].useremail == value) {
        return cartList[item];
      }
    }
  }
}

function findItemIndex(cartList, value) {
  for (var item in cartList) {
    if (typeof value === "number") {
      if (cartList[item].id == value) {
        return item;
      }
    } else if (typeof value === "string") {
      if (cartList[item].useremail == value) {
        return item;
      }
    }
  }
}
