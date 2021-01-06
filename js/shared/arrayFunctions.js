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
