var hotrequire = require('./hotrequire.js');

hotrequire('./example.js', this, 'module'); // loads the module into "this" context

console.log(this.module.message); // Outputs the message of the module

process.on('modified', function(file) { // Debug information
	console.log('['+new Date()+': '+file+' reloaded]');
});

process.on('removed', function(file) { // Debug information
	console.log('['+new Date()+': '+file+' was removed, stop observing]'); // To force this message simply rename the example.js to whatever you want.
});

var self = this;
process.on('reloaded', function(file) { // Debug information
	console.log(self.module.message); // Will output the new message of the module (after you have changed it)
});
