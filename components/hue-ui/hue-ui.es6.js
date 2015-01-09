Polymer('hue-ui', Polymer.mixin ({

	created(){
		this.setProps({
			bridgeList: [],
			currentBridgeIP: '',
			newUsername: '',
			newUserParams: {}
		});
	},

	gotBridgeList(e, xhr, target){
		console.log('gotBridgeList', xhr.response);
		this.bridgeList = xhr.response;
		this.currentBridgeIP = this.bridgeList[0].internalipaddress;
		this.getLightList();
	},

	onClickBridgeIP(e){
		console.log('onClickedBridgeIP', e, e.target.innerHTML);
		this.currentBridgeIP = e.target.innerHTML;
	},

	onClickAddNewUser(e){
		console.log('onClickAddNewUser', e, this.$['pair-hue-bridge-dialogue']);
		this.$['pair-hue-bridge-dialogue'].toggle();
	},

	onClickDialogueOK(e){
		console.log('onClickDialogueOK', e);
		this.$['pair-hue-bridge-dialogue'].toggle();

		this.postJSON(
			"http://"+this.currentBridgeIP+"/api/", 
			{"devicetype":"test user", "username": 'newdeveloper'}, 
			(res)=>{
				console.log(res[0])
			});
	},

	postJSON(url, data, callback=console.log, method='POST'){

		var xhr = new XMLHttpRequest();
		xhr.open(method, url, true);
		xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
		xhr.onreadystatechange = function () {
			if (xhr.readyState == 4 && xhr.status == 200) {
				var res = JSON.parse(xhr.responseText);
				callback(res);
			}
		}
		xhr.send(JSON.stringify(data));	
	},

	getJSON(url, callback=console.log){

		var xhr = new XMLHttpRequest();
		xhr.open("GET", url, true);
		xhr.onreadystatechange = function () {
			if (xhr.readyState == 4 && xhr.status == 200) {
				var res = JSON.parse(xhr.responseText);
				callback(res);
			}
		}
		xhr.send();
	},

	getLightList(){
		this.getJSON('http://'+this.currentBridgeIP+'/api/newdeveloper/lights', (res)=>{
			this.lights = [];
			for (var i in res){
				this.lights.push(res[i]);
				res[i].index = i;
			}
		});
	},

	postLightState(e){
		console.log('postLightState', e);
		var data = e.detail.data;
		var state = e.detail.state;

		// http://<bridge ip address>/api/newdeveloper/lights/1/state
		this.postJSON('http://'+this.currentBridgeIP+'/api/newdeveloper/lights/'+data.index+'/state', state, (e)=>{
			// console.log('posted light state', e);
		}, 'PUT');

	}

}, window.mixins));
