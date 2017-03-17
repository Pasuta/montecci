define(function () {

  var RelationTable = function () {
    "use strict";
    if (RelationTable._instance) return RelationTable._instance;
    RelationTable._instance = this;
  };

  RelationTable.getInstance = function () {
    "use strict";
    return RelationTable._instance || new RelationTable();
  };

  RelationTable.prototype.relationTableComponent = document.getElementById('relationTableComponent');

  RelationTable.prototype.newRelation = function (options) {
    var mList = this.lator.MontecchiFamilyList.slice();
    var cList = this.lator.CapuletiFamilyList.slice();

    mList.unshift(0);
    cList.unshift(0);

    var mIndex = mList.indexOf(options.Montecchi);
    var cIndex = cList.indexOf(options.Capuleti);

    var id = 'r' + cIndex + 'c' + mIndex;
    var cell = document.getElementById(id);
    cell.innerHTML = options.type == 'attraction' ? '&hearts;' : '&Oslash;';
  };

  RelationTable.prototype.draw = function () {
    var mList = this.lator.MontecchiFamilyList.slice();
    var cList = this.lator.CapuletiFamilyList.slice();

    mList.unshift(0);
    cList.unshift(0);
    
    if (mList.length != cList.length) {
      var diff = Math.abs(mList.length - cList.length);
      var smaller = mList.length > cList.length ? cList : mList;
      for (var z = 0; z < diff; z++) {
        smaller.push('-');
      }
    }

    var table = [];
    for (var i = 0; i < mList.length; i++) {
      for (var j = 0; j < cList.length; j++) {
        var clear = j == 0 ? 'clear' : '';
        var id = 'r' + i + 'c' + j;
        var inner = '';
        if (i == 0) inner = mList[j];
        if (j == 0) inner = cList[i];
        if (id == 'r0c0') inner = 'C\\M';
        table += '<div class="cell '+ clear + '" id="' + id + '">' + inner + '</div>';
      }
    }

    this.relationTableComponent.innerHTML = table;
  };
  
  RelationTable.prototype.setLator = function (lator) {
    this.lator = lator;
  };

  return RelationTable;

});
