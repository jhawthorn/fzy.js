var fzy = require('.');

var Benchmark = require('benchmark');

var suite = new Benchmark.Suite;

suite.add('score("a", "aaaaaaaaaa")', function() {
  fzy.score("a", "aaaaaaaaaa")
})
suite.add('score("aaaaa", "aaaaaaaaaa")', function() {
  fzy.score("aaaaa", "aaaaaaaaaa")
})
.on('cycle', function(event) {
  console.log(String(event.target));
})
.run({ 'async': true });
