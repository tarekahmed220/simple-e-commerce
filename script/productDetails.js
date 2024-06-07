var targetProduct = JSON.parse(localStorage.getItem("productDetails"));

var productContainer = document.querySelector(".product-container");
console.log(targetProduct);
productContainer.innerHTML = `<div class="product-image">
          <img
            src=${targetProduct.image}
            alt="Product Image"
            id=${targetProduct.id}
          />
        </div>
        <div class="product-info">
          <h2 id="product-title">${targetProduct.title}</h2>
          <p class="product-category" id="product-category">
            Category: ${targetProduct.category}
          </p>
          <p class="product-price" id="product-price">$${targetProduct.price}</p>
          <p class="product-description" id="product-description">
          ${targetProduct.description}
          </p>
          <button class="add-to-cart" onclick="backToShopping()"> <i class="fa-solid fa-arrow-left-long"></i> Back To Shopping</button>
        </div>`;

function backToShopping() {
  window.location.href = "home.html";
}
