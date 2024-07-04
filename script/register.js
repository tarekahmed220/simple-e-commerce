document.addEventListener("DOMContentLoaded", function () {
  var firstName = document.getElementById("firstName");
  var lastName = document.getElementById("lastName");
  var age = document.getElementById("age");
  var password = document.getElementById("password");
  var repassword = document.getElementById("repeatPassword");
  var email = document.getElementById("email");
  var registerbtn = document.getElementById("btn");
  var validContainer = document.querySelector(".validContainer");
  var validationmsg = document.querySelector(".validationmsg");

  firstName.addEventListener("keydown", function (event) {
    var key = event.key;
    if (key.match(/[0-9]/) || key == "Tab" || key == "Enter") {
      event.preventDefault();
    }
  });
  lastName.addEventListener("keydown", function (event) {
    var key = event.key;
    if (key.match(/[0-9]/) || key == "Tab" || key == "Enter") {
      event.preventDefault();
    }
  });
  age.addEventListener("keydown", function (event) {
    var key = event.key;
    if (key.match(/[a-zA-Z]/) || key == "Enter") {
      event.preventDefault();
    }
  });

  registerbtn.addEventListener("click", function (e) {
    e.preventDefault();
    // firstName Validation Message
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,7}$/;

    if (firstName.value == "") {
      validContainer.style.display = "flex";
      validationmsg.textContent = "Please enter Your First Name";
      firstName.style.border = "2px solid red";
    } else if (firstName.validity.valid) {
      validContainer.style.display = "none";
      firstName.style.border = "#eac500 2px solid";

      // lastName Validation Message
      if (lastName.value == "") {
        validContainer.style.display = "flex";
        validationmsg.textContent = "Please enter Your Last Name";
        lastName.style.border = "2px solid red";
      } else if (lastName.validity.valid) {
        validContainer.style.display = "none";
        lastName.style.border = "#eac500 2px solid";
        //TODO:Age validation
        if (age.value == "") {
          validContainer.style.display = "flex";
          validationmsg.textContent = "Please enter Your Age";
          age.style.border = "2px solid red";
        } else if (age.value > 90 || age.value < 10) {
          validContainer.style.display = "flex";
          validationmsg.textContent = "Your Age must be between 10 and 90";
          age.style.border = "2px solid red";
        } else {
          validContainer.style.display = "none";
          age.style.border = "#eac500 2px solid";
          //TODO:Password validation
          if (password.value == "") {
            validContainer.style.display = "flex";
            validationmsg.textContent = "Please enter Your Password";
            password.style.border = "2px solid red";
          } else if (!password.validity.valid) {
            // tarekahmed@
            validContainer.style.display = "flex";
            validationmsg.textContent =
              "Your Password must contain atleast 8 letters and numbers and atleast 1 special character like (@#$%^&*)";
            password.style.border = "2px solid red";
          } else {
            validContainer.style.display = "none";
            password.style.border = "#eac500 2px solid";
            //TODO:repassword validation
            if (repassword.value == "") {
              validContainer.style.display = "flex";
              validationmsg.textContent = "Please repeated Password";
              repassword.style.border = "2px solid red";
            } else if (repassword.value !== password.value) {
              console.log("does not match");
              validContainer.style.display = "flex";
              validationmsg.textContent =
                "Your Password doesn't match repeated password!";
            } else {
              validContainer.style.display = "none";
              repassword.style.border = "#eac500 2px solid";
              //TODO:email validation
              if (email.value == "") {
                validContainer.style.display = "flex";
                validationmsg.textContent = "Please enter Your Email";
                email.style.border = "2px solid red";
              } else if (!email.value.includes("@")) {
                console.log("mail not valid");
                validContainer.style.display = "flex";
                validationmsg.textContent =
                  "Please enter valid Email, your Email must contains (@)";
                email.style.border = "2px solid red";
              } else if (!regex.test(email.value)) {
                console.log("mail not valid");
                validContainer.style.display = "flex";
                validationmsg.textContent = "Your email is not a valid email!";
                email.style.border = "2px solid red";
              } else {
                validContainer.style.display = "none";
                email.style.border = "#eac500 2px solid";
                const fullUsersData =
                  JSON.parse(localStorage.getItem("fullUsersData")) || [];
                let user = {
                  id: Date.now(),
                  joinedDate: new Date().toISOString().split("T")[0],
                  firstName: firstName.value,
                  lastName: lastName.value,
                  age: age.value,
                  password: password.value,
                  repassword: repassword.value,
                  email: email.value,
                };
                fullUsersData.push(user);
                localStorage.setItem(
                  "fullUsersData",
                  JSON.stringify(fullUsersData)
                );
                window.location.href = "login.html";
              }
            }
          }
        }
      } else {
        validContainer.style.display = "flex";
        validationmsg.textContent =
          "Please enter valid Last Name min 3 and max 8 characters";
        lastName.style.border = "2px solid red";
      }
    } else {
      validContainer.style.display = "flex";
      validationmsg.textContent =
        "Please enter valid First Name min 3 and max 8 characters";
      firstName.style.border = "2px solid red";
    }
  });
});
