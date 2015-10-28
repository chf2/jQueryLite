(function(root){
  root.$l = function(query) {
    if (typeof query === "function") {
      
    } else if (query instanceof HTMLElement) {
      return new DOMNodeCollection([query]);
    } else {
      return new DOMNodeCollection([].slice.call(document.querySelectorAll(query)));
    }
  };

  var DOMNodeCollection = root.DOMNodeCollection = function (arr) {
    this.elements = arr;
  };

  DOMNodeCollection.prototype.html = function(html) {
    if (html) {
      this.elements.forEach(function(node){
        node.innerHTML = html;
      });
      return this;
    } else {
      return this.elements[0].innerHTML;
    }
  };

  DOMNodeCollection.prototype.empty = function() {
    this.elements.forEach(function(el){
      el.innerHTML = "";
    });

    return this;
  };

  DOMNodeCollection.prototype.append = function(obj) {
    if (obj === 'string') {
      this.elements.forEach(function(node){
        node.append(str);
      });
    } else if (obj instanceof HTMLElement) {
      this.elements.forEach(function(node){
        node.append(obj);
      });
    } else if (obj instanceof DOMNodeCollection) {
      this.elements.forEach(function(node){
        obj.forEach(function(child){
          node.appendChild(child);
        });
      });
    }

    return this;
  };

  DOMNodeCollection.prototype.addClass = function(klass) {
    this.elements.forEach(function(node){
      node.classList.add(klass);
    });

    return this;
  };

  DOMNodeCollection.prototype.removeClass = function(klass) {
    this.elements.forEach(function(node){
      node.classList.remove(klass);
    });

    return this;
  };

  DOMNodeCollection.prototype.attr = function(attribute, value) {
    if (value) {
      this.elements.forEach(function(node){
        node.setAttribute(attribute, value);
      });
      return this;
    } else {
      return this.elements[0].getAttribute(attribute);
    }
  };

  DOMNodeCollection.prototype.children = function () {
    var children = [];
    this.elements.forEach(function(node){
      children.push(node.children);
    });
    return new DOMNodeCollection(children);
  };

  DOMNodeCollection.prototype.parent = function () {
    var parents = [];
    this.elements.forEach(function(node){
      parents.push(node.parentElement);
    });
    return new DOMNodeCollection(parents);
  };

  DOMNodeCollection.prototype.find = function (selectors) {
    var foundEls = [];
    this.elements.forEach(function(node){
      node.children.forEach(function(child){
        foundEls = foundEls.concat(child.querySelectorAll(selectors));
      });
    });

    return foundEls;
  };

  DOMNodeCollection.prototype.remove = function (selectors) {
    this.find(selectors).forEach(function(el){
      el.parent.removeChild(el);
    });

    return this;
  };

  DOMNodeCollection.prototype.on = function (event, cb) {
    this.elements.forEach(function(node){
      node.addEventListener(event, cb);
    });

    return this;
  };

  DOMNodeCollection.prototype.off = function (event, cb) {
    this.elements.forEach(function(node){
      node.removeEventListener(event, cb);
    });

    return this;
  };
})(this);

