# fzy.js
A javascript port of [fzy](https://github.com/jhawthorn/fzy)'s scoring algorithm

[![Build Status](https://travis-ci.com/jhawthorn/fzy.js.svg?branch=master)](https://travis-ci.com/jhawthorn/fzy.js)

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

