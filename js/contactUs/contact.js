onload = function () {
  cookie.setCookie("selected", "contactus");
  $("#header").load("./navbar.html");
  $("#contactfooter").load("./footer.html");
};
var emailRegex = /^(\w|[-]|[.])+@[a-z]+[\.][a-z]{2,8}$/;
$(".submitForm").click(function () {
  if (
    $("#name").val() !== "" &&
    $("#email").val() !== "" &&
    $("#subject").val() !== "" &&
    $("#message").val() !== ""
  ) {
    emailRegex = /^(\w|[-]|[.])+@[a-z]+[\.][a-z]{2,8}$/;
    if ($("#email").val().match(emailRegex)) {
      $(".thankMessage").show();
      $(".Islam").hide();
      setTimeout(function () {
        resetForm();
      }, 3000);
    } else {
      $(".thankMessage").hide();
      $(".Islam").show();
    }
  } else {
    $(".thankMessage").hide();
  }
});

document.getElementById("email").addEventListener("change", function () {
  if (!$("#email").val().match(emailRegex)) {
    $(".Islam").show();
  } else {
    $(".Islam").hide();
  }
});

function resetForm() {
  $("#name").val("");
  $("#email").val("");
  $("#subject").val("");
  $("#message").val("");
  $(".thankMessage").hide();
  $(".Islam").hide();
}

setTimeout(function () {
  $("#header").show();
  $("#contactContainer").show();
  $("#preLoader").hide();
}, 300);

function submitInfo() {}
