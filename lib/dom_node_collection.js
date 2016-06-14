function DomNodeCollection(elements) {
  this.elements = elements;
}

DomNodeCollection.prototype.html = function (string) {
  if (string !== undefined){
    this.elements.forEach(function(el){
      el.innerHTML = string;
    });
  }
  else{
    return this.elements[0].innerHTML;
  }
};

DomNodeCollection.prototype.empty = function () {
  this.html("");
};

DomNodeCollection.prototype.append = function (arg) {
  if (arg instanceof DomNodeCollection) {
    var that = this;
    arg.elements.forEach(function(node){
      that.append(node);
    });
  } else if (typeof arg === "string") {
    this.elements.forEach(function(el) {
      el.innerHTML += arg;
    });
  } else {
    this.elements.forEach(function(el) {
      el.innerHTML += arg.outerHTML;
    });
  }
};

DomNodeCollection.prototype.attr = function(attr_name, value) {
  if (value === undefined) {
    return this.elements[0].getAttribute(attr_name);
  } else {
    this.elements.forEach(function(el) {
      el.setAttribute(attr_name, value);
    });
  }
};

DomNodeCollection.prototype.addClass = function(clase) {

  this.elements.forEach(function(el){
    DomNodeCollection.addClassHelper(clase, el);
  });
};

DomNodeCollection.addClassHelper = function(clase, node){
  var claseArr = [].slice.call(node.classList);
  if (claseArr.indexOf(clase) === -1 ){
    claseArr.push(clase);
    node.setAttribute("class", claseArr.join(" "));
  }
};

DomNodeCollection.prototype.removeClass = function (clase) {
  this.elements.forEach(function(el){
    DomNodeCollection.removeClassHelper(clase, el);
  });
};

DomNodeCollection.removeClassHelper = function(clase, node){
  var claseArr = [].slice.call(node.classList);
  var claseInd = claseArr.indexOf(clase);
  if (claseInd !== -1 ){
    claseArr.splice(claseInd, 1);
    node.setAttribute("class", claseArr.join(" "));
  }
};

DomNodeCollection.prototype.children = function() {
  var children = [];
  this.elements.forEach(function(el){
    var childNodeArr = [].slice.call(el.children);
    children = children.concat(childNodeArr);
  });
  return new DomNodeCollection(children);
};

DomNodeCollection.prototype.parents = function () {
  var parents = [];
  this.elements.forEach(function(el){
    if (parents.indexOf(el.parentNode) === -1) {
      parents.push(el.parentNode);
    }
  });
  return new DomNodeCollection(parents);
};

DomNodeCollection.prototype.find = function(selector) {
  var selected = [];
  this.elements.forEach(function(el){
    selected = selected.concat(el.querySelectorAll(selector));
  })
  return new DomNodeCollection(selected);
};

DomNodeCollection.prototype.remove = function() {
  this.elements.forEach(function(el){
    el.parentNode.removeChild(el);
  });
  this.elements = [];
};

DomNodeCollection.prototype.on = function(event, func) {
  this.elements.forEach(function(el){
    el.addEventListener(event, func);
  });
};

DomNodeCollection.prototype.off = function (event,listener) {
  this.elements.forEach(function(el){
    el.removeEventListener(event,listener);
  });
};


module.exports = DomNodeCollection;
