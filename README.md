diff-list -- Compare two arrays of objects and return a list of transformations
===============================================================================


Usage
-----

```
var diff = require('diff-list');

var transforms = diff(srcRows, dstRows, {key: 'id'});
```
returns `{put: [..], post: [..], del: [..]}`
transformations needed to be applied to src to obtain dst,
not taking into account ordering.


Options
-------

* equal  
  function of two parameters that returns true if they are equal,  
  defaults to strict deep-equal.
* key  
  check if an item having that key already exists (put) or is new (post).

