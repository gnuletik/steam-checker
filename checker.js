var request = require('request');
var notify= require('libnotify');

function isLinuxSupported(appid) {
  request({
    url: "http://store.steampowered.com/api/appdetails",
    qs: {"appids": appid}
  }, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var completeData = JSON.parse(body);
      var data = completeData[Object.keys(completeData)[0]].data;
      console.log("Linux supported ? " + data.platforms.linux);
      if (data.platforms.linux === true) {
	notify.notify("Supported !", {
	  title: "Steam checker - " + data.name,
	  image: "/usr/share/icons/gnome/48x48/status/starred.png"
	});
      } else {
	/*
	   notify.notify("Still not supported", {
	   title: "Steam checker - " + data.name,
	   image: "/usr/share/icons/gnome/48x48/status/dialog-error.png"
	   });
	   */
      }
    } else {
      console.log(response.statusCode);
      console.log(body);
    }
  });
}

setInterval(function() {
  isLinuxSupported(255220);
}, 1000 * 5);
