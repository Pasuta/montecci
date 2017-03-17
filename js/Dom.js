define(function () {
  
  function DomPath(element){
    var i = 0;
    var max = 25;
    var ret = [{'tag':element.tagName, 'id':element.id, 'classes':element.className.split(' '), 'element':element}];
    while (element.parentNode && element.parentNode.tagName) {
      i++;
      if (i == max) break;
      element = element.parentNode;
      ret.push({'tag':element.tagName, 'id':element.id, 'classes':element.className.split(' '), 'element':element});
    }
  
    return ret;
  }
  
  return DomPath;
});
