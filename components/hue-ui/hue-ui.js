"use strict";
Polymer('hue-ui', Polymer.mixin({
  created: function() {
    this.setProps({
      bridgeList: [],
      currentBridgeIP: '',
      newUsername: '',
      newUserParams: {}
    });
  },
  gotBridgeList: function(e, xhr, target) {
    console.log('gotBridgeList', xhr.response);
    this.bridgeList = xhr.response;
    this.currentBridgeIP = this.bridgeList[0].internalipaddress;
    this.getLightList();
  },
  onClickBridgeIP: function(e) {
    console.log('onClickedBridgeIP', e, e.target.innerHTML);
    this.currentBridgeIP = e.target.innerHTML;
  },
  onClickAddNewUser: function(e) {
    console.log('onClickAddNewUser', e, this.$['pair-hue-bridge-dialogue']);
    this.$['pair-hue-bridge-dialogue'].toggle();
  },
  onClickDialogueOK: function(e) {
    console.log('onClickDialogueOK', e);
    this.$['pair-hue-bridge-dialogue'].toggle();
    this.postJSON("http://" + this.currentBridgeIP + "/api/", {
      "devicetype": "test user",
      "username": 'newdeveloper'
    }, (function(res) {
      console.log(res[0]);
    }));
  },
  postJSON: function(url, data) {
    var callback = arguments[2] !== (void 0) ? arguments[2] : console.log;
    var method = arguments[3] !== (void 0) ? arguments[3] : 'POST';
    var xhr = new XMLHttpRequest();
    xhr.open(method, url, true);
    xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4 && xhr.status == 200) {
        var res = JSON.parse(xhr.responseText);
        callback(res);
      }
    };
    xhr.send(JSON.stringify(data));
  },
  getJSON: function(url) {
    var callback = arguments[1] !== (void 0) ? arguments[1] : console.log;
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4 && xhr.status == 200) {
        var res = JSON.parse(xhr.responseText);
        callback(res);
      }
    };
    xhr.send();
  },
  getLightList: function() {
    var $__0 = this;
    this.getJSON('http://' + this.currentBridgeIP + '/api/newdeveloper/lights', (function(res) {
      $__0.lights = [];
      for (var i in res) {
        $__0.lights.push(res[i]);
        res[i].index = i;
      }
    }));
  },
  postLightState: function(e) {
    console.log('postLightState', e);
    var data = e.detail.data;
    var state = e.detail.state;
    this.postJSON('http://' + this.currentBridgeIP + '/api/newdeveloper/lights/' + data.index + '/state', state, (function(e) {}), 'PUT');
  }
}, window.mixins));
//# sourceURL=hue-ui/hue-ui.es6.js