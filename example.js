var { sortBy, escapeRegExp } = require("lodash");
var fzy = require(".");

var list = [
	"app/models/user.rb",
	"app/models/order.rb",
	"app/models/customer.rb"
];

var query = "amuser";

var regex = new RegExp(query.split('').map(escapeRegExp).join(".*"));

list = list.filter((s) => s.match(regex));
list = sortBy(list, (s) => -fzy.score(query, s));

list.slice(0, 10);

/* Print the list with matched positions */
list.forEach((s) => {
	var padded = "";
	var p = fzy.positions(query, s);
	for(var i = 0; i < query.length; i++) {
		padded = padded.padEnd(p[i], ' ') + query[i];
	}

	console.log(s);
	console.log(padded);
	console.log("");
});
