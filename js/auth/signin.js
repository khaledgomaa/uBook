$("#signinHeader").load("../html/navbar.html");
$("#signinFooter").load("../html/footer.html");

$(function () {
  $(".login-form").validate({
    rules: {
      email: {
        required: true,
        email: true,
      },
      password: {
        required: true,
      },
    },
    submitHandler: function (form) {
      if (login()) form.submit();
    },
  });
});
setTimeout(function () {
  $("#signinHeader").show();
  $("#signinFooter").show();
  $("#loginContainer").css("display", "flex");
  $("#preLoader").hide();
}, 300);

let login = function () {
  let email, password, remember_me;
  email = document.getElementById("email").value;
  password = document.getElementById("password").value;
  remember_me = document.getElementById("remember_me").checked;

  let userObj = JSON.parse(localStorage.getItem(localStorageForAccounts));

  if (userObj) {
    for (var i = 0; i < userObj.length; i++) {
      if (userObj[i].email === email) {
        if (userObj[i].password === password) {
          if (remember_me) {
            let date = new Date();
            date.setMonth(date.getMonth() + 1);
            cookie.setCookie("useremail", email, date);
          } else cookie.setCookie("useremail", email);
          return true;
        }
      }
    }
  }

  alert("wrong email or password");
  return false;
};
