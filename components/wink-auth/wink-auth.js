"use strict";
Polymer('wink-auth', {login: function() {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://private-9e69b-wink.apiary-mock.com/oauth2/token');
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function() {
      if (this.readyState == 4) {
        alert('Status: ' + this.status + '\nHeaders: ' + JSON.stringify(this.getAllResponseHeaders()) + '\nBody: ' + this.responseText);
      }
    };
    xhr.send("{\n    \"client_id\": \"consumer_key_goes_here\",\n    \"client_secret\": \"consumer_secret_goes_here\",\n    \"username\": \"user@example.com\",\n    \"password\": \"password_goes_here\",\n    \"grant_type\": \"password\"\n}");
  }});
//# sourceURL=wink-auth/wink-auth.es6.js