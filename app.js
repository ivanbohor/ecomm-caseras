// numero de telefono 52+1+numero(10 digitos)
const cellPhoneNumber = "5491123920404";

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
  /*   filtrado por categoria
   */ const catePize = datos.filter((c) => c.category == "pize");
  const cateEmp = datos.filter((c) => c.category == "empa");
  const cateCope = datos.filter((c) => c.category == "cope");
  const cateSand = datos.filter((c) => c.category == "sand");
  /* pintado en div segun correspoda */
  const contenedorPize = document.getElementById("pizeList");
  const contenedorEmpa = document.getElementById("empaList");
  const contenedorCope = document.getElementById("copeList");
  const contenedorSand = document.getElementById("sandList");
  /* for para cada cate y contenedor*/
  for (let i = 0; i < catePize.length; i++) {
    const productDiv = document.createElement("div");
    productDiv.className = "shop-item";
    productDiv.innerHTML = `
      <span class="shop-item-title" > ${catePize[i].producto}</span >
        <img class="shop-item-image" src="${catePize[i].imgUrl}">
          <div class="shop-item-details">
            <span class="shop-item-price">$${catePize[i].precio}</span>
            <button value="+1" onClick="contadorCar();" class="btn btn-primary shop-item-button" aria-label="agregar pedir" type="button">AÑADIR</button>
          </div>`;
    contenedorPize.appendChild(productDiv);
  }

  for (let i = 0; i < cateEmp.length; i++) {
    const productDiv = document.createElement("div");
    productDiv.className = "shop-item";
    productDiv.innerHTML = `
      <span class="shop-item-title" > ${cateEmp[i].producto}</span >
        <img class="shop-item-image" src="${cateEmp[i].imgUrl}">
          <div class="shop-item-details">
            <span class="shop-item-price">$${cateEmp[i].precio}</span>
            <button value="+1" onClick="contadorCar();" class="btn btn-primary shop-item-button" aria-label="agregar pedir" type="button">AÑADIR</button>
          </div>`;
    contenedorEmpa.appendChild(productDiv);
  }

  for (let i = 0; i < cateCope.length; i++) {
    const productDiv = document.createElement("div");
    productDiv.className = "shop-item";
    productDiv.innerHTML = `
      <span class="shop-item-title" > ${cateCope[i].producto}</span >
        <img class="shop-item-image" src="${cateCope[i].imgUrl}">
          <div class="shop-item-details">
            <span class="shop-item-price">$${cateCope[i].precio}</span>
            <button value="+1" onClick="contadorCar();" class="btn btn-primary shop-item-button" aria-label="agregar pedir" type="button">AÑADIR</button>
          </div>`;
    contenedorCope.appendChild(productDiv);
  }

  for (let i = 0; i < cateSand.length; i++) {
    const productDiv = document.createElement("div");
    productDiv.className = "shop-item";
    productDiv.innerHTML = `
      <span class="shop-item-title" > ${cateSand[i].producto}</span >
        <img class="shop-item-image" src="${cateSand[i].imgUrl}">
          <div class="shop-item-details">
            <span class="shop-item-price">$${cateSand[i].precio}</span>
            <button value="+1" onClick="contadorCar();" class="btn btn-primary shop-item-button" aria-label="agregar pedir" type="button">AÑADIR</button>
          </div>`;
    contenedorSand.appendChild(productDiv);
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
  /* agregos  checks */
  let losChecks = document.getElementById("checkEntrega");
  /* agrego dire y altu (TENDRIA QUE UNIFICARLOS) */
  let direData = document.getElementById("dirr");
  let altuData = document.getElementById("altu");

  let pedido = `Pedido :%0D%0A`;

  for (i = 0; i < buyProducts.length; i++) {
    pedido = `${pedido}[${buyProducts[i].innerText} - ${
      buyQuantity[i].value
    } * ${buyPrices[i + 1].innerText}]%0D%0A`;
  }

  pedido = `${pedido}  *TOTAL ${
    document.getElementsByClassName("cart-total-precio")[0].innerText
  } + ${losChecks.innerText} + ${direData.innerText} + ${altuData.innerText}
   *`; /* agrego text de Checks y ahora ACTUALIZO agrego direData y altuData */

  var cartItems = document.getElementsByClassName("cart-items")[0];
  while (cartItems.hasChildNodes()) {
    cartItems.removeChild(cartItems.firstChild);
  }
  updateCartTotal();
  window.open(`https://wa.me/5491123920404?text=${pedido}`, "_blank");
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
/* contador carrito */
var contador = 0;
function contadorCar() {
  contador++;
  document.getElementById("cart-count-info").innerHTML = contador;
}
function desconCar() {
  contador--;
  document.getElementById("cart-count-info").innerHTML = contador;
}

/* pinto los items en el carrito que (clickeo) addtocartClicked agrega */
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
          <button id="elim" class="btn btn-danger" aria-label="eliminar" type="button" onClick="desconCar();" >x</button>
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
const cartContainer = document.querySelector(".cart-container");

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

function getValue() {
  var checkboxes = document.querySelectorAll(".radio-custom");
  var result = "";
  for (var i = 0; i < checkboxes.length; i++) {
    if (checkboxes[i].checked) {
      result += checkboxes[i].value;
    }
  }
  document.getElementById("checkEntrega").innerText = result;
}
const radioRetiro = document.getElementById("radio-1");
const radioEnvio = document.getElementById("radio-2");
const input = document.getElementById("input");
const divInfo = document.getElementById("info");
const parrafoDomicilio = document.getElementById("dirr");
const cajaInfo = document.getElementById("dire");

const parrafoAltu = document.getElementById("altu");
const inputA = document.getElementById("inputAl");

const showAddressInformation = (e) => {
  if (e.target === radioEnvio && e.target.checked) {
    cajaInfo.style.display = "block";
    divInfo.classList.add("show");

    parrafoDomicilio.innerText = input.value;

    parrafoAltu.innerText = inputA.value;

    input.disabled = false;
  } else {
    parrafoDomicilio.innerText = "";
    parrafoAltu.innerText = "";
    cajaInfo.style.display = "none";

    divInfo.classList.remove("show");
    parrafoDomicilio.classList.remove("show");

    input.disabled = true;
  }
};

const addAddressToParagraph = (e) => {
  parrafoDomicilio.innerText = e.target.value;
};

const addAddressToParagraphAl = (e) => {
  parrafoAltu.innerText = e.target.value;
};

radioEnvio.addEventListener("change", showAddressInformation);
radioRetiro.addEventListener("change", showAddressInformation);
input.addEventListener("input", addAddressToParagraph);
inputA.addEventListener("input", addAddressToParagraphAl);
