function viewProfile() {
  console.log(window.localStorage["jwt-token"]);
  console.log(window.localStorage["username"]);
  fetch(
    `https://guarded-lake-78300.herokuapp.com/view-profile/${window.localStorage.getItem(
      "username"
    )}/`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, DELETE, PUT",
        "Access-Control-Allow-Headers":
          "append,delete,entries,foreach,get,has,keys,set,values,Authorization",
        Connection: "Keep-Alive",
        Authorization: `jwt ${window.localStorage["jwt-token"]}`,
      },
    }
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      users = data.data;
      console.log(users);
      users.forEach((user) => {
        console.log(user);
        document.querySelector(
          ".profile-container"
        ).innerHTML += `<div class="profile">
                            <h3 class="fullname">${user[1]} ${user[2]}</h3>
                            <p class="user-id">${user[0]}</p>
                            <p class="user-email">${user[3]}</p>
                            <p class="profile-username">${user[4]}</p>
                            <p class="profile-password">${user[5]}</p>
                            <div class="profile-buttons">
                              <button class="edit">Edit Profile</button>
                              <button class="delete">Delete Profile</button>
                            </div>
                          </div>`;
      });
    });
}

viewProfile();

function edit (e) {
  edit_profile.classList.toggle("active");
  console.log(edit_profile.classList);
  if (edit_profile.classList.contains("active")) {
    form.style.display = "flex";
  } else {
    form.style.display = "none";
  }
}

function saveEditedProfile(user_id) {
  fetch(
    `https://guarded-lake-78300.herokuapp.com/view-profile/${window.localStorage["user-id"]}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `jwt ${window.localStorage["jwt-token"]}`,
      },
    }
  )
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
  });
}

function deleteProfile(user_id) {
  fetch(
    `https://guarded-lake-78300.herokuapp.com/delete-profile/${window.localStorage["user-id"]}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `jwt ${window.localStorage["jwt-token"]}`,
      },
    }
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      window.location.href = "/index.html";
    });
}

function deleteProduct(product_id) {
  fetch(`https://guarded-lake-78300.herokuapp.com/delete-product/${product_id}`, {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      Authorization: `jwt ${window.localStorage["jwt-token"]}`,
    },
  })
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
  });
}

function editProduct(product_id) {
  fetch(`https://guarded-lake-78300.herokuapp.com/edit-product/${product_id}`, {
    method: "PUT", 
    body: JSON.stringify ({
      product_id: `${product_id}`,
    }),
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      Authorization: `jwt ${window.localStorage["jwt-token"]}`,
    },
  })
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
  });
}

function viewUsersProducts(username) {
  fetch(`https://guarded-lake-78300.herokuapp.com/view-users-products/${window.localStorage["username"]}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `jwt ${window.localStorage["jwt-token"]}`,
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
                        <div class="profile-buttons">
                          <button class="editProduct" onclick=${editProduct(product_id)}>Edit Product</button>
                          <button class="delteProduct" onclick=${deleteProduct(product_id)}>Delete Product</button>
                        </div>
                      </div>`;
    });
  });
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
  console.log(
    product_name,
    product_image,
    category,
    description,
    dimensions,
    price,
    id
  );
  console.log(window.localStorage["jwt-token"]);
  fetch("https://guarded-lake-78300.herokuapp.com/add-product/", {
    method: "POST",
    body: JSON.stringify({
      product_name: `${product_name}`,
      product_image: `${product_image}`,
      category: `${category}`,
      description: `${description}`,
      dimensions: `${dimensions}`,
      price: `${price}`,
      id: `${id}`,
    }),
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      Authorization: `jwt ${window.localStorage["jwt-token"]}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    });
}
