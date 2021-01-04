onload = function () {
  $("#header").load("./navbar.html");
  $("#contactfooter").load("./footer.html");
};

$(".submitForm").click(function () {
  if (
    $("#name").val() !== "" &&
    $("#email").val() !== "" &&
    $("#subject").val() !== "" &&
    $("#message").val() !== ""
  ) {
    var emailRegex = /^(\w|[-]|[.])+@[a-z]+[\.][a-z]{2,8}$/;
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

function resetForm() {
  $("#name").val("");
  $("#email").val("");
  $("#subject").val("");
  $("#message").val("");
  $(".thankMessage").hide();
  $(".Islam").hide();
}

function submitInfo() {}
