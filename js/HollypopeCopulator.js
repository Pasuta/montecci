define(function () {

  var indexOf;

  if (typeof Array.prototype.indexOf === 'function') {
    indexOf = function (haystack, needle) {
      return haystack.indexOf(needle);
    };
  } else {
    indexOf = function (haystack, needle) {
      var i = 0, length = haystack.length, idx = -1, found = false;
      while (i < length && !found) {
        if (haystack[i] === needle) {
          idx = i;
          found = true;
        }
        i++;
      }
      return idx;
    };
  }

  var HollypopeCopulator = function () {
    "use strict";
    if (HollypopeCopulator._instance) return HollypopeCopulator._instance;
    HollypopeCopulator._instance = this;
  };
  
  HollypopeCopulator.getInstance = function () {
    "use strict";
    return HollypopeCopulator._instance || new HollypopeCopulator();
  };

  HollypopeCopulator.prototype.events = {};
  
  HollypopeCopulator.prototype.MontecchiFamilyList = [
    'John', 'Anna', 'Helga', 'Adam'
  ];

  HollypopeCopulator.prototype.CapuletiFamilyList = [
    'Eva', 'Doe', 'Abram', 'Jane'
  ];

  HollypopeCopulator.prototype.relations = {
    'Anna-Abram': '+',
    'Adam-Jane': '-',
    'Helga-Eva': '+'
  };

  HollypopeCopulator.prototype.checkExistsInFamily = function (name, family) {
    return this[family + 'FamilyList'].indexOf(name) > -1;
  };

  HollypopeCopulator.prototype.addToFamilyList = function (name, family) {
    this[family + 'FamilyList'].push(name);
  };
  
  HollypopeCopulator.prototype.onConcern = function (montecchi, capuleti, type) {
    this.relations[montecchi + '-' + capuleti] = '+';
  };

  HollypopeCopulator.prototype.onForget = function (montecchi, capuleti, type) {
    this.relations[montecchi + '-' + capuleti] = '-';
  };
  
  HollypopeCopulator.prototype.redrawRelations = function (relationTable, familyLists) {
    var self = this;
    var relations = this.relations;
    for(var key in relations) {
      if (relations.hasOwnProperty(key)) {
        var val = relations[key];
        var method = val == '+' ? this.onConcern.bind(self) : this.onForget.bind(self);
        var fa = key.split('-');
        method(fa[0], fa[1], key);
        var options = {
          'Montecchi': fa[0],
          'Capuleti': fa[1],
          'type': val == '+' ? 'attraction' : 'disaffection'
        };
        relationTable.newRelation(options);
        familyLists.drawRelationList();
      }
    }
  };

  HollypopeCopulator.prototype.on = function (event, listener) {
    if (typeof this.events[event] !== 'object') {
      this.events[event] = [];
    }

    this.events[event].push(listener);
  };

  HollypopeCopulator.prototype.removeListener = function (event, listener) {
    var idx;

    if (typeof this.events[event] === 'object') {
      idx = indexOf(this.events[event], listener);

      if (idx > -1) {
        this.events[event].splice(idx, 1);
      }
    }
  };

  HollypopeCopulator.prototype.emit = function (event) {
    var i, listeners, length, args = [].slice.call(arguments, 1);

    if (typeof this.events[event] === 'object') {
      listeners = this.events[event].slice();
      length = listeners.length;

      for (i = 0; i < length; i++) {
        listeners[i].apply(this, args);
      }
    }
  };

  HollypopeCopulator.prototype.once = function (event, listener) {
    this.on(event, function g () {
      this.removeListener(event, g);
      listener.apply(this, arguments);
    });
  };
  
  return HollypopeCopulator;  

});
