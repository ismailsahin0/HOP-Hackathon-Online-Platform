var promisen = require("promisen");

module.exports = Jaccard;

var _SEP = "\x00";

function Jaccard(options) {
  if (!(this instanceof Jaccard)) return new Jaccard(options);

  var that = this;
  if (options) Object.keys(options).forEach(function(key) {
    that[key] = options[key];
  });
}

Jaccard.prototype.wait = null;

Jaccard.prototype.expire = null;

Jaccard.prototype.throttle = 1;

Jaccard.prototype.timeout = null;

Jaccard.prototype.direction = false;

Jaccard.prototype.cachedLog = function(itemId) {
  var task = wrap.call(this, this.getLog);
  if (this.expire >= 0) {
    task = promisen.memoize(task, this.expire);
  }
  this.cachedLog = task; 
  return task.call(this, itemId);
};

Jaccard.prototype.getLog = function(itemId) {
  throw new Error("getLog method not implemented");
};

Jaccard.prototype.getItems = function() {
  throw new Error("getItems method not implemented");
};

Jaccard.prototype.getLinks = function(sourceItems, targetItems, onLink) {
  var that = this;
  var links;
  var check = {};
  var wait = (that.wait >= 0) && promisen.wait(that.wait);
  var hasFilter = (that.filter !== through);
  var noDirection = !that.direction;
  if (!sourceItems) sourceItems = that.getItems;
  if (!targetItems) targetItems = sourceItems;
  if (!onLink) onLink = _onLink;

  return promisen.eachSeries(sourceItems, sourceIt).call(that).then(done);

  function sourceIt(sourceItem) {
    return promisen.eachSeries(targetItems, targetIt).call(that);

    function targetIt(targetItem) {
      if (sourceItem === targetItem) return;

      if (noDirection) {
        var asc = sourceItem + _SEP + targetItem;
        var desc = targetItem + _SEP + sourceItem;
        if (check[asc] || check[desc]) return;
        check[asc] = check[desc] = 1;
      }

      var job = that.cachedIndex(sourceItem, targetItem);
      if (hasFilter) job = job.then(filter);
      job = job.then(link);
      if (wait) job = job.then(wait);
      return job;

      function filter(index) {
        if (index == null) return;
        return that.filter(index, sourceItem, targetItem);
      }

      function link(index) {
        if (index == null) return;
        return onLink.call(that, index, sourceItem, targetItem);
      }
    }
  }

  function _onLink(index, sourceItem, targetItem) {
    if (!links) links = [];
    links.push({source: sourceItem, target: targetItem, value: index});
  }

  function done() {
    return links;
  }
};

Jaccard.prototype.cachedIndex = function(sourceItem, targetItem) {
  var task = wrap.call(this, this.getIndex);
  if (this.expire >= 0) {
    task = memoize(task, this.expire);
  }
  this.cachedIndex = task;
  return task.call(this, sourceItem, targetItem);
};

Jaccard.prototype.getIndex = function(sourceItem, targetItem) {
  var that = this;

  return that.cachedLog(sourceItem).then(function(sourceLog) {
    if (!sourceLog) return;
    return that.cachedLog(targetItem).then(function(targetLog) {
      if (!targetLog) return;
      return that.index(sourceLog, targetLog);
    });
  });
};

Jaccard.prototype.index = function(sourceLog, targetLog) {
  if (!sourceLog) return;
  if (!targetLog) return;

  var sourceLen = sourceLog.length;
  var targetLen = targetLog.length;

  if (!sourceLen) return;
  if (!targetLen) return;

  var match = (sourceLen < targetLen) ? count(sourceLog, targetLog) : count(targetLog, sourceLog);

  return match / (sourceLen + targetLen - match);
};

function count(shorterLog, longerLog) {
  var map = {};
  Array.prototype.forEach.call(shorterLog, function(userId) {
    map[userId] = 1;
  });

  var both = {};
  Array.prototype.forEach.call(longerLog, function(userId) {
    if (map[userId]) both[userId] = 1;
  });

  return Object.keys(both).length;
}
