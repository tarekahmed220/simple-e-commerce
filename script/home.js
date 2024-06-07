document.addEventListener("DOMContentLoaded", function () {
  var products = document.querySelector(".products");

  var data;
  function getProducts() {
    var req = new XMLHttpRequest();
    req.open("GET", "https://fakestoreapi.com/products");
    req.send();

    req.addEventListener("readystatechange", function () {
      if (req.readyState === 4 && req.status == 200) {
        data = JSON.parse(req.responseText);

        displayProducts(data);
      }
    });
  }
  getProducts();

  function displayProducts(reqData) {
    var productContainer = ``;
    for (var i = 0; i < reqData.length; i++) {
      productContainer += `
    <div class="productBox" >
      <div class="imgContainer" onclick="showDetails(${reqData[i].id})">
        <img src="${reqData[i].image}" alt="${reqData[i].title}" />
      </div>
      <div class="text" onclick="showDetails(${reqData[i].id})">
        <h3>${reqData[i].title}</h3>
        <p>category: ${reqData[i].category}</p>
        <div class="price">$${reqData[i].price}</div>
      </div>
      <button class="add-to-cart" data-id=${reqData[i].id}>Add to Cart</button>
    </div>`;
    }
    products.innerHTML = productContainer;
  }

  products.addEventListener("click", function (event) {
    if (event.target && event.target.classList.contains("add-to-cart")) {
      var buttonId = event.target.getAttribute("data-id");

      // get the product form the list
      var productList = JSON.parse(localStorage.getItem("products")) || [];
      var product = data.find((product) => buttonId == product.id);

      var productExists = productList.find((item) => product.id == item.id);

      if (!productExists) {
        productList.push(product);
        localStorage.setItem("products", JSON.stringify(productList));
        updateCartItems();
      }
    }
  });
});

function updateCartItems() {
  var productList = JSON.parse(localStorage.getItem("products")) || [];
  var cartCount = document.querySelector("#cart-count");

  cartCount.textContent = `${productList.length}`;
}
updateCartItems();

function showDetails(id) {
  var Newreq = new XMLHttpRequest();
  Newreq.open("GET", `https://fakestoreapi.com/products/${id}`);
  Newreq.send();

  Newreq.addEventListener("readystatechange", function () {
    if (Newreq.readyState === 4 && Newreq.status == 200) {
      var productData = JSON.parse(Newreq.response);
      console.log(productData);
      window.open("productDetails.html", "_self");
      localStorage.setItem("productDetails", JSON.stringify(productData));
    }
  });
}
