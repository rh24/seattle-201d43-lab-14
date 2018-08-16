/* global Cart */
'use strict';

// Create an event listener so that when the delete link is clicked, the removeItemFromCart method is invoked.
var table = document.getElementById('cart');
table.addEventListener('click', removeItemFromCart);
var cart;

function loadCart() {
  var cartItems = JSON.parse(localStorage.getItem('cart')) || [];
  cart = new Cart(cartItems);
}

// Make magic happen --- re-pull the Cart, clear out the screen and re-draw it
function renderCart() {
  loadCart();
  clearCart();
  showCart();
}

// TODO: Remove all of the rows (tr) in the cart table (tbody)
function clearCart() {
  Array.from(table.tBodies.item(0).children).forEach(elm => elm.remove());
}

// TODO: Fill in the <tr>'s under the <tbody> for each item in the cart
function showCart() {
  // TODO: Iterate over the items in the cart
  cart.items.forEach(item => {
    console.log({ item });
    var rowElm = document.createElement('tr');
    rowElm.className = 'table__row';
    var colElms = [];
    colElms.push(document.createElement('td'));
    var btnElm = document.createElement('button');
    btnElm.dataset.itemName = item.product.name;
    btnElm.innerText = 'x';
    colElms[0].appendChild(btnElm);
    Object.keys(item).forEach((itemParam, ndx) => {
      // console.log(item[itemParam]);
      colElms.push(document.createElement('td'));
      colElms[ndx + 1].innerText = item[itemParam].name || item[itemParam];
    });
    colElms.forEach(colElm => rowElm.appendChild(colElm));
    table.appendChild(rowElm);
  });
  // TODO: Create a TR
  // TODO: Create a TD for the delete link, quantity,  and the item
  // TODO: Add the TR to the TBODY and each of the TD's to the TR
}

function removeItemFromCart(event) {
  // TODO: When a delete link is clicked, use cart.removeItem to remove the correct item
  if (event.target.nodeName === 'BUTTON') {
    var itemToDelete = cart.items.find(
      item => (item.name = event.target.dataset.itemName)
    );
    console.log(itemToDelete);
    cart.removeItem(itemToDelete);
    // TODO: Save the cart back to local storage
    cart.saveToLocalStorage;
    // TODO: Re-draw the cart table
    clearCart();
    showCart();
  }
}

// This will initialize the page and draw the cart on screen
renderCart();
