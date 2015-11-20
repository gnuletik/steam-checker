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
      console.log("Linux supported for " + data.name + " ? " + data.platforms.linux);
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

var interval = 30;
var appid = 255220;
(function() {
  var index = 2; // let's supposed you launched it with node.js checker.js -i 30 255220
  while (index < process.argv.length) {
    if (process.argv[index] == "--help") {
      console.log("Usage: node checker.js -i [interval of checking in seconds] [appid]");
      console.log("When there is no parameters, the program will check for Grid Autosport every 30 seconds");
      console.log("Example 1 : node checker.js -i 30 255220");
      console.log("Example 2 : node checker.js -i 5 570");
      process.exit();
    } else if (process.argv[index] == "-i") {
      interval = parseInt(process.argv[index + 1]);
      index++;
    } else {
      appid = parseInt(process.argv[index]);
    }
    index++;
  }
  if (isNaN(interval)) {
    console.error("Interval have to be an integer.");
    process.exit();
  }

  if (isNaN(appid)) {
    console.error("Appid have to be a number.");
    process.exit();
}
/*
console.log("appid : " + appid)
console.log("interval : " + interval)
*/
})();

setInterval(function() {
  isLinuxSupported(appid);
}, 1000 * interval);
