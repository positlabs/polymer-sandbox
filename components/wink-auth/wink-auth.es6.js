Polymer('wink-auth', {

	login: function(){
		
		// var xhr = new XMLHttpRequest();
		// xhr.open("POST", "https://private-anon-3b0f86ebf-wink.apiary-mock.com/oauth2/token");
		// xhr.setRequestHeader("Content-Type", "application/json");
		// xhr.onreadystatechange = function () {
		//   if (this.readyState == 4) {
		//     console.log('Status: '+this.status+'\nHeaders: '+JSON.stringify(this.getAllResponseHeaders())+'\nBody: '+this.responseText);
		//   }
		// };

		// var postobj = {
		// 	client_id: 'quirky_wink_ios_app',
		// 	client_secret: 'ce609edf5e85015d393e7859a38056fe',
		// 	username: 'josh.beckwith@gmail.com',
		// 	password: 'chips2133',
		// 	grant_type: 'password'
		// };

		// xhr.send( JSON.stringify(postobj) );

		var xhr = new XMLHttpRequest();
		xhr.open('POST', 'https://private-9e69b-wink.apiary-mock.com/oauth2/token');
		xhr.setRequestHeader("Content-Type", "application/json");
		xhr.onreadystatechange = function () {
		  if (this.readyState == 4) {
		    alert('Status: '+this.status+'\nHeaders: '+JSON.stringify(this.getAllResponseHeaders())+'\nBody: '+this.responseText);
		  }
		};
		xhr.send("{\n    \"client_id\": \"consumer_key_goes_here\",\n    \"client_secret\": \"consumer_secret_goes_here\",\n    \"username\": \"user@example.com\",\n    \"password\": \"password_goes_here\",\n    \"grant_type\": \"password\"\n}");

	}

});