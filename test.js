var fzy = require('.');

var score = fzy.score;

var SCORE_MIN = fzy.SCORE_MIN;
var SCORE_MAX = fzy.SCORE_MAX;

var SCORE_GAP_LEADING = fzy.SCORE_GAP_LEADING;
var SCORE_GAP_TRAILING = fzy.SCORE_GAP_TRAILING;
var SCORE_GAP_INNER = fzy.SCORE_GAP_INNER;
var SCORE_MATCH_CONSECUTIVE = fzy.SCORE_MATCH_CONSECUTIVE;
var SCORE_MATCH_SLASH = fzy.SCORE_MATCH_SLASH;
var SCORE_MATCH_WORD = fzy.SCORE_MATCH_WORD;
var SCORE_MATCH_CAPITAL = fzy.SCORE_MATCH_CAPITAL;
var SCORE_MATCH_DOT = fzy.SCORE_MATCH_DOT;

test("should_prefer_starts_of_words", function() {
	/* App/Models/Order is better than App/MOdels/zRder  */
	expect(score("amor", "app/models/order")).toBeGreaterThan(score("amor", "app/models/zrder"));
});

test("should_prefer_consecutive_letters", function() {
	/* App/MOdels/foo is better than App/M/fOo  */
	expect(score("amo", "app/m/foo")).toBeLessThan(score("amo", "app/models/foo"));
});

test("should_prefer_contiguous_over_letter_following_period", function() {
	/* GEMFIle.Lock < GEMFILe  */
	expect(score("gemfil", "Gemfile.lock")).toBeLessThan(score("gemfil", "Gemfile"));
});

test("should_prefer_shorter_matches", function() {
	expect(score("abce", "abcdef")).toBeGreaterThan(score("abce", "abc de"));
	expect(score("abc", "    a b c ")).toBeGreaterThan(score("abc", " a  b  c "));
	expect(score("abc", " a b c    ")).toBeGreaterThan(score("abc", " a  b  c "));
});

test("should_prefer_shorter_candidates", function() {
	expect(score("test", "tests")).toBeGreaterThan(score("test", "testing"));
});

test("should_prefer_start_of_candidate", function() {
	/* Scores first letter highly */
	expect(score("test", "testing")).toBeGreaterThan(score("test", "/testing"));
});

test("score_exact_score", function() {
	/* Exact match is SCORE_MAX */
	expect(score("abc", "abc")).toBe(SCORE_MAX);
	expect(score("aBc", "abC")).toBe(SCORE_MAX);
});

test("score_empty_query", function() {
	/* Empty query always results in SCORE_MIN */
	expect(score("", "")).toBe(SCORE_MIN);
	expect(score("", "a")).toBe(SCORE_MIN);
	expect(score("", "bb")).toBe(SCORE_MIN);
});

test("score_gaps", function() {
	expect(score("a", "*a")).toBe(SCORE_GAP_LEADING);
	expect(score("a", "*ba")).toBe(SCORE_GAP_LEADING*2);
	expect(score("a", "**a*")).toBe(SCORE_GAP_LEADING*2 + SCORE_GAP_TRAILING);
	expect(score("a", "**a**")).toBe(SCORE_GAP_LEADING*2 + SCORE_GAP_TRAILING*2);
	expect(score("aa", "**aa**")).toBe(SCORE_GAP_LEADING*2 + SCORE_MATCH_CONSECUTIVE + SCORE_GAP_TRAILING*2);
	expect(score("aa", "**a*a**")).toBe(SCORE_GAP_LEADING + SCORE_GAP_LEADING + SCORE_GAP_INNER + SCORE_GAP_TRAILING + SCORE_GAP_TRAILING);
});

test("score_consecutive", function() {
	expect(score("aa", "*aa")).toBe(SCORE_GAP_LEADING + SCORE_MATCH_CONSECUTIVE);
	expect(score("aaa", "*aaa")).toBe(SCORE_GAP_LEADING + SCORE_MATCH_CONSECUTIVE*2);
	expect(score("aaa", "*a*aa")).toBe(SCORE_GAP_LEADING + SCORE_GAP_INNER + SCORE_MATCH_CONSECUTIVE);
});

test("score_slash", function() {
	expect(score("a", "/a")).toBe(SCORE_GAP_LEADING + SCORE_MATCH_SLASH);
	expect(score("a", "*/a")).toBe(SCORE_GAP_LEADING*2 + SCORE_MATCH_SLASH);
	expect(score("aa", "a/aa")).toBe(SCORE_GAP_LEADING*2 + SCORE_MATCH_SLASH + SCORE_MATCH_CONSECUTIVE);
});

test("score_capital", function() {
	expect(score("a", "bA")).toBe(SCORE_GAP_LEADING + SCORE_MATCH_CAPITAL);
	expect(score("a", "baA")).toBe(SCORE_GAP_LEADING*2 + SCORE_MATCH_CAPITAL);
	expect(score("aa", "baAa")).toBe(SCORE_GAP_LEADING*2 + SCORE_MATCH_CAPITAL + SCORE_MATCH_CONSECUTIVE);
});

test("score_dot", function() {
	expect(score("a", ".a")).toBe(SCORE_GAP_LEADING + SCORE_MATCH_DOT);
	expect(score("a", "*a.a")).toBe(SCORE_GAP_LEADING*3 + SCORE_MATCH_DOT);
	expect(score("a", "*a.a")).toBe(SCORE_GAP_LEADING + SCORE_GAP_INNER + SCORE_MATCH_DOT);
});

