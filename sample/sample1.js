const fs = require("hachiware_fs");

var data = fs.deepReadDir("testdirectory");

console.log(data);
console.log("...Complete");