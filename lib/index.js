var fs = require('fs');

Config = function(file) {  
  this.setFile(file);
  this.load();
};

Config.prototype.load = function() {
  var json;
  try {
    json = fs.readFileSync(this._file);
  } catch (e) {
    console.error('Could not read config file ' + this._file + ': ' + e.message);
    process.exit();
  }
  var obj;
  try {
    obj = JSON.parse(json);
  } catch (e) {
    console.error('Could not parse config file ' + this._file + ': ' + e.message);
    process.exit();
  }
  for (var i in obj) {
    this[i] = obj[i];
  }
};

Config.prototype.save = function() {
  var obj = {};
  for (var i in this) {
    if ('function' == typeof this[i]) {
      continue;
    }
    if (i.match(/^_/)) {
      continue;
    }
    obj[i] = this[i];
  }
  fs.writeFileSync(this._file, JSON.stringify(obj, null, 2));
};

Config.prototype.setFile = function(file) {
  this._file = file;
};

module.exports = Config;
