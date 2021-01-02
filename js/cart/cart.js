$("#header").load("./navbar.html");
$("#cartfooter").load("./footer.html");
var cartItems = [
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
];
var tableBody = document.getElementById("items");

onload = function () {
  checkCart();
  //get tbody element
  displayCartItems(tableBody);
};

function checkCart() {
  if (cartItems.length === 0) {
    $("#tableCart").hide();
    $("#emptyCart").show();
  } else {
    $("#tableCart").show();
    $("#emptyCart").hide();
  }
}

function displayCartItems() {
  for (var i = 0; i < cartItems.length; i++) {
    //create row for each item in cartItems object
    createItem(cartItems[i], tableBody, i);
  }

  var row = createRow(tableBody);
  row.setAttribute("id", "totalItems");
  addTotalElement("Total Items", computeTotalItems(), row);

  row = createRow(tableBody);
  row.setAttribute("id", "totalPrice");
  addTotalElement("Total Price", computeTotalPrice() + "$", row);
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
    cartItems.splice(id, 1);
    document.getElementById("tr" + id).remove();
    updateTotal(computeTotalItems(), computeTotalPrice());
    checkCart();
  });
}

function updateTotalPriceForItem(rowNum, newValue) {
  var row = document.getElementById("tr" + rowNum);
  var curPrice = row.getElementsByTagName("td")[3].innerHTML.replace("$", "");
  row.getElementsByTagName("td")[4].innerHTML = +newValue * +curPrice + "$";
}

function computeTotalItems() {
  var total = 0;
  for (var i = 0; i < cartItems.length; i++) {
    total += cartItems[i].qty;
  }

  return total;
}

function computeTotalPrice() {
  var total = 0;
  for (var i = 0; i < cartItems.length; i++) {
    total += cartItems[i].qty * cartItems[i].price;
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
}

function updateCartItem(id, value) {
  cartItems.find((x) => x.id == id).qty = value;
}
