var cart = {
  productList : null, // Products list in the html 
  currentCart : null, // Current cart in the html
  currentItems : {}, // current items in cart 
  productURL : "../images/", // product images
  //creating save function, saving the carts current items into local storage
  save : function () {
    localStorage.setItem("cart", JSON.stringify(cart.currentItems));
  },
  //loading our cart from the localstorage
  //creating load function, to get items in cart from localstorage
  load : function () {
    cart.currentItems = localStorage.getItem("cart");
    if (cart.currentItems == null) { cart.currentItems = {}; }
    //using an else statement to just create an empty json file
    else { cart.currentItems = JSON.parse(cart.currentItems); }
  },
  //creating a function to empty cart
  vanish : function () {
    // if empty cart is clicked/confirmed
    if (confirm("clear cart?")) {
      //take current items in cart
      cart.currentItems = {};
      //remove the items from the cart/local storage
      localStorage.removeItem("cart");
      cart.list();
    }
  },
  // creating a start function to pull our html elements
  start : function () {
    //setting the get element method ID 
    //to our cart products and items on our html
    cart.productList = document.getElementById("cart-products");
    cart.currentCart = document.getElementById("cart-items");


    // pulling our products list
    cart.productList.innerHTML = "";
    //setting our variables
    let p, item, part;
    //creating a for loop a
    for (let id in products) {
      //creating a wrapper for our product objects
      p = products[id];
      item = document.createElement("div");
      item.className = "p-item";
      cart.productList.appendChild(item);
      // adding product image by creating a html element
      part = document.createElement("img");
      part.src = cart.productURL + p.img;
      part.className = "p-img";
      item.appendChild(part);
      // adding product nmae
      part = document.createElement("div");
      part.innerHTML = p.name;
      part.className = "p-name";
      item.appendChild(part);
      //adding product description
      part = document.createElement("div");
      part.innerHTML = p.desc;
      part.className = "p-desc";
      item.appendChild(part);
      //adding product price
      part = document.createElement("div");
      part.innerHTML = "£" + p.price;
      part.className = "p-price";
      item.appendChild(part);
      //creating html element for input
      part = document.createElement("input");
      part.type = "button";
      part.value = "Add to Cart";
      part.className = "cart p-add";
      part.onclick = cart.add;
      part.dataset.id = id;
      item.appendChild(part);
    }
    //calling functions
    cart.load();
    cart.list();
  },
  // listing current cart items
  list : function () {
    
    //getting current cart from inner html
    cart.currentCart.innerHTML = "";
    //setting variables
    let item, part, pdt;
    // creating a variable empty, giving it the value true
    let empty = true;
    //creating a for loop, to loop through the products in the cart
    for (let key in cart.currentItems) {
      //if the item key isnt in the cat then break
      if(cart.currentItems.hasOwnProperty(key)) { empty = false; break; }
    }
    //checking if the cart is empty
    if (empty) {
      item = document.createElement("div");
      item.innerHTML = "Cart is empty";
      cart.currentCart.appendChild(item);
    }

    //if the cart isnt empty
    else {
      let p, total = 0, subtotal = 0;
      //looping through the items in the cart
      for (let id in cart.currentItems) {
        //items
        //getting the id of the product in the cart
        p = products[id];
        //creating a div element
        item = document.createElement("div");
        //assigning it a class name c-item
        item.className = "c-item";
        cart.currentCart.appendChild(item);

        //Name
        part = document.createElement("div");
        part.innerHTML = p.name;
        part.className = "c-name";
        item.appendChild(part);
        // creating an html element assigned input
        part = document.createElement("input");
        //type button
        part.type = "button";
        //setting value x on the button
        part.value = "X";
        part.dataset.id = id;
        part.className = "c-del cart";
        //creating an eventlistener for the click then removing items on cart
        part.addEventListener("click", cart.remove);
        item.appendChild(part);


        part = document.createElement("input");
        part.type = "number";
        part.min = 0;
        part.value = cart.currentItems[id];
        part.dataset.id = id;
        part.className = "c-qty";
        part.addEventListener("change", cart.change);
        item.appendChild(part);

        subtotal = cart.currentItems[id] * p.price;
        total += subtotal;
      }

      item = document.createElement("div");
      item.className = "c-total";
      item.id = "c-total";
      item.innerHTML ="TOTAL: £" + total;
      cart.currentCart.appendChild(item);
      //creating an empty button
      // creating an input element 
      item = document.createElement("input");
      //setting type to button
      item.type = "button";
      //setting value to string empty
      item.value = "Empty";
      //creating eventlistener for the click then running vanish function
      item.addEventListener("click", cart.vanish);
      item.className = "c-empty cart";
      cart.currentCart.appendChild(item);
      //Creating a checkout button
      item = document.createElement("input");
      item.type = "button";
      item.value = "Checkout";
      item.addEventListener("click", cart.checkout);
      item.className = "c-checkout cart";
      cart.currentCart.appendChild(item);
    }
  },
  //creating an increasing item function
  add : function () {
    if (cart.currentItems[this.dataset.id] == undefined) {
      cart.currentItems[this.dataset.id] = 1;
    } else {
      cart.currentItems[this.dataset.id]++;
    }
    cart.save();
    cart.list();
  },
  //creating a minus or decrease item function
  decrease : function () {
    // if the value is greater then or equal 
    if (this.value <= 0) {
      // then delete the item from the cart
      delete cart.currentItems[this.dataset.id];
      cart.save();
      cart.list();
    }
    else {
      cart.currentItems[this.dataset.id] = this.value;
      var total = 0;
      for (let id in cart.currentItems) {
        total += cart.currentItems[id] * products[id].price;
        document.getElementById("c-total").innerHTML ="TOTAL: £" + total;
      }
    }
  },
  //Deleting function for the cart
  remove : function () {
    //pulling item in cart and deleting it from the cart
    delete cart.currentItems[this.dataset.id];
    cart.save();
    cart.list();
  },

  checkout : function () {
    alert("Processing Order!");

  }
};
//
window.addEventListener("DOMContentLoaded", cart.start);
