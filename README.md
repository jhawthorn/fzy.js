# fzy.js
A javascript port of [fzy](https://github.com/jhawthorn/fzy)'s scoring algorithm


# Installation

```
npm i --save fzy.js
```


# Usage

`score(needle, haystack)`

``` javascript
var score = require('fzy.js').score

score("amuser", "app/models/user.rb")     // 5.595
score("amuser", "app/models/customer.rb") // 3.655
```

NB: calling `score` with a needle which doesn't have a match in haystack is undefined.
The caller needs to check that there is a match.
