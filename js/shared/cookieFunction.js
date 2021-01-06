(function () {
  var literCookies = [];

  let cookie = {
    setCookie: function (cockieName, cockieVal, expireDate) {
      if (arguments.length === 2) {
        document.cookie = cockieName + "=" + cockieVal;
      } else if (arguments.length === 3) {
        if (expireDate instanceof Date) {
          document.cookie =
            cockieName +
            "=" +
            cockieVal +
            ";expires=" +
            expireDate.toUTCString();
        } else {
          throw new Error("Third argument should be a date");
        }
      } else {
        throw new Error("This function takes 2 or 3 parameters");
      }
    },
    getCookie: function (cookieName) {
      if (arguments.length === 1) {
        if (this.hasCookie(cookieName)) {
          return literCookies[cookieName];
        } else {
          return "Not Found";
        }
      } else {
        throw new Error("This function takes 1 parameter");
      }
    },
    hasCookie: function (cookieName) {
      if (arguments.length === 1) {
        this.allCookieList();
        return literCookies[cookieName] !== undefined ? true : false;
      } else {
        throw new Error("This function takes 1 parameter");
      }
    },
    allCookieList: function () {
      if (arguments.length === 0) {
        var cookies = document.cookie.split(";");
        for (var i = 0; i < cookies.length; i++) {
          literCookies[cookies[i].split("=")[0].trim()] = cookies[i].split(
            "="
          )[1];
        }
        return literCookies;
      } else {
        throw new Error("This function takes 0 parameter");
      }
    },

    deleteCookie: function (cookieName) {
      if (arguments.length === 1) {
        if (this.hasCookie(cookieName)) {  
          document.cookie =
            cookieName + "=" + "" + ";expires=" + new Date().toUTCString();
        } else {
          return "Not Found";
        }
      } else {
        throw new Error("This function takes 1 parameter");
      }
    },
  };
  window.cookie = cookie;
})();
