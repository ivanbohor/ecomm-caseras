// numero de telefono 52+1+numero(10 digitos)
const cellPhoneNumber = "5491131155989";

fetch("catalogo.json")
  .then(function (response) {
    return response.json();
  })
  .then(function (datos) {
    appenddata(datos);
  })
  .catch(function (err) {
    console.log(err);
  });

function appenddata(datos) {
  const contenedor = document.getElementById("misProductos");

  for (let i = 0; i < datos.length; i++) {
    const productDiv = document.createElement("div");
    productDiv.className = "shop-item";
    productDiv.innerHTML = `
      <span class="shop-item-title" > ${datos[i].producto}</span >
        <img class="shop-item-image" src="${datos[i].imgUrl}">
          <div class="shop-item-details">
            <span class="shop-item-price">$${datos[i].precio}</span>
            <button class="btn btn-primary shop-item-button" type="button">AÑADIR</button>
          </div>`;
    contenedor.appendChild(productDiv);
  }

  var addToCartButtons = document.getElementsByClassName("shop-item-button");
  for (var i = 0; i < addToCartButtons.length; i++) {
    var button = addToCartButtons[i];
    button.addEventListener("click", addToCartClicked);
  }

  document
    .getElementsByClassName("btn-purchase")[0]
    .addEventListener("click", purchaseClicked);
}

function quantityChanged(event) {
  var input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  updateCartTotal();
}

function removeCartItem(event) {
  var buttonClicked = event.target;
  buttonClicked.parentElement.parentElement.remove();
  updateCartTotal();
}
function purchaseClicked() {
  let buyProducts = document.getElementsByClassName("cart-item-title");
  let buyPrices = document.getElementsByClassName("cart-precio");
  let buyQuantity = document.getElementsByClassName("cart-cantidad-input");

  let pedido = `Pedido :%0D%0A`;

  for (i = 0; i < buyProducts.length; i++) {
    pedido = `${pedido}[${buyProducts[i].innerText} - ${
      buyQuantity[i].value
    } * ${buyPrices[i + 1].innerText}]%0D%0A`;
  }

  pedido = `${pedido}*TOTAL ${
    document.getElementsByClassName("cart-total-precio")[0].innerText
  }*`;

  var cartItems = document.getElementsByClassName("cart-items")[0];
  while (cartItems.hasChildNodes()) {
    cartItems.removeChild(cartItems.firstChild);
  }
  updateCartTotal();
  window.open(`https://wa.me/5491131155989?text=${pedido}`, "_blank");
}
/*CAMBIO EN WINDOW OPEN DE https://wa.me/${cellPhoneNumber}?text=${pedido} A PONER DIRECTO EL NUMERO  */

function addToCartClicked(event) {
  var button = event.target;
  var shopItem = button.parentElement.parentElement;
  var title = shopItem.getElementsByClassName("shop-item-title")[0].innerText;
  var price = shopItem.getElementsByClassName("shop-item-price")[0].innerText;
  var imageSrc = shopItem.getElementsByClassName("shop-item-image")[0].src;
  addItemToCart(title, price, imageSrc);
  updateCartTotal();
}

function addItemToCart(title, price, imageSrc) {
  var productDiv = document.createElement("div");
  productDiv.classList.add("cart-row");
  var cartItems = document.getElementsByClassName("cart-items")[0];
  var cartItemNames = cartItems.getElementsByClassName("cart-item-title");
  for (var i = 0; i < cartItemNames.length; i++) {
    if (cartItemNames[i].innerText == title) {
      alert("Ya tienes este producto en el carrito");
      return;
    }
  }
  var productDivContents = `
      <div class="cart-item cart-column">
          <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
          <span class="cart-item-title">${title}</span>
      </div>
      <span class="cart-precio cart-column">${price}</span>
      <div class="cart-cantidad cart-column">
          <input class="cart-cantidad-input" type="number" value="1">
          <button class="btn btn-danger" type="button">x</button>
      </div>`;
  productDiv.innerHTML = productDivContents;
  cartItems.append(productDiv);
  productDiv
    .getElementsByClassName("btn-danger")[0]
    .addEventListener("click", removeCartItem);
  productDiv
    .getElementsByClassName("cart-cantidad-input")[0]
    .addEventListener("change", quantityChanged);
}

function updateCartTotal() {
  var cartItemContainer = document.getElementsByClassName("cart-items")[0];
  var productDivs = cartItemContainer.getElementsByClassName("cart-row");
  var total = 0;
  for (var i = 0; i < productDivs.length; i++) {
    var productDiv = productDivs[i];
    var priceElement = productDiv.getElementsByClassName("cart-precio")[0];
    var quantityElement = productDiv.getElementsByClassName(
      "cart-cantidad-input"
    )[0];
    var price = parseFloat(priceElement.innerText.replace("$", ""));
    var quantity = quantityElement.value;
    total = total + price * quantity;
  }
  total = Math.round(total * 100) / 100;
  document.getElementsByClassName("cart-total-precio")[0].innerText =
    "$" + total;
}

// NAV //
//agrego close //

const closeCart = document.querySelector(".close-car");

const cartContainer = document.querySelector(".cart-container");
const productList = document.querySelector(".product-list");
const cartList = document.querySelector(".cart-list");
const cartTotalValue = document.getElementById("cart-total-value");
const cartCountInfo = document.getElementById("cart-count-info");
let cartItemID = 1;

eventListeners();

// all event listeners
function eventListeners() {
  window.addEventListener("DOMContentLoaded", () => {
    loadJSON();
    loadCart();
  });
  // toggle navbar when toggle button is clicked
  document.querySelector(".navbar-toggler").addEventListener("click", () => {
    document.querySelector(".navbar-collapse").classList.toggle("show-navbar");
  });

  // show/hide cart container
  document.getElementById("cart-btn").addEventListener("click", () => {
    cartContainer.classList.toggle("show-cart-container");
  });

  //agrego option  close button //
  document.getElementById("close-car").addEventListener("click", () => {
    cartContainer.classList.toggle("show-cart-container");
  });

  // add to cart
  productList.addEventListener("click", purchaseProduct);

  // delete from cart
  cartList.addEventListener("click", deleteProduct);
}
