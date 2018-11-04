# fzy.js
A javascript port of [fzy](https://github.com/jhawthorn/fzy)'s fuzzy finder scoring algorithm

[Try it out online!](https://jhawthorn.github.io/fzy-demo/)

[![Build Status](https://travis-ci.com/jhawthorn/fzy.js.svg?branch=master)](https://travis-ci.com/jhawthorn/fzy.js)
![Build Size](http://img.badgesize.io/jhawthorn/fzy.js/master/index.js.svg?compression=gzip)
![0 Dependencies](https://img.shields.io/badge/dependencies-0-44cc11.svg)

# Installation

```
npm i --save fzy.js
```


# Usage

`score(needle, haystack)`

``` javascript
var fzy = require('fzy.js')

fzy.score("amuser", "app/models/user.rb")     // 5.595
fzy.score("amuser", "app/models/customer.rb") // 3.655
```


`positions(needle, haystack)`

``` javascript
fzy.positions("amuser", "app/models/user.rb")     // [ 0, 4, 11, 12, 13, 14 ]
fzy.positions("amuser", "app/models/customer.rb") // [ 0, 4, 12, 13, 17, 18 ]
```

NB: `score` and `positions` must be called with matching needle and haystack,
doing otherwise is undefined. The caller needs to check that there is a match.


# Full Example

``` javascript
var { sortBy, escapeRegExp } = require("lodash");
var fzy = require("fzy.js");

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

// Output:
//
// app/models/user.rb
// a   m      user
//
// app/models/customer.rb
// a   m       us   er

```
