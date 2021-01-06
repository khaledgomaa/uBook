$("#signUpHeader").load("../html/navbar.html");
$("#signupFooter").load("../html/footer.html");

setTimeout(function () {
  $("#signUpHeader").show();
  $("#signupFooter").show();
  $("#signupContainer").css("display", "flex");
  $("#preLoader").hide();
}, 300);
/*validation*/
$(function () {
  $.validator.addMethod("passwordCheck", function (value) {
    return (
      /^[A-Za-z0-9=!\-@._*]*$/.test(value) &&
      /[a-z]/.test(value) &&
      /[0-9]/.test(value) &&
      /[A-Z]/.test(value)
    );
  });
  $(".signup-form").validate({
    rules: {
      username: {
        required: true,
      },
      email: {
        required: true,
      },
      password: {
        required: true,
        minlength: 8,
        passwordCheck: true,
      },
    },
    messages: {
      password: {
        passwordCheck: "Invalid password ",
      },
    },
    submitHandler: function (form) {
      if (register()) form.submit();
    },
  });
});
/******************************************************************************************************************************* */

let register = function () {
  let email, username, password;
  email = document.getElementById("email").value;
  username = document.getElementById("username").value;
  password = document.getElementById("password").value;

  let user = [
    {
      email: email,
      username: username,
      password: password,
    },
  ];

  let userObj = JSON.parse(localStorage.getItem(localStorageForAccounts));
  var _new = true;
  if (userObj) {
    for (var i = 0; i < userObj.length; i++) {
      if (userObj[i].email === email) {
        alert("This email is already exist");
        _new = false;
        return false;
      }
    }
    if (_new) {
      userObj = [...userObj, ...user];
      localStorage.setItem(localStorageForAccounts, JSON.stringify(userObj));
      cookie.setCookie("useremail", email);
      return true;
    }
  } else {
    localStorage.setItem(localStorageForAccounts, JSON.stringify(user));
    cookie.setCookie("useremail", email);
    return true;
  }
};
