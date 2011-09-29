# hotRequire

	hotRequire hot-loads modules by extending the system's require() function using the fs.fileWatch() routine (which already comes with node).
	Hot-loading means it watches the file for changes and then reloades it's parsed content into the variable set by the user.

	The file watcher emits catchable events to the process. These events are "modified", "removed" and "reloaded".

## Usage

	require('./hotrequire.js');

	hotrequire('./example.js', this, 'module');

	console.log(this.module.message);

## Requirements

* fs.js & node-waf & v8.h (Comes with node)
