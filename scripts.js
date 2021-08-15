let signin_button = document.querySelector(".login-button");
let signup_button = document.querySelector("#signUp");
let login = document.querySelector(".login-container");
let register = document.querySelector(".register-container");
let container = document.querySelector("#form-box");
let signUpForm = document.querySelectorAll("form")[1];

function signIn(username, password) {
  console.log(username);
  console.log(password);
  fetch("https://guarded-lake-78300.herokuapp.com/auth", {
    method: "POST",
    body: JSON.stringify({
      username: `${username}`,
      password: `${password}`,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      if (data["access_token"]) {
        console.log(data);
        storage = window.localStorage;
        storage.setItem("jwt-token", data["access_token"]);
        storage.setItem("username", username);
        storage.setItem("password", password);
        window.location.href = "/home-page.html";
      }
    });
}

function signUp(name, surname, email, username, password) {
  console.log(name);
  console.log(surname);
  console.log(email);
  console.log(username);
  console.log(password);
  fetch("https://guarded-lake-78300.herokuapp.com/registration/", {
    method: "POST",
    body: JSON.stringify({
      name: `${name}`,
      surname: `${surname}`,
      email: `${email}`,
      username: `${username}`,
      password: `${password}`,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    });
}

function switch_side(e) {
  login.classList.toggle("active");
  register.classList.toggle("active");
  console.log(register.classList);
  if (register.classList.contains("active")) {
    container.style.transform = "translateX(95%)";
  } else {
    container.style.transform = "translateX(0%)";
  }
}

function userInfo(username) {
  fetch(`https://guarded-lake-78300.herokuapp.com/view-profile/'${username}'`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: window.localStorage["jwt-token"],
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      window.localStorage.setItem("user-id", data.user[0]);
      window.localStorage.setItem("username", data.user[1])
    });
}
userInfo(window.localStorage.getItem("username"));
console.log(window.localStorage["username"]);
userInfo(window.localStorage.getItem("user-id"));
console.log(window.localStorage["user-id"]);

function productInfo() {
  fetch(`https://guarded-lake-78300.herokuapp.com/show-products/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: window.localStorage["jwt-token"],
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      window.localStorage.setItem("product-id", data.user[0]);
    });
}
productInfo(window.localStorage.getItem("product-id"));
console.log(window.localStorage["product-id"]);


function showProducts() {
  console.log(window.localStorage["jwt-token"]);
  fetch("https://guarded-lake-78300.herokuapp.com/show-products/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: window.localStorage["jwt-token"],
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      products = data.data;
      console.log(products);
      products.forEach((product) => {
        console.log(product);
        document.querySelector(
          ".product-container"
        ).innerHTML += `<div class="product">
                          <div class="product-image"><img src="${product[2]}" alt="${product[1]}" /></div>
                          <h3 class="product-name">${product[1]}</h3>
                          <p class="product-id">Product Id: ${product[0]}</p>
                          <p class="category">${product[3]}</p>
                          <p class="description">${product[4]}</p>
                          <p class="dimensions">${product[5]}</p>
                          <p class="price">${product[6]}</p>
                          <div class="product-buttons">
                            <button class="cart"><i class="fas fa-shopping-cart fa-2x"></i></button>
                          </div>
                        </div>`;
      });
    });
}

showProducts();

function viewFile() {
  const preview = document.querySelector(".hide");
  const file = document.querySelector(".product_image").files[0];
  const reader = new FileReader();

  reader.addEventListener(
    "load",
    function () {
      preview.src = reader.result;
    },
    false
  );
  if (file) {
    reader.readAsDataURL(file);
  }
}

// showProducts();

function viewCart() {
  console.log(window.localStorage["jwt-token"]);
  fetch(
    `https://guarded-lake-78300.herokuapp.com/view-cart/${window.localStorage["username"]}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: window.localStorage["jwt-token"],
      },
    }
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      carts = data.data;
      console.log(carts);
      carts.forEach((cart) => {
        console.log(cart);
        document.querySelector(
          ".cart-container"
        ).innerHTML += `<div class="cart">
                          <div class="product-image"><img src="${cart[1]}" alt="${cart[0]}" /></div>
                          <h3 class="product-name">${cart[0]}</h3>
                          <p class="product-id">Product Id: ${cart[0]}</p>
                          <p class="quantity">${cart[2]}</p>
                          <div class="quantity-buttons">
                          <button class="add">+</button>
                          <button class="minus">-</button>
                        </div>
                          <p class="price">${cart[3]}</p>
                          <div class="cart-buttons">
                            <button class="checkout">Checkout</button>
                            <button class="back">View Products</button>
                          </div>
                        </div>`;
      });
    });
}

viewCart();
