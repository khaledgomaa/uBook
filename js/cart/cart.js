$("#navbar").load("./navbar.html");

var cartItems = [
  {
    image: "Cplusplus.jpg",
    title: "Design Pattern In C++",
    qty: 2,
    price: 54,
  },
  {
    image: "Cplusplus.jpg",
    title: "Design Pattern In C++",
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
  var total = 0;
  for (var i = 0; i < cartItems.length; i++) {
    //create row for each item in cartItems object
    total += createItem(cartItems[i], tableBody, i);
  }

  var row = createRow(tableBody);
  addTotalElement("Total Items", cartItems.length, row);

  row = createRow(tableBody);
  addTotalElement("Total Price", total + "$", row);
}

function createItem(item, tableBody, id) {
  var row = createRow(tableBody);
  //image Attribute
  var column = createColumn(row);
  createImageTag(column, item.image, 70, 50);
  //Title
  column = createColumn(row);
  column.innerHTML = item.title;
  //Input tag
  column = createColumn(row);
  createInputTag(column, item.qty, 1);
  //price attribute
  column = createColumn(row);
  column.innerHTML = item.price + "$";
  //total Price attribute
  column = createColumn(row);
  var total = item.price * item.qty;
  column.innerHTML = total + "$";

  column = createColumn(row);
  createDeleteButton(column, id);

  return total;
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

function createInputTag(column, value, min) {
  column.innerHTML =
    "<input type='number' min=" + min + " value=" + value + " />";
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
    "<div class='remove' id =" + id + ">" + "<i class='fa fa-trash'></i></div>";
  document.getElementById(id).addEventListener("click", function () {
    cartItems.splice(id, 1);
    tableBody.innerHTML = "";
    displayCartItems(tableBody);
    checkCart();
  });
}
