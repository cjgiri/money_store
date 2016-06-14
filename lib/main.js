var DomNodeCollection = require('./dom_node_collection.js');

var onReady = [];

window.$l = function(arg) {
  switch (typeof arg) {
    case "string":
      var nodes = document.querySelectorAll(arg);
      return new DomNodeCollection([].slice.call(nodes));
    case "object":
      return new DomNodeCollection([arg]);
    case 'function':
      if (document.readyState !== 'loading'){
        arg();
      }else{
        onReady.push(arg);
      }
  }
};

document.addEventListener("DOMContentLoaded", function(event){
  onReady.forEach(function(func){
    func();
  });
});

$l.extend = function(){
  for (var i = 1; i < arguments.length; i++) {
    for (var property in arguments[i]){
      arguments[0][property] = arguments[i][property];
    }
  }
};

var AJAX_DEFAULTS = {
  success: function(data, textStatus, jqXHR) {
  },
  error: function(data, textStatus, jqXHR) {
  },
  url: "",
  method: "GET",
  data: "",
  contentType: 'application/x-www-form-urlencoded; charset=UTF-8'
};

$l.ajax = function(options){
  var completeOptions = {};
  $l.extend(completeOptions, AJAX_DEFAULTS, options);

  var xhr = new XMLHttpRequest();
  xhr.open(completeOptions.method, completeOptions.url);

  xhr.onload = function() {
    completeOptions.success(xhr.response, xhr.status, xhr);
  };
  xhr.onerror = function() {
    completeOptions.error(xhr.response, xhr.status, xhr);
  };

  xhr.send();
};
