/**
 *
 * @copyright Copyright (c) 2011, {@link http://krnl.de Kai Dorschner}
 * @license http://www.gnu.org/licenses/gpl-3.0.html GNU General Public License Version 3 (GPL3)
 */

/**
 * Hot-loads a module into the context's scope.
 *
 * Hot-loading means that it'll reload the file into the variable when it's changed.
 *
 * @copyright Copyright (c) 2011, {@link http://krnl.de Kai Dorschner}
 * @license http://www.gnu.org/licenses/gpl-3.0.html GNU General Public License Version 3 (GPL3)
 * @category hotRequire
 * @package hotRequire
 * @author Kai Dorschner <the-kernel32@web.de>
 * @return void
 * @param string path Contains the path to the required module.
 * @param object context Context in which scope the module will be loaded in.
 * @param string varname Variable name inside the context to access the module.
 *
 * @todo extend require object to require.hot(path, callback);
 *		 require.prototype.hot = function(path, callback) doesn't work.
 */
function hotRequire(path, callback)
{
	var	  fs			= require('fs')
		, fspath		= require('path')
		, filename		= path // resolving paths here doesn't work, we need the client to resolve for us
		;

	var watcher = fs.watch(filename, function(event) {
		if(!fspath.existsSync(filename)) // path does not exist anymore
		{
			process.emit('removed', filename);
			delete require.cache[filename];
			watcher.close();
			return; // short circuit
		}

		if(event === "change")
		{
			process.emit('modified', filename);
			delete require.cache[filename]; // clear the cache (makes sure that the NEW file will be loaded)
			callback(require(filename)); // rebuild cache with new file immediately
			process.emit('reloaded', filename);
		}
	});
	return require(filename); // returns the required module (as usual)
}

require.prototype.__proto__.hot = hotRequire;
module.exports = exports = hotRequire;
