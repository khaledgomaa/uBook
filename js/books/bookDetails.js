$("#bookDetailsHeader").load("./navbar.html");   // include navbar on loading
$("#bookDetailsFooter").load("./footer.html");  //include footer onloading

document.cookie = "selectedBook=2";
document.cookie = "useremail=Fady@gmail.com";

var bookId = cookiList["selectedBook"];
    bookinfo = {},
    totalNumberOfItems = 0,
    totalNumberOfWishList=0;

    
    
var wishList = [
    {
        useremail: "islam@gmail.com",
        items:[{
        id:25,
        title:"Python Tricks",
        price:30,
        qty: 1,
        image:"PythonTricks.jpg",
        }]
    },
    {
        useremail: "islam@gmail.com",
        items:[{
        id:25,
        title:"Python Tricks",
        price:30,
        qty: 1,
        image:"PythonTricks.jpg",
        }]
    }
];


localStorage.setItem("wishListCart", JSON.stringify(wishList));


var cartItems = [
    {
        useremail: "islam@gmail.com",
        items:[{
        id:25,
        title:"Python Tricks",
        price:30,
        qty: 1,
        image:"PythonTricks.jpg",
        }]
    },
    {
        useremail: "khaled@gmail.com",
        items:[{
        id:"Learn Python 3 the Hard Way",
        title:"Learn Python 3 the Hard Way",
        price:32,
        qty: 1,
        image:"LearnPython.jpg"
        }]
    }
]
localStorage.setItem("userCart", JSON.stringify(cartItems));


/* Start XML HTTP REQUEST to get the data file*/


    var xhr = new XMLHttpRequest() // create request
    xhr.open('GET', '../DB/booksData.json');
    xhr.send();
    xhr.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            var booksObject = JSON.parse(this.responseText);
            for (var category in booksObject)
                for (var book in booksObject[category])
                    if (booksObject[category][book].id == bookId)
                        bookinfo = booksObject[category][book];
            // Update information of the selected book in bookdetails page
            
            document.getElementsByClassName("bookTitle")[0].innerHTML = bookinfo.title;
            document.getElementsByClassName("bookAuthor")[0].innerHTML = bookinfo.author;
            document.getElementsByClassName("bookPrice")[0].innerHTML = bookinfo.price;
            document.getElementsByClassName("bookRate")[0].innerHTML = bookinfo.rate;
            $(".bookImage").attr("src", "../images/" + bookinfo.image); 

            if (currentUser == "" || currentUser == null || currentUser == undefined)  // if user didn't sign in set cart to 0 
                document.getElementsByClassName("numberlogo")[0].innerHTML = 0;
            else {
                getTotalNumberOfItems();
                getTotalNumberOfWhishlist();
                updateUserWishesList();
                updateUsercartItemsNumber();                                                               // if user signed in  and this is not the first time to add this element
                for (idx in storedItems) {                                          // display n in cart and hide add to cart
                    if (storedItems[idx].useremail == currentUser) {
                        for (x in storedItems[idx].items) {
                            if (storedItems[idx].items[x].id == bookinfo.id)
                            {
                                $(".selectedItems").text("(" + storedItems[idx].items[x].qty + ") in cart");
                                $(".addCartBtn").hide();
                                $(".addWishBtn").hide();
                                $(".secondTime").show();
                                }
                        }
                    }
                }
            }  
        }
    };

// when the request and response are okay get json objec
                                                                                    // this is the first time for the user to add elements to cart
document.getElementsByClassName("addCartBtn")[0].onclick = function () {            // or this first time for the user to add this element to cart
    if (currentUser == "" || currentUser == null || currentUser == undefined)
        document.getElementsByClassName("numberlogo")[0].innerHTML = 0;         // check if user signed in or not
    else {
        addItemsToCart();
    }
};
document.getElementsByClassName("addWishBtn")[0].onclick = function () {
        if (currentUser == "" || currentUser == null || currentUser == undefined);
        //document.getElementsByClassName("numberlogo")[0].innerHTML = 0; 
        else {
            addToWishList();
        }
};
document.getElementsByClassName("plus")[0].onclick = function () {
        updateCurrentQuantity(1);
};
document.getElementsByClassName("minus")[0].onclick = function () {
        updateCurrentQuantity(-1);
};
function updateCurrentQuantity(num) {     // update the cart according to the current user and his/her cart

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
                        }
                        else {
                            storedItems[idx].items[x].qty = itemQuan;
                            $(".selectedItems").text("(" + storedItems[idx].items[x].qty + ") in cart");
                        }
                        totalNumberOfItems += num;
                        document.getElementsByClassName("numberlogo")[0].innerHTML = totalNumberOfItems;
                        localStorage.setItem("userCart", JSON.stringify(storedItems));
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
                    if (wishListitems[idx].items[x].id == bookinfo.id)
                    {
                        wishListitems[idx].items.splice(x, 1);
                        localStorage.setItem("wishListCart", JSON.stringify(wishListitems));
                        }
                       
                }
            }
        }
}
function checkWishList() {
        for (idx in wishListitems) {
            if (wishListitems[idx].useremail == currentUser) {
                for (x in wishListitems[idx].items) {
                    if (wishListitems[idx].items[x].id == bookinfo.id)
                        return true;
                }
            }
        }
        return false;
}

function addToWishList() {

        for (idx in wishListitems) {    // if the current user already has wishes before
            if (wishListitems[idx].useremail == currentUser) {
                $(".addWishBtn").hide();
                wishListitems[idx].items.push({
                    id: bookinfo.id,
                    title: bookinfo.title,
                    price: bookinfo.price,
                    qty: 1,
                    image: bookinfo.image
                });
                localStorage.setItem("wishListCart", JSON.stringify(wishListitems));
                return;
            }
        }
        ///if the current user doesn't have wishes before

        $(".addWishBtn").hide();
        wishListitems.push({          // add new object to storage
            useremail: currentUser,
            items: [{
                id: bookinfo.id,
                title: bookinfo.title,
                price: bookinfo.price,
                qty: 1,
                image: bookinfo.image
            }],
        });
        //document.getElementsByClassName("numberlogo")[0].innerHTML = 1;
        localStorage.setItem("wishListCart", JSON.stringify(wishListitems));
        return;
}

function addItemsToCart() {
        for (idx in storedItems) {
            if (storedItems[idx].useremail == currentUser) {                  // if user wants to add new items to cart
                $(".addCartBtn").hide();
                $(".addWishBtn").hide();
                $(".secondTime").show();
                removeFromWishList();
                storedItems[idx].items.push({
                    id: bookinfo.id,
                    title: bookinfo.title,
                    price: bookinfo.price,
                    qty: 1,
                    image: bookinfo.image
                });
                totalNumberOfItems += 1;                                            // display number of items
                document.getElementsByClassName("numberlogo")[0].innerHTML = totalNumberOfItems;
                $(".selectedItems").text("(1) in cart");
                localStorage.setItem("userCart", JSON.stringify(storedItems)); // update variable in storage
                return;
            }
        }
        removeFromWishList();
        storedItems.push({          // add new object to storage
            useremail: currentUser,
            items: [{
                id: bookinfo.id,
                title: bookinfo.title,
                price: bookinfo.price,
                qty: 1,
                image: bookinfo.image
            }],
        });
        totalNumberOfItems += 1;
        document.getElementsByClassName("numberlogo")[0].innerHTML = 1;
        $(".selectedItems").text("(1) in cart");
    localStorage.setItem("userCart", JSON.stringify(storedItems));
    $(".addCartBtn").hide();  // if it's the first time for user to add elements
        $(".addWishBtn").hide();
        $(".secondTime").show();
        return;
}