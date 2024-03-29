var BMapLib = window.BMapLib = BMapLib || {};
(function () {
  var a = a || {
    guid: "$BAIDU$"
  };
  (function () {
    window[a.guid] = {};
    a.extend = function (h, f) {
      for (var g in f) {
        if (f.hasOwnProperty(g)) {
          h[g] = f[g]
        }
      }
      return h
    };
    a.lang = a.lang || {};
    a.lang.guid = function () {
      return "TANGRAM__" + (window[a.guid]._counter++).toString(36)
    };
    window[a.guid]._counter = window[a.guid]._counter || 1;
    window[a.guid]._instances = window[a.guid]._instances || {};
    a.lang.Class = function (f) {
      this.guid = f || a.lang.guid();
      window[a.guid]._instances[this.guid] = this
    };
    window[a.guid]._instances = window[a.guid]._instances || {};
    a.lang.isString = function (f) {
      return "[object String]" == Object.prototype.toString.call(f)
    };
    a.isString = a.lang.isString;
    a.lang.isFunction = function (f) {
      return "[object Function]" == Object.prototype.toString.call(f)
    };
    a.lang.Event = function (f, g) {
      this.type = f;
      this.returnValue = true;
      this.target = g || null;
      this.currentTarget = null
    };
    a.lang.Class.prototype.addEventListener = function (i, h, g) {
      if (!a.lang.isFunction(h)) {
        return
      }!this.__listeners && (this.__listeners = {});
      var f = this.__listeners,
        j;
      if (typeof g == "string" && g) {
        if (/[^\w\-]/.test(g)) {
          throw ("nonstandard key:" + g)
        } else {
          h.hashCode = g;
          j = g
        }
      }
      i.indexOf("on") != 0 && (i = "on" + i);
      typeof f[i] != "object" && (f[i] = {});
      j = j || a.lang.guid();
      h.hashCode = j;
      f[i][j] = h
    };
    a.lang.Class.prototype.removeEventListener = function (h, g) {
      if (a.lang.isFunction(g)) {
        g = g.hashCode
      } else {
        if (!a.lang.isString(g)) {
          return
        }
      }!this.__listeners && (this.__listeners = {});
      h.indexOf("on") != 0 && (h = "on" + h);
      var f = this.__listeners;
      if (!f[h]) {
        return
      }
      f[h][g] && delete f[h][g]
    };
    a.lang.Class.prototype.dispatchEvent = function (j, f) {
      if (a.lang.isString(j)) {
        j = new a.lang.Event(j)
      }!this.__listeners && (this.__listeners = {});
      f = f || {};
      for (var h in f) {
        j[h] = f[h]
      }
      var h, g = this.__listeners,
        k = j.type;
      j.target = j.target || this;
      j.currentTarget = this;
      k.indexOf("on") != 0 && (k = "on" + k);
      a.lang.isFunction(this[k]) && this[k].apply(this, arguments);
      if (typeof g[k] == "object") {
        for (h in g[k]) {
          g[k][h].apply(this, arguments)
        }
      }
      return j.returnValue
    };
    a.dom = a.dom || {};
    a.dom._g = function (f) {
      if (a.lang.isString(f)) {
        return document.getElementById(f)
      }
      return f
    };
    a._g = a.dom._g;
    a.event = a.event || {};
    a.event._listeners = a.event._listeners || [];
    a.event.on = function (g, j, l) {
      j = j.replace(/^on/i, "");
      g = a.dom._g(g);
      var k = function (n) {
          l.call(g, n)
        },
        f = a.event._listeners,
        i = a.event._eventFilter,
        m, h = j;
      j = j.toLowerCase();
      if (i && i[j]) {
        m = i[j](g, j, k);
        h = m.type;
        k = m.listener
      }
      if (g.addEventListener) {
        g.addEventListener(h, k, false)
      } else {
        if (g.attachEvent) {
          g.attachEvent("on" + h, k)
        }
      }
      f[f.length] = [g, j, l, k, h];
      return g
    };
    a.on = a.event.on;
    a.event.un = function (h, k, g) {
      h = a.dom._g(h);
      k = k.replace(/^on/i, "").toLowerCase();
      var n = a.event._listeners,
        i = n.length,
        j = !g,
        m, l, f;
      while (i--) {
        m = n[i];
        if (m[1] === k && m[0] === h && (j || m[2] === g)) {
          l = m[4];
          f = m[3];
          if (h.removeEventListener) {
            h.removeEventListener(l, f, false)
          } else {
            if (h.detachEvent) {
              h.detachEvent("on" + l, f)
            }
          }
          n.splice(i, 1)
        }
      }
      return h
    };
    a.un = a.event.un;
    a.preventDefault = a.event.preventDefault = function (f) {
      if (f.preventDefault) {
        f.preventDefault()
      } else {
        f.returnValue = false
      }
    }
  })();
  var e = BMapLib.RichMarker = function (h, f, g) {
    if (!h || !f || !(f instanceof BMap.Point)) {
      return
    }
    this._map = null;
    this._content = h;
    this._position = f;
    this._container = null;
    this._size = null;
    g = g || {};
    this._opts = a.extend(a.extend(this._opts || {}, {
      enableDragging: false,
      anchor: new BMap.Size(0, 0)
    }), g)
  };
  e.prototype = new BMap.Overlay();
  e.prototype.initialize = function (g) {
    var f = this,
      h = f._container = document.createElement("div");
    f._map = g;
    a.extend(h.style, {
      position: "absolute",
      zIndex: BMap.Overlay.getZIndex(f._position.lat),
      background: "#FFF",
      cursor: "pointer"
    });
    g.getPanes().labelPane.appendChild(h);
    f._appendContent();
    f._setEventDispath();
    f._getContainerSize();
    return h
  };
  e.prototype.draw = function () {
    var h = this._map,
      g = this._opts.anchor,
      f = h.pointToOverlayPixel(this._position);
    this._container.style.left = f.x + g.width + "px";
    this._container.style.top = f.y + g.height + "px"
  };
  e.prototype.enableDragging = function () {
    this._opts.enableDragging = true
  };
  e.prototype.disableDragging = function () {
    this._opts.enableDragging = false
  };
  e.prototype.isDraggable = function () {
    return this._opts.enableDragging
  };
  e.prototype.getPosition = function () {
    return this._position
  };
  e.prototype.setPosition = function (f) {
    if (!f instanceof BMap.Point) {
      return
    }
    this._position = f;
    this.draw()
  };
  e.prototype.getAnchor = function () {
    return this._opts.anchor
  };
  e.prototype.setAnchor = function (f) {
    if (!f instanceof BMap.Size) {
      return
    }
    this._opts.anchor = f;
    this.draw()
  };
  e.prototype._appendContent = function () {
    var g = this._content;
    if (typeof g == "string") {
      var h = document.createElement("DIV");
      h.innerHTML = g;
      if (h.childNodes.length == 1) {
        g = (h.removeChild(h.firstChild))
      } else {
        var f = document.createDocumentFragment();
        while (h.firstChild) {
          f.appendChild(h.firstChild)
        }
        g = f
      }
    }
    this._container.innerHTML = "";
    this._container.appendChild(g)
  };
  e.prototype.getContent = function () {
    return this._content
  };
  e.prototype.setContent = function (f) {
    if (!f) {
      return
    }
    this._content = f;
    this._appendContent()
  };
  e.prototype._getContainerSize = function () {
    if (!this._container) {
      return
    }
    var g = this._container.offsetHeight;
    var f = this._container.offsetWidth;
    this._size = new BMap.Size(f, g)
  };
  e.prototype.getWidth = function () {
    if (!this._size) {
      return
    }
    return this._size.width
  };
  e.prototype.setWidth = function (f) {
    if (!this._container) {
      return
    }
    this._container.style.width = f + "px";
    this._getContainerSize()
  };
  e.prototype.getHeight = function () {
    if (!this._size) {
      return
    }
    return this._size.height
  };
  e.prototype.setHeight = function (f) {
    if (!this._container) {
      return
    }
    this._container.style.height = f + "px";
    this._getContainerSize()
  };
  e.prototype._setEventDispath = function () {
    var k = this,
      l = k._container,
      g = false,
      i = null;

    function j(p) {
      var p = window.event || p,
        n = p.pageX || p.clientX || 0,
        q = p.pageY || p.clientY || 0,
        o = new BMap.Pixel(n, q),
        m = k._map.pixelToPoint(o);
      return {
        pixel: o,
        point: m
      }
    }
    a.on(l, "onclick", function (m) {
      c(k, "onclick");
      d(m)
    });
    a.on(l, "ontouchend", function (m) {
      c(k, "ontouchend");
      c(k, "onclick");
      d(m)
    });
    a.on(l, "ondblclick", function (n) {
      var m = j(n);
      c(k, "ondblclick", {
        point: m.point,
        pixel: m.pixel
      });
      d(n)
    });
    l.onmouseover = function (n) {
      var m = j(n);
      c(k, "onmouseover", {
        point: m.point,
        pixel: m.pixel
      });
      d(n)
    };
    l.onmouseout = function (n) {
      var m = j(n);
      c(k, "onmouseout", {
        point: m.point,
        pixel: m.pixel
      });
      d(n)
    };
    var h = function (n) {
      var m = j(n);
      c(k, "onmouseup", {
        point: m.point,
        pixel: m.pixel
      });
      if (k._container.releaseCapture) {
        a.un(l, "onmousemove", f);
        a.un(l, "onmouseup", h)
      } else {
        a.un(window, "onmousemove", f);
        a.un(window, "onmouseup", h)
      }
      if (!k._opts.enableDragging) {
        d(n);
        return
      }
      k._container.releaseCapture && k._container.releaseCapture();
      c(k, "ondragend", {
        point: m.point,
        pixel: m.pixel
      });
      g = false;
      i = null;
      k._setCursor("dragend");
      k._container.style.MozUserSelect = "";
      k._container.style.KhtmlUserSelect = "";
      k._container.style.WebkitUserSelect = "";
      k._container.unselectable = "off";
      k._container.onselectstart = function () {};
      d(n)
    };
    var f = function (o) {
      if (!k._opts.enableDragging || !g) {
        return
      }
      var n = j(o);
      var p = k._map.pointToPixel(k._position);
      var m = n.pixel.x - i.x + p.x;
      var q = n.pixel.y - i.y + p.y;
      i = n.pixel;
      k._position = k._map.pixelToPoint(new BMap.Pixel(m, q));
      k.draw();
      k._setCursor("dragging");
      c(k, "ondragging", {
        point: n.point,
        pixel: n.pixel
      });
      d(o)
    };
    a.on(l, "onmousedown", function (n) {
      var m = j(n);
      c(k, "onmousedown", {
        point: m.point,
        pixel: m.pixel
      });
      if (k._container.setCapture) {
        a.on(l, "onmousemove", f);
        a.on(l, "onmouseup", h)
      } else {
        a.on(window, "onmousemove", f);
        a.on(window, "onmouseup", h)
      }
      if (!k._opts.enableDragging) {
        d(n);
        return
      }
      i = m.pixel;
      c(k, "ondragstart", {
        point: m.point,
        pixel: m.pixel
      });
      g = true;
      k._setCursor("dragstart");
      k._container.setCapture && k._container.setCapture();
      k._container.style.MozUserSelect = "none";
      k._container.style.KhtmlUserSelect = "none";
      k._container.style.WebkitUserSelect = "none";
      k._container.unselectable = "on";
      k._container.onselectstart = function () {
        return false
      };
      d(n)
    })
  };
  e.prototype._setCursor = function (f) {
    var h = "";
    var g = {
      moz: {
        dragstart: "-moz-grab",
        dragging: "-moz-grabbing",
        dragend: "pointer"
      },
      other: {
        dragstart: "move",
        dragging: "move",
        dragend: "pointer"
      }
    };
    if (navigator.userAgent.indexOf("Gecko/") !== -1) {
      h = g.moz[f]
    } else {
      h = g.other[f]
    }
    if (this._container.style.cursor != h) {
      this._container.style.cursor = h
    }
  };
  e.prototype.remove = function () {
    c(this, "onremove");
    if (this._container) {
      b(this._container)
    }
    if (this._container && this._container.parentNode) {
      this._container.parentNode.removeChild(this._container)
    }
  };

  function c(f, g, i) {
    g.indexOf("on") != 0 && (g = "on" + g);
    var h = new a.lang.Event(g);
    if (!!i) {
      for (var j in i) {
        h[j] = i[j]
      }
    }
    f.dispatchEvent(h)
  }

  function b(j) {
    if (!j) {
      return
    }
    var g = j.attributes,
      f = "";
    if (g) {
      for (var h = 0, l = g.length; h < l; h++) {
        f = g[h].name;
        if (typeof j[f] === "function") {
          j[f] = null
        }
      }
    }
    var k = j.childnodes;
    if (k) {
      for (var h = 0, l = k.length; h < l; h++) {
        b(j.childnodes[h])
      }
    }
  }

  function d(f) {
    var f = window.event || f;
    f.stopPropagation ? f.stopPropagation() : f.cancelBubble = true;
    return a.preventDefault(f)
  }
})();
