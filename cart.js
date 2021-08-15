function showProducts() {
    console.log(window.localStorage["jwt-token"]);
    fetch(`https://guarded-lake-78300.herokuapp.com/view-cart/${username}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: window.localStorage["jwt-token"],
      },
    })
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
                            <div class="cart-image"><img src="${cart[1]}" alt="${product[0]}" /></div>
                            <h3 class="cart-name">${cart[0]}</h3>
                            <div class="cart-buttons">
                              <button class="add">Add</button>
                              <button class="remove">Remove</button>
                            </div>
                            <p class="quantity">${cart[2]}</p>
                            <p class="cart-price">${cart[3]}</p>
                            <button class="checkout">Checkout</button>
                          </div>`;
        });
      });
  }

  
