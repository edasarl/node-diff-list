var ade = require('assert').deepEqual;


var diff = require('../');

function test(a, b, r) {
	ade(diff(a, b), r);
}


test([
	{id: 1, url: 'http://domain1.com', text: 'text'},
	{id: 2, url: 'http://domain2.com', text: 'text2'},
	{id: 3, url: 'http://domain3.com', text: 'text3'}
], [
	{id: 2, url: 'http://domain2.com', text: 'text2'},
	{id: 3, url: 'http://domain3.com', text: 'text31'},
	{id: 4, url: 'http://domain4.com', text: 'text4'}
], {
	post: [
		{id: 4, url: 'http://domain4.com', text: 'text4'}
	],
	put: [
		{id: 3, url: 'http://domain3.com', text: 'text31'}
	],
	del: [
		{id: 1, url: 'http://domain1.com', text: 'text'}
	]
});

test([
	{id: 1, url: 'http://domain1.com', text: 'text'},
	{id: 2, url: 'http://domain2.com', text: 'text2'},
	{id: 2, url: 'http://domain2.com', text: 'text21'},
	{id: 3, url: 'http://domain3.com', text: 'text3'}
], [
	{id: 2, url: 'http://domain2.com', text: 'text2'},
	{id: 3, url: 'http://domain3.com', text: 'text31'},
	{id: 4, url: 'http://domain4.com', text: 'text4'}
], {
	post: [
		{id: 4, url: 'http://domain4.com', text: 'text4'}
	],
	put: [
		{id: 3, url: 'http://domain3.com', text: 'text31'}
	],
	del: [
		{id: 1, url: 'http://domain1.com', text: 'text'},
		{id: 2, url: 'http://domain2.com', text: 'text21'}
	]
});

test([
	{id: 2, url: 'http://domain2.com', text: 'text3'},
	{id: 2, url: 'http://domain4.com', text: 'text2'},
	{id: 2, url: 'http://domain2.com', text: 'text2'}
], [
	{id: 2, url: 'http://domain2.com', text: 'text2'}
], {
	post: [],
	put: [],
	del: [
		{id: 2, url: 'http://domain2.com', text: 'text3'},
		{id: 2, url: 'http://domain4.com', text: 'text2'}
	]
});

test([
	{id: 2, url: 'http://domain2.com', text: 'text2'},
	{id: 2, url: 'http://domain2.com', text: 'text21'},
	{id: 2, url: 'http://domain4.com', text: 'text2'}
], [
	{id: 2, url: 'http://domain2.com', text: 'text1'}
], {
	post: [],
	put: [
		{id: 2, url: 'http://domain2.com', text: 'text1'}
	],
	del: [
		{id: 2, url: 'http://domain2.com', text: 'text21'},
		{id: 2, url: 'http://domain4.com', text: 'text2'}
	]
});

test([
	{id: 2, url: 'http://domain2.com', text: 'text2'}
], [
	{id: 2, url: 'http://domain2.com', text: 'text1'},
	{id: 2, url: 'http://domain2.com', text: 'text2'},
	{id: 2, url: 'http://domain2.com', text: 'text2'}
], {
	put: [ { id: 2, url: 'http://domain2.com', text: 'text1' } ],
	post: [
		{ id: 2, url: 'http://domain2.com', text: 'text2' },
		{ id: 2, url: 'http://domain2.com', text: 'text2' }
	],
	del: []
});

