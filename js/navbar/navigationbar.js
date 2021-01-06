// var storedItems = JSON.parse(localStorage.getItem("userCart"));
// var wishListitems = JSON.parse(localStorage.getItem("wishListCart"));

// var cookiList = [],
//     currentUser;

// function getAllCookies() {
//     var str = document.cookie,
//     splitCookie = str.split(";");
//     for(var x =0;x<splitCookie.length;x++){
//     cookiList[splitCookie[x].split("=")[0].trim()]=splitCookie[x].split("=")[1].trim();
//     }
//     currentUser = cookiList["useremail"];
// }

// function updateUsercartItemsNumber() {
//     getAllCookies();
//     if (currentUser == "" || currentUser == null || currentUser == undefined) {
//         document.getElementsByClassName("numberlogo")[0].innerHTML = 0;
//     }
//     else {
//         var count = 0;
//         for (idx in storedItems) {
//             if (storedItems[idx].useremail == currentUser) {
//                 for (x in storedItems[idx].items) {
//                     count += storedItems[idx].items[x].qty;
//                 }
//                 document.getElementsByClassName("numberlogo")[0].innerHTML = count;
//                 }
//             }
//         }
//     }
// function updateUserWishesList() {
//     if (currentUser == "" || currentUser == null || currentUser == undefined) {
//         //document.getElementsByClassName("numberlogo")[0].innerHTML = 0;
//     }
//     else {
//         var count = 0;
//         for (idx in wishListitems) {
//             if (wishListitems[idx].useremail == currentUser) {
//                 count = wishListitems[idx].items.length;
//                 //document.getElementsByClassName("numberlogo")[0].innerHTML = totalNumberOfItems;
//             }
//         }
//     }
// }
