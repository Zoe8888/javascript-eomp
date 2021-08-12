function viewProfile() {
  console.log(window.localStorage["jwt-token"]);
  console.log(window.localStorage["user-id"]);
  fetch(
    `https://guarded-lake-78300.herokuapp.com/view-profile/${window.localStorage["user-id"]}`,
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

function deleteProfile() {
  fetch(`https://guarded-lake-78300.herokuapp.com/delete-profile`);
}
