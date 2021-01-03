onload = function () {
  $("#header").load("./navbar.html");
  $("#contactfooter").load("./footer.html");
};

$(".submitForm").click(function () {
  $(".thankMessage").show();
});
