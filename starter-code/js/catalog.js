/* global Product, Cart */

'use strict';

// Set up an empty cart for use on this page.
var cart = new Cart([]);

// On screen load, we call this method to put all of the busmall options
// (the things in the Product.allProducts array) into the drop down list.
function populateForm() {
  // grab the select element with class .items
  let dropdown = document.querySelectorAll('#items')[0];
  // generate option with id
  Product.allProducts.forEach(product => {
    let id = product.name.replace(/\s+/g, '-').toLowerCase();
    let option = createEl('option', product.name, id);
    dropdown.appendChild(option);
  });
}

function createEl(type, content, id = null) {
  let el = document.createElement(type);
  el.textContent = content;
  el.id = id;
  el.value = id;

  return el;
}

// When someone submits the form, we need to add the selected item to the cart
// object, save the whole thing back to local storage and update the screen
// so that it shows the # of items in the cart and a quick preview of the cart itself.
function handleSubmit(event) {
  // TODO: Prevent the page from reloading
  event.preventDefault();

  // Do all the things ...
  addSelectedItemToCart();
  cart.saveToLocalStorage();
  updateCounter();
  updateCartPreview();
}

// TODO: Add the selected item and quantity to the cart
function addSelectedItemToCart() {
  let form = document.forms['catalog'];
  // TODO: suss out the item picked from the select list
  let item = form.querySelector('#items').value;
  // TODO: get the quantity
  let quantity = Number(form.querySelector('#quantity').value);
  // TODO: using those, add one item to the Cart
  let localCart = JSON.parse(localStorage.getItem('cart'));
  // debugger;
  if (localCart.length) {
    cart.items = localCart.map(cartItem => new CartItem(cartItem.product, cartItem.quantity));
    cart.addItem(item, quantity);
  }
}

// TODO: Update the cart count in the header nav with the number of items in the Cart
function updateCounter() {
  // <span id="itemCount">
  let cartCount = document.querySelector('#itemCount');
  let cart = JSON.parse(localStorage.getItem('cart'));
  if (!cartCount.querySelector('p')) {
    cartCount.appendChild(createEl('p', cart.length));
  } else {
    cartCount.querySelector('p').textContent = cart.length;
  }
}

// TODO: As you add items into the cart, show them (item & quantity) in the cart preview div
function updateCartPreview() {
  // TODO: Pull from local storage to update preview of cart items
  let form = document.forms['catalog'];
  let item = form.querySelector('#items').value;
  let localQuantity = JSON.parse(localStorage.getItem('cart')).find(cartItem => cartItem.product === item).quantity;

  // TODO: Add a new element to the cartContents div with that information
  let preview = document.querySelector('#cartContents');
  if (!preview.querySelector(`#${item}`)) {
    let newDiv = createEl('div', null, item);
    let image = document.createElement('img');
    image.src = Product.allProducts.find(product => product.name.replace(/\s+/g, '-').toLowerCase() === item).filePath;
    newDiv.appendChild(image);
    newDiv.appendChild(createEl('p', localQuantity));
    newDiv.class = 'preview-items';
    preview.appendChild(newDiv);
  } else {
    preview.querySelector(`#${item} p`).textContent = localQuantity;
  }
}

// Set up the "submit" event listener on the form.
// This is the trigger for the app. When a user "submits" the form, it will
// Call that handleSubmit method above and kick off the whole process
var catalogForm = document.getElementById('catalog');
catalogForm.addEventListener('submit', handleSubmit);

// Before anything else of value can happen, we need to fill in the select
// drop down list in the form.
populateForm();
