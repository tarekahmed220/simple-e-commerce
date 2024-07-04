var email = document.getElementById("email");
var password = document.getElementById("password");
var validContainer = document.querySelector(".validContainer");
var validationmsg = document.querySelector(".validationmsg");
var loginBtn = document.getElementById("btn");
var admin = "admin@iti.com";
var adminPassword = "admin@123";

loginBtn.addEventListener("click", function (e) {
  e.preventDefault();
  if (
    email.value.trim() === "admin@iti.com" &&
    password.value.trim() === "admin@123"
  ) {
    window.location = "./dashbord.html";
    return;
  }
  var fullUsersData = JSON.parse(localStorage.getItem("fullUsersData")) || [];
  var validUser = false;

  if (email.value === "") {
    validContainer.style.display = "flex";
    validationmsg.innerHTML = " Please enter your email address ";
    email.style.border = "2px solid red";
  } else if (password.value === "") {
    validContainer.style.display = "flex";
    validationmsg.innerHTML = " Please enter your password";
    email.style.border = "2px solid #eac500 ";
    password.style.border = "2px solid red";
  } else {
    fullUsersData.map((user, index) => {
      if (
        user.email === email.value.trim() &&
        user.password === password.value.trim()
      ) {
        validUser = true;
        password.style.border = "2px solid #eac500 ";
        email.style.border = "2px solid #eac500 ";
        validContainer.style.display = "none";

        let userNameFromUsers = fullUsersData.map((user) => {
          if (user.email === email.value) {
            return user.firstName;
          }
        });
        let activeUser = {
          email: email.value,
          username: userNameFromUsers.join(""),
        };
        localStorage.setItem("activeUser", JSON.stringify(activeUser));
        localStorage.setItem("isLogin", true);

        window.location = "home.html";
      }
    });
    if (!validUser) {
      validContainer.style.display = "flex";
      email.style.border = "2px solid red";
      password.style.border = "2px solid red";

      validationmsg.innerHTML = "Your Email or Password is not correct!";
    }
  }
});
