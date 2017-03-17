define(function () {

  var NewbornForm = function () {
    "use strict";
    if (NewbornForm._instance) return NewbornForm._instance;
    NewbornForm._instance = this;
  };

  NewbornForm.getInstance = function () {
    "use strict";
    return NewbornForm._instance || new NewbornForm();
  };

  NewbornForm.prototype.alertBox = document.getElementById('alertBox');
  NewbornForm.prototype.alertBox = document.getElementById('alertBox');
  NewbornForm.prototype.existingName = document.getElementById('existingName');
  NewbornForm.prototype.newbornFormElement = document.getElementById('newborn');
  NewbornForm.prototype.lastnameSelect = document.getElementById('lastnameSelect');

  NewbornForm.prototype.handleSubmit = function (e) {
    e.preventDefault();
    var name = document.getElementById('name').value;
    var lastname = this.lastnameSelect.options[lastnameSelect.selectedIndex].text;

    if (!this.lator.checkExistsInFamily(name, lastname)) {
      this.lator.emit('addToFamily', {'name': name, 'lastname': lastname});
      this.resetFields();
      this.hideAlert()
    } else {
      this.showAlert(name);
    }
  };

  NewbornForm.prototype.resetFields = function () {
    document.getElementById('name').value = '';
  };

  NewbornForm.prototype.showAlert = function (name) {
    this.alertBox.classList.remove('hidden');
    this.existingName.innerHTML = name;
  };

  NewbornForm.prototype.hideAlert = function() {
    this.alertBox.classList.add('hidden');
  };
  
  NewbornForm.prototype.setLator = function (lator) {
    this.lator = lator;
  };

  return NewbornForm;

});
