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
        window.location.href = "/home.html";
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

function addProduct(
  product_name,
  product_image,
  category,
  description,
  dimensions,
  price,
  id
) {
  console.log(product_name);
  console.log(product_image);
  console.log(category);
  console.log(description);
  console.log(dimensions);
  console.log(id);
  fetch("https://guarded-lake-78300.herokuapp.com/add-product/", {
    method: "POST",
    body: JSON.stringify({
      product_name: `${product_name}`,
      product_image: `${product_image}`,
      category: `${category}`,
      description: `${description}`,
      dimensions: `${dimensions}`,
      id: `${id}`,
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
        storage.setItem("product_name", product_name);
        storage.setItem("product_image", product_image);
        storage.setItem("category", category);
        storage.setItem("description", description);
        storage.setItem("dimensions", dimensions);
        storage.setItem("id", id);
        window.location.href = "/add-product.html";
      }
    });
}
