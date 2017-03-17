define(function () {

  var FamilyLists = function () {
    "use strict";
    if (FamilyLists._instance) return FamilyLists._instance;
    FamilyLists._instance = this;
  };

  FamilyLists.getInstance = function () {
    "use strict";
    return FamilyLists._instance || new FamilyLists();
  };

  FamilyLists.prototype.MontecchiFamilyListTable = document.getElementById('MontecchiFamilyListTable');
  FamilyLists.prototype.CapuletiFamilyListTable = document.getElementById('CapuletiFamilyListTable');
  
  FamilyLists.prototype.attractionRelationBtn = document.getElementById('attractionRelationBtn');
  FamilyLists.prototype.disaffectionRelationBtn = document.getElementById('disaffectionRelationBtn');
  FamilyLists.prototype.relationList = document.getElementById('relationList');

  FamilyLists.prototype.updateFamilyListView = function (family) {
    var self = this;
    var familyListTable = {
      Capuleti: this.CapuletiFamilyListTable,
      Montecchi: this.MontecchiFamilyListTable
    };

    familyListTable[family].innerHTML = '';
    var list = this.lator[family + 'FamilyList'];
    var i = 0;
    list.forEach(function (value) {
      familyListTable[family].innerHTML += self.createTableRow(++i, value, family);
    });
  };

  FamilyLists.prototype.createTableRow = function (iter, innerValue, family) {
    return '<tr><th scope="row">' + iter + '</th><td><span class="personName" data-family="' + family + '">' + innerValue +'</span></td></tr>';
  };

  FamilyLists.prototype.attractionRelation = function () {
    var elements = document.getElementsByClassName('active');
    var relation = { 'type': 'attraction' };
    for (var i = 0; i < elements.length; i++) {
      var family = elements[i].getAttribute('data-family');
      relation[family] = elements[i].innerHTML;
    }
    this.lator.emit('onConcern', relation);
    this.reset();
  };

  FamilyLists.prototype.disaffectionRelation = function () {
    var elements = document.getElementsByClassName('active');
    var relation = { 'type': 'disaffection' };
    for (var i = 0; i < elements.length; i++) {
      var family = elements[i].getAttribute('data-family');
      relation[family] = elements[i].innerHTML;
    }
    this.lator.emit('onForget', relation);
    this.reset();
  };

  FamilyLists.prototype.reset = function () {
    var mList = self.MontecchiFamilyListTable.getElementsByClassName('personName');
    var cList = self.CapuletiFamilyListTable.getElementsByClassName('personName');

    for (var i = 0; i < mList.length; i++) {
      mList[i].classList.remove('active');
    }

    for (var j = 0; j < cList.length; j++) {
      cList[j].classList.remove('active');
    }
  };

  FamilyLists.prototype.activeName = function (element) {
    var self = this;
    var mList = self.MontecchiFamilyListTable.getElementsByClassName('personName');
    var cList = self.CapuletiFamilyListTable.getElementsByClassName('personName');
    var currentList = element.getAttribute('data-family') == 'Montecchi' ? mList : cList;

    for (var i = 0; i < currentList.length; i++) {
      if (currentList[i] == element) continue;
      currentList[i].classList.remove('active');
    }
    element.classList.toggle('active');
  };

  FamilyLists.prototype.drawRelationList = function () {
    var self = this;
    var relations = self.lator.relations;
    self.relationList.innerHTML = '';
    for(var key in relations) {
      if (relations.hasOwnProperty(key)) {
        self.relationList.innerHTML += '<p>' + key + ' = ' + relations[key] + '</p>';
      }
    }
  };
  
  FamilyLists.prototype.setLator = function (lator) {
    this.lator = lator;
  };

  return FamilyLists;

});
