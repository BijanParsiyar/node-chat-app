var moment = require("moment");
// Unix Epoch Jan 1st 1970 00:00:00 am

// new Date().getTime();

// var date = new Date();
// console.log(date.getMonth());

// Just use moment for dates/time

var date = moment();

// date.add(100, 'year').subtract(9, 'months');
// console.log(date.format("MMM"));

// 10: 35 am
// console.log(date.format("hh:mm a"));

var createdAt = 1234;
var date = moment(createdAt);
console.log(date.format("h:mm a"));

new Date.getTime(); // Milliseconds since the Unix Epoch
var someTimeStamp = moment().valueOf(); // Milliseconds since the Unix Epoch
