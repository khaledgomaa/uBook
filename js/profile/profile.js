onload = function () {
  cookie.setCookie("selected", "profile");
  $(".profile-header").load("./navbar.html");
  $(".profile-footer").load("./footer.html");

  let users = JSON.parse(localStorage.getItem(localStorageForAccounts));
  let currentUser = cookie.getCookie(cookieNamecurrentUser);
  let user = {};
  let userIdx;
  let reader;
  let display = () => {
    $(".name input").val(user.username);
    $(".email input").val(user.email);
    $(".password input").val(user.password);
    if (user.image) $(".profile-img").prop({ src: user.image });
  };
  let saveUser = () => {
    user.email = $(".email input").val();
    user.name = $(".name input").val();
    user.password = $(".password input").val();
    if (reader) user.image = reader.result;

    users[userIdx] = user;

    localStorage.setItem(localStorageForAccounts, JSON.stringify(users));
    let date = new Date();
    date.setMonth(date.getMonth() + 1);
    cookie.setCookie(cookieNamecurrentUser, user.email, date);
  };
  for (let i = 0; i < users.length; i++) {
    if (currentUser === users[i].email) {
      user = users[i];
      userIdx = i;
    }
  }

  setTimeout(function () {
    $(".profile-header").show();
    $(".profile-container").css("display", "flex");
    $(".profile-footer").show();
    $("#preLoader").hide();
  }, 300);

  $(".edit-button").click(() => {
    if ($(".edit-button").text() === "Edit") {
      $("input")
        .prop({ disabled: false, type: "text" })
        .css({ "background-color": "unset", border: "1px solid" });
      $("#image-picker").prop({ disabled: false, type: "file" });
      $(".picker-label").css({ cursor: "pointer" });
      $(".picker-label span").css({ display: "block" });
      $(".edit-button").text("Save");

      $("input[type=file]").change(() => {
        var file = $("input[type=file]").get(0).files[0];
        if (file) {
          reader = new FileReader();
          reader.onload = function () {
            $(".profile-img").attr("src", reader.result);
          };
          reader.readAsDataURL(file);
        }
      });
    } else if ($(".edit-button").text() === "Save") {
      /*saving*/
      saveUser();
      $("input").prop({ disabled: true }).css({
        "background-color": "transparent",
        border: "none",
        outline: "none",
      });
      $(".edit-button").text("Edit");
      $(".picker-label").css({ cursor: "unset" });
      $(".picker-label span").css({ display: "none" });
      $(".password input").prop({ type: "password" });
    }
  });

  display();
};
