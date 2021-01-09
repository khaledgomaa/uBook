$("#header").load("./navbar.html");
$("#cartfooter").load("./footer.html");

var userEmail = cookie.getCookie("useremail");
var allCartItems = JSON.parse(localStorage.getItem("cartItems"));
var cartitem = findItem(allCartItems, userEmail);
var tableBody = document.getElementById("items");

$(".submitForm").click(function () {
  checkoutCartItems();
  displayOrderFinished();
  checkCart();
});

$(".currency").on("change", function () {
  changeCurrency(this.value);
});

onload = function () {
  checkCart();
  //get tbody element
  displayCartItems(tableBody);

  setTimeout(function () {
    $("#header").show();
    $("#cartContainer").show();
    $(".currency").show();
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
    addTotalElement("Total Price", computeTotalPrice(), row);
  }
}

function createItem(item, tableBody) {
  var row = createRow(tableBody);
  row.setAttribute("id", "tr" + item.id);
  //image Attribute
  var column = createColumn(row);
  column.style.maxWidth = "200px";
  column.style.minWidth = "200px";
  createImageTag(column, item.image);
  //Title
  column = createColumn(row);
  column.style.maxWidth = "300px";
  column.style.minWidth = "300px";
  column.innerHTML = item.title;
  //Input tag
  column = createColumn(row);
  column.style.maxWidth = "75px";
  column.style.minWidth = "75px";
  createInputTag(column, item.qty, 1, item.id, item.stock + item.qty);
  //price attribute
  column = createColumn(row);
  column.innerHTML = item.price;
  column.style.maxWidth = "70px";
  column.style.minWidth = "70px";
  //total Price attribute
  column = createColumn(row);
  column.innerHTML = (item.qty * +item.price).toFixed(2);
  column.style.maxWidth = "100px";
  column.style.minWidth = "100px";

  column = createColumn(row);
  column.style.maxWidth = "70px";
  column.style.minWidth = "70px";
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

function createImageTag(column, src) {
  column.innerHTML =
    "<img src=../images/" +
    src +
    " style= 'max-width: 200px; min-width: 200px;' />";
}

function createInputTag(column, value, min, id, stockAvailable) {
  column.innerHTML =
    "<input id=qty" +
    id +
    " type='number' min=" +
    min +
    " max=" +
    stockAvailable +
    " value=" +
    value +
    " style= 'max-width: 70px; min-width: 70px;' />";

  var inputFeild = document.getElementById("qty" + id);
  inputFeild.addEventListener("change", function () {
    updateTotalPriceForItem(id, inputFeild.value);
    updateCartItem(id, +inputFeild.value);
    updateTotal(computeTotalItems(), computeTotalPrice());
    updateStockForItemInCartItems(
      allCartItems,
      id,
      +$("#qty" + id).attr("max") - inputFeild.value
    );
  });
  inputFeild.addEventListener("keypress", function (e) {
    e.preventDefault();
  });
}

function addTotalElement(name, value, row) {
  var column = createColumn(row);
  column.setAttribute("colSpan", 5);
  column.setAttribute("class", "align-right");
  column.style.maxWidth = "100px";
  column.style.minWidth = "100px";
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
    var itemIndex = findItemIndex(allCartItems[userIndex].items, id);
    var newStock =
      allCartItems[userIndex].items[itemIndex].stock +
      allCartItems[userIndex].items[itemIndex].qty;
    if (allCartItems[userIndex].items.length > 1) {
      allCartItems[userIndex].items.splice(itemIndex, id);
    } else {
      allCartItems.splice(userIndex);
    }

    localStorage.setItem("cartItems", JSON.stringify(allCartItems));
    document.getElementById("tr" + id).remove();
    updateTotal(computeTotalItems(), computeTotalPrice());
    updateStockForItemInCartItems(allCartItems, id, newStock);
    checkCart();
  });
}

function updateTotalPriceForItem(rowNum, newValue) {
  var row = document.getElementById("tr" + rowNum);
  var curPrice = row.getElementsByTagName("td")[3].innerHTML;
  row.getElementsByTagName("td")[4].innerHTML = +(
    +newValue * +curPrice
  ).toFixed(2);
}

function computeTotalItems() {
  var total = 0;
  for (var i = 0; i < cartitem.items.length; i++) {
    total += cartitem.items[i].qty;
  }

  return +total.toFixed(2);
}

function computeTotalPrice() {
  var total = 0;
  var allRows = document.getElementById("items").getElementsByTagName("tr");
  for (var i = 0; i < allRows.length - 2; i++) {
    total += +allRows[i].getElementsByTagName("td")[4].innerHTML;
  }

  return +total.toFixed(2);
}

function updateTotal(totalItems, totalPrice) {
  document
    .getElementById("totalItems")
    .getElementsByTagName("td")[1].innerHTML = totalItems;
  document
    .getElementById("totalPrice")
    .getElementsByTagName("td")[1].innerHTML = totalPrice.toFixed(2);
  $(".numberlogo").text(totalItems);
}

function updateCartItem(id, value) {
  cartitem.items[findItemIndex(cartitem.items, id)].qty = value;
  allCartItems[findItemIndex(allCartItems, userEmail)].items = cartitem.items;
  localStorage.setItem("cartItems", JSON.stringify(allCartItems));
}

function checkoutCartItems() {
  allCartItems.splice(findItemIndex(allCartItems, userEmail), 1);
  cartitem.items = [];
  $(".numberlogo").text(0);
  localStorage.setItem("cartItems", JSON.stringify(allCartItems));
}

function displayOrderFinished() {
  $("#cartImage").attr("src", "../images/checkout.png");
  document.getElementById("message").innerHTML =
    "Thank you , You have successfully purchased the items";
}

function changeCurrency(currency) {
  var allRows = document.getElementById("items").getElementsByTagName("tr");
  if (currency == "EGP") {
    convertCurrencyRequest("USD", "EGP", allRows);
  } else {
    convertCurrencyRequest("EGP", "USD", allRows);
  }
  changePriceHeader(currency);
}

function convertPricesToAnotherCurrency(value, allRows) {
  var total = 0;
  for (var i = 0; i < allRows.length - 2; i++) {
    var oldValue = allRows[i].getElementsByTagName("td")[3].innerHTML;
    var newPrice = (+oldValue * +value).toFixed(2);
    allRows[i].getElementsByTagName("td")[3].innerHTML = newPrice;
    var currentQuantity = allRows[i]
      .getElementsByTagName("td")[2]
      .getElementsByTagName("input")[0].value;
    total += +currentQuantity * newPrice;
    allRows[i].getElementsByTagName("td")[4].innerHTML = (
      +currentQuantity * newPrice
    ).toFixed(2);
  }
  allRows[allRows.length - 1].getElementsByTagName(
    "td"
  )[1].innerHTML = total.toFixed(2);
}

function convertCurrencyRequest(from, to, allRows) {
  $.ajax({
    type: "GET",
    url:
      "https://free.currconv.com/api/v7/convert?q=" +
      from +
      "_" +
      to +
      "&compact=ultra&apiKey=614ed387ee809f1a9ff1",
    dataType: "json",
    jsonp: false,
    cache: true,
    success: function (resp) {
      convertPricesToAnotherCurrency(resp[from + "_" + to], allRows, to);
    },
  });
}

function changePriceHeader(currency) {
  document
    .getElementById("theadItems")
    .getElementsByTagName("tr")[0]
    .getElementsByTagName("th")[3].innerHTML = "price / " + currency;
}
