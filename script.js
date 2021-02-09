// jshint esversion:6

const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");

// Success and Failure functions
function showSuccess(input) {
  input.className = "success";
  let parent = input.parentElement;
  let small = parent.querySelector("small");
  small.className = "";
}

function showFailure(input, message) {
  input.className = "failure";
  let parent = input.parentElement;
  let small = parent.querySelector("small");
  small.className = "failure";
  small.innerHTML = message;
}

// input requirement
function inputRequirement(input) {
  let isRequired = false;
    if (input.value.trim() === "") {
      if(input === password2) {
        showFailure(input, "This field is required");
      } else {
        showFailure(input, input.id.charAt(0).toUpperCase() + input.id.slice(1) + " is required");
      }
    } else {
      showSuccess(input);
      isRequired = true;
    }
  return isRequired;
}

// Email Validation
function emailVerification(input) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if(re.test(input.value.toLowerCase())) {
    showSuccess(input);
  } else {
    showFailure(input, "Email is invalid");
  }
}

// Input length
function inputLength(input, min , max) {
  let isRequired = false;
  if(input.value.length > max){
    showFailure(input, input.id.charAt(0).toUpperCase() + input.id.slice(1) + " must be less than " + max + " characters");
  }
  else if(input.value.length < min) {
    showFailure(input, input.id.charAt(0).toUpperCase() + input.id.slice(1) + " must be at least " + min + " characters");
  } else {
    showSuccess(input);
    isRequired = true;
  }
  return isRequired;
}

// Passowrd numbers verification
function numPass(input) {
  let isRequired = false;
  const numRegex = new RegExp ("^(?=.*[0-9])");
  if(numRegex.test(input.value)) {
    showSuccess(input);
    isRequired = true;
  } else {
    showFailure(input, "Password must have at least 1 number");
  }
  return isRequired;
}

// Password uppercase verification
function uppercasePass(input) {
  let isRequired = false;
  const upRegex = new RegExp ("^(?=.*[A-Z])");
  if(upRegex.test(input.value)) {
    showSuccess(input);
    isRequired = true;
  } else {
    showFailure(input, "Password must have at least 1 uppercase character");
  }
  return isRequired;
}

// Password lowercase verification
function lowercasePass(input) {
  let isRequired = false;
  const lowRegex = new RegExp ("^(?=.*[a-z])");
  if(lowRegex.test(input.value)) {
    showSuccess(input);
    isRequired = true;
  } else {
    showFailure(input, "Password must have at least 1 lowercase character");
  }
  return isRequired;
}

// Password special characters verification
function specialCharsPass(input) {
  let isRequired = false;
  const specRegex = new RegExp ("^(?=.*[-_!@#\$%\^&\*])");
  if(specRegex.test(input.value)) {
    showSuccess(input);
    isRequired = true;
  } else {
    showFailure(input, "Password must have at least 1 special character (-_!@#$%^&*)");
  }
  return isRequired;
}

// Passwords match
function matchPass(pass1, pass2) {
  if(pass1.value === pass2.value) {
    showSuccess(pass2);
  } else {
    showFailure(pass2, "Passwords do not match");
  }
}

// verifications chain
function userValidation() {
  if(inputRequirement(username)) {
    inputLength(username, 5, 15);
  }
}

function emailValidation() {
  if(inputRequirement(email)) {
    emailVerification(email);
  }
}

function passwordValidation() {
  if(inputRequirement(password)) {
    if(inputLength(password, 8, 35)) {
      if(lowercasePass(password)) {
        if(uppercasePass(password)) {
          if(numPass(password)) {
            specialCharsPass(password);
          }
        }
      }
    }
  }
}

function password2Validation() {
  if(inputRequirement(password2)) {
    matchPass(password, password2);
  }
}

// Event Listener submit
form.addEventListener("submit", function(e) {
  userValidation();
  emailValidation();
  passwordValidation();
  password2Validation();

  if(username.classList.contains("failure") || email.classList.contains("failure") || password.classList.contains("failure") || password2.classList.contains("failure")) {
    e.preventDefault();
  }
});
