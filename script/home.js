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
        // const serchBtn = document.querySelector("#serchBtn");
        // serchBtn.addEventListener("click", function () {
        //   searchedProducts(data);
        // });
      }
      const searchInput = document.querySelector("#search-input");
      searchInput.addEventListener("input", function () {
        searchedProducts(data);
      });
    });
  }
  getProducts();

  function searchedProducts(reqData) {
    const searchInput = document.querySelector("#search-input");

    const searchQuery = searchInput.value.toLowerCase();
    const filteredProduct = reqData.filter((product) => {
      return product.title.toLowerCase().includes(searchQuery);
    });
    displayProducts(filteredProduct);
  }

  function displayProducts(reqData) {
    var productContainer = ``;
    for (var i = 0; i < reqData.length; i++) {
      productContainer += `
    <div class="productBox" >
      <div class="imgContainer" onclick="showDetails(${reqData[i].id})">
        <img src="${reqData[i].image}" alt="${reqData[i].title}" />
      </div>
      <div class="text">
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

function checkUserLogin() {
  var isLogin = JSON.parse(localStorage.getItem("isLogin"));

  var activeUser = JSON.parse(localStorage.getItem("activeUser"));
  if (activeUser) {
    var userName = activeUser.username;
  }

  if (isLogin) {
    document.querySelector(".cart").style.display = "block";
    document.querySelector(".user").style.display = "block";
    document.querySelector(".logout").style.display = "block";
    document.querySelector(
      ".welcome .user"
    ).textContent = `Welcome, ${userName}`;
    document.querySelector(".activeUser").style.display = "none";
  } else {
    document.querySelector(".cart").style.display = "none";
    document.querySelector(".user").style.display = "none";
    document.querySelector(".logout").style.display = "none";
    document.querySelector(".activeUser").style.display = "block";
  }
}
checkUserLogin();
var logOut = document.querySelector(".logout a");
logOut.addEventListener("click", function () {
  localStorage.removeItem("isLogin");
  localStorage.removeItem("activeUser");
  window.location = "/login.html";
});
