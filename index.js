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
		// list same and different items
		var sameItems = [];
		var diffItems = (hash[pk] || []).filter(function(srcItem) {
			var same = equal(srcItem, dstItem);
			if (same) sameItems.push(srcItem);
			return !same;
		});
		if (sameItems.length == 0) {
			// nothing's the same so either put or post
			if (diffItems.length) {
				// set any item and remove the others
				diffItems.shift();
				transforms.put.push(dstItem);
			} else {
				// new item
				transforms.post.push(dstItem);
			}
			srcItems = diffItems;
		} else {
			sameItems.shift();
			srcItems = sameItems.concat(diffItems);
		}
		if (srcItems.length == 0) delete hash[pk];
		else hash[pk] = srcItems;
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

