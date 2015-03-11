module.exports = function diffResource(src, dst, opts) {
	if (!opts) opts = {};
	var equal = opts.equal || defaultEqual();
	var key = opts.key || 'id';

	var transforms = {put: [], post: [], del: []};

	var hash = {};
	var pk;

	src.forEach(function(srcItem) {
		var pk = srcItem[key];
		if (!hash[pk]) hash[pk] = [];
		hash[pk].push(srcItem);
	});

	dst.forEach(function(dstItem) {
		var pk = dstItem[key];
		var srcItems = hash[pk];
		if (srcItems && srcItems.length) {
			var srcItem = srcItems.shift();
			if (!equal(srcItem, dstItem)) {
				transforms.put.push(dstItem);
			}
			if (srcItems.length == 0) delete hash[pk];
		} else {
			transforms.post.push(dstItem);
		}
	});

	for (pk in hash) transforms.del = transforms.del.concat(hash[pk]);

	return transforms;
}

function defaultEqual() {
	var deepEqual = require('deep-equal');
	return function(a, b) {
		return deepEqual(a, b, {strict: true});
	}
}

