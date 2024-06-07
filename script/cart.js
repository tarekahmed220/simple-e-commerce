var productList = JSON.parse(localStorage.getItem("products")) || [];
function updateCartItems() {
  var cartCount = document.querySelector("#cart-count");

  cartCount.textContent = `${productList.length}`;
}
updateCartItems();

function displaySelectedProduct() {
  var cartItems = document.querySelector(".cart-items");
  var productContaier = ``;

  for (var i = 0; i < productList.length; i++) {
    productContaier += `
    <div class="cart-item">
        <div class="cart-item-image">
          <img src=${productList[i].image} alt="" />
        </div>
        <div class="cart-item-info">
          <h3>${productList[i].title}</h3>
          <p class="cart-item-price">$${productList[i].price}</p>
          <p class="cart-item-quantity">Quantity: <span>1</span></p>
        </div>
        <div class="cart-item-quantity-buttons">
          <button class="Increase" onclick="increaseQut(this)">Increase</button>
          <button class="decrease" onclick="decreaseQut(this)">Decrease</button>
        </div>
        <div class="cart-item-remove">
          <button onclick="removeProduct(this ,${productList[i].id})">Remove</button>
        </div>
        </div>
    `;
  }
  cartItems.innerHTML = productContaier;
}
displaySelectedProduct();

// var increase = document.querySelector(".Increase");
var price = document.querySelector(".cart-item-price");
var priceValue = parseFloat(price.textContent.substring(1));

var quantity = document.querySelector(".cart-item-quantity span");
var quantityValue = parseFloat(quantity.textContent);

function increaseQut(ele) {
  var spanQnt = ele
    .closest(".cart-item")
    .querySelector(".cart-item-quantity span");
  var quantityValue = parseFloat(spanQnt.textContent);
  var newQuantity = ++quantityValue;
  spanQnt.textContent = `${newQuantity}`;
  calcTotalPrice();
}

function decreaseQut(ele) {
  var spanQnt = ele
    .closest(".cart-item")
    .querySelector(".cart-item-quantity span");
  var quantityValue = parseFloat(spanQnt.textContent);
  if (quantityValue > 1) {
    var newQuantity = --quantityValue;

    spanQnt.textContent = `${newQuantity}`;
  }
  calcTotalPrice();
}

function removeProduct(ele, index) {
  var removeTargetFromPage = ele.closest(".cart-item");
  removeTargetFromPage.remove();

  var productList = JSON.parse(localStorage.getItem("products")) || [];

  var newList = productList.filter((product) => {
    return product.id !== index;
  });
  localStorage.setItem("products", JSON.stringify(newList));
  calcTotalPrice();
}

function calcTotalPrice() {
  var totalPrice = 0;

  var cartItems = document.querySelectorAll(".cart-item");
  for (var i = 0; i < cartItems.length; i++) {
    var price = parseFloat(
      cartItems[i].querySelector(".cart-item-price").textContent.substring(1)
    );
    var quantity = parseFloat(
      cartItems[i].querySelector(".cart-item-quantity span").textContent
    );

    totalPrice += price * quantity;
  }
  document.querySelector("#totalPrice").textContent = `$${Math.round(
    totalPrice
  )}`;
  return totalPrice;
}
calcTotalPrice();
