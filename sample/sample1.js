const fs = require("../");

var data = fs.deepReadDir("testdirectory");

console.log(data);
console.log("...Complete");