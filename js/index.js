define(function (require) {
  var HollypopeCopulator = require('./HollypopeCopulator');
  var NewbornForm = require('./NewbornForm');
  var FamilyLists = require('./FamilyLists');
  var Event = require('./Event');
  var DomPath = require('./Dom');
  var RelationTable = require('./RelationTable');

  var lator = new HollypopeCopulator();

  var familyLists = new FamilyLists();
  familyLists.setLator(lator);
  
  var newbornForm = new NewbornForm();
  newbornForm.setLator(lator);

  var relationTable = new RelationTable();
  relationTable.setLator(lator);
  
  lator.on('addToFamily', function (data) {
    lator.addToFamilyList(data.name, data.lastname);
    familyLists.updateFamilyListView(data.lastname);
    relationTable.draw();
    lator.redrawRelations(relationTable, familyLists);
  });

  lator.on('onConcern', function (data) {
    lator.onConcern(data.Montecchi, data.Capuleti, data.type);
    lator.redrawRelations(relationTable, familyLists);
  });

  lator.on('onForget', function (data) {
    lator.onForget(data.Montecchi, data.Capuleti, data.type);
    lator.redrawRelations(relationTable, familyLists);
  });

  Event.add(window, 'click', function (e) {
    var d = new DomPath(e.target);
    var classes = d[0].classes;
    if (classes[0] == 'personName') familyLists.activeName(d[0].element);
  });

  Event.add(newbornForm.newbornFormElement, 'submit', newbornForm.handleSubmit.bind(newbornForm));
  Event.add(familyLists.attractionRelationBtn, 'click', familyLists.attractionRelation.bind(familyLists));
  Event.add(familyLists.disaffectionRelationBtn, 'click', familyLists.disaffectionRelation.bind(familyLists));

  relationTable.draw();
  lator.emit('addToFamily', {'name': 'Peter', 'lastname': 'Montecchi'});
  lator.emit('addToFamily', {'name': 'Colly', 'lastname': 'Montecchi'});
  lator.emit('addToFamily', {'name': 'Yola', 'lastname': 'Capuleti'});

  lator.redrawRelations(relationTable, familyLists);
});

