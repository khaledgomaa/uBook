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
  return -1;
}

function updateStockForItemInCartItems(allCartItems, id, numInStock) {
  for (var i in allCartItems) {
    var index = findItemIndex(allCartItems[i].items, id);
    if (index > -1) {
      allCartItems[i].items[index].stock = numInStock;
    }
  }
  localStorage.setItem("cartItems", JSON.stringify(allCartItems));
  console.log(allCartItems);
}
