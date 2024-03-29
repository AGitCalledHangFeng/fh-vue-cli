/*
 Highcharts JS v6.1.1 (2018-06-27)

 3D features for Highcharts JS

 @license: www.highcharts.com/license
*/
(function (A) {
  "object" === typeof module && module.exports ? module.exports = A : A(Highcharts)
})(function (A) {
  (function (b) {
    var u = b.deg2rad,
      z = b.pick;
    b.perspective3D = function (b, n, x) {
      n = 0 < x && x < Number.POSITIVE_INFINITY ? x / (b.z + n.z + x) : 1;
      return {
        x: b.x * n,
        y: b.y * n
      }
    };
    b.perspective = function (p, n, x) {
      var y = n.options.chart.options3d,
        m = x ? n.inverted : !1,
        h = {
          x: n.plotWidth / 2,
          y: n.plotHeight / 2,
          z: y.depth / 2,
          vd: z(y.depth, 1) * z(y.viewDistance, 0)
        },
        w = n.scale3d || 1,
        v = u * y.beta * (m ? -1 : 1),
        y = u * y.alpha * (m ? -1 : 1),
        l = Math.cos(y),
        a = Math.cos(-v),
        e = Math.sin(y),
        f = Math.sin(-v);
      x || (h.x += n.plotLeft, h.y += n.plotTop);
      return b.map(p, function (k) {
        var g;
        g = (m ? k.y : k.x) - h.x;
        var d = (m ? k.x : k.y) - h.y;
        k = (k.z || 0) - h.z;
        g = {
          x: a * g - f * k,
          y: -e * f * g + l * d - a * e * k,
          z: l * f * g + e * d + l * a * k
        };
        d = b.perspective3D(g, h, h.vd);
        d.x = d.x * w + h.x;
        d.y = d.y * w + h.y;
        d.z = g.z * w + h.z;
        return {
          x: m ? d.y : d.x,
          y: m ? d.x : d.y,
          z: d.z
        }
      })
    };
    b.pointCameraDistance = function (b, n) {
      var p = n.options.chart.options3d,
        y = n.plotWidth / 2;
      n = n.plotHeight / 2;
      p = z(p.depth, 1) * z(p.viewDistance, 0) + p.depth;
      return Math.sqrt(Math.pow(y - b.plotX, 2) + Math.pow(n - b.plotY,
        2) + Math.pow(p - b.plotZ, 2))
    };
    b.shapeArea = function (b) {
      var n = 0,
        p, y;
      for (p = 0; p < b.length; p++) y = (p + 1) % b.length, n += b[p].x * b[y].y - b[y].x * b[p].y;
      return n / 2
    };
    b.shapeArea3d = function (p, n, x) {
      return b.shapeArea(b.perspective(p, n, x))
    }
  })(A);
  (function (b) {
    function u(a, c, d, b, e, C, k, g) {
      var B = [],
        E = C - e;
      return C > e && C - e > Math.PI / 2 + .0001 ? (B = B.concat(u(a, c, d, b, e, e + Math.PI / 2, k, g)), B = B.concat(u(a, c, d, b, e + Math.PI / 2, C, k, g))) : C < e && e - C > Math.PI / 2 + .0001 ? (B = B.concat(u(a, c, d, b, e, e - Math.PI / 2, k, g)), B = B.concat(u(a, c, d, b, e - Math.PI / 2, C, k, g))) : ["C", a + d * Math.cos(e) - d * t * E * Math.sin(e) + k, c + b * Math.sin(e) + b * t * E * Math.cos(e) + g, a + d * Math.cos(C) + d * t * E * Math.sin(C) + k, c + b * Math.sin(C) - b * t * E * Math.cos(C) + g, a + d * Math.cos(C) + k, c + b * Math.sin(C) + g]
    }
    var z = Math.cos,
      p = Math.PI,
      n = Math.sin,
      x = b.animObject,
      y = b.charts,
      m = b.color,
      h = b.defined,
      w = b.deg2rad,
      v = b.each,
      l = b.extend,
      a = b.inArray,
      e = b.map,
      f = b.merge,
      k = b.perspective,
      g = b.pick,
      d = b.SVGElement,
      c = b.SVGRenderer,
      q = b.wrap,
      t = 4 * (Math.sqrt(2) - 1) / 3 / (p / 2);
    c.prototype.toLinePath = function (a, c) {
      var d = [];
      v(a, function (a) {
        d.push("L", a.x,
          a.y)
      });
      a.length && (d[0] = "M", c && d.push("Z"));
      return d
    };
    c.prototype.toLineSegments = function (a) {
      var c = [],
        d = !0;
      v(a, function (a) {
        c.push(d ? "M" : "L", a.x, a.y);
        d = !d
      });
      return c
    };
    c.prototype.face3d = function (a) {
      var c = this,
        d = this.createElement("path");
      d.vertexes = [];
      d.insidePlotArea = !1;
      d.enabled = !0;
      q(d, "attr", function (a, d) {
        if ("object" === typeof d && (h(d.enabled) || h(d.vertexes) || h(d.insidePlotArea))) {
          this.enabled = g(d.enabled, this.enabled);
          this.vertexes = g(d.vertexes, this.vertexes);
          this.insidePlotArea = g(d.insidePlotArea,
            this.insidePlotArea);
          delete d.enabled;
          delete d.vertexes;
          delete d.insidePlotArea;
          var B = k(this.vertexes, y[c.chartIndex], this.insidePlotArea),
            e = c.toLinePath(B, !0),
            B = b.shapeArea(B),
            B = this.enabled && 0 < B ? "visible" : "hidden";
          d.d = e;
          d.visibility = B
        }
        return a.apply(this, [].slice.call(arguments, 1))
      });
      q(d, "animate", function (a, d) {
        if ("object" === typeof d && (h(d.enabled) || h(d.vertexes) || h(d.insidePlotArea))) {
          this.enabled = g(d.enabled, this.enabled);
          this.vertexes = g(d.vertexes, this.vertexes);
          this.insidePlotArea = g(d.insidePlotArea,
            this.insidePlotArea);
          delete d.enabled;
          delete d.vertexes;
          delete d.insidePlotArea;
          var B = k(this.vertexes, y[c.chartIndex], this.insidePlotArea),
            e = c.toLinePath(B, !0),
            B = b.shapeArea(B),
            B = this.enabled && 0 < B ? "visible" : "hidden";
          d.d = e;
          this.attr("visibility", B)
        }
        return a.apply(this, [].slice.call(arguments, 1))
      });
      return d.attr(a)
    };
    c.prototype.polyhedron = function (a) {
      var d = this,
        c = this.g(),
        b = c.destroy;
      c.attr({
        "stroke-linejoin": "round"
      });
      c.faces = [];
      c.destroy = function () {
        for (var a = 0; a < c.faces.length; a++) c.faces[a].destroy();
        return b.call(this)
      };
      q(c, "attr", function (a, b, e, B, E) {
        if ("object" === typeof b && h(b.faces)) {
          for (; c.faces.length > b.faces.length;) c.faces.pop().destroy();
          for (; c.faces.length < b.faces.length;) c.faces.push(d.face3d().add(c));
          for (var r = 0; r < b.faces.length; r++) c.faces[r].attr(b.faces[r], null, B, E);
          delete b.faces
        }
        return a.apply(this, [].slice.call(arguments, 1))
      });
      q(c, "animate", function (a, b, e, B) {
        if (b && b.faces) {
          for (; c.faces.length > b.faces.length;) c.faces.pop().destroy();
          for (; c.faces.length < b.faces.length;) c.faces.push(d.face3d().add(c));
          for (var E = 0; E < b.faces.length; E++) c.faces[E].animate(b.faces[E], e, B);
          delete b.faces
        }
        return a.apply(this, [].slice.call(arguments, 1))
      });
      return c.attr(a)
    };
    c.prototype.cuboid = function (a) {
      var c = this.g(),
        b = c.destroy;
      a = this.cuboidPath(a);
      c.attr({
        "stroke-linejoin": "round"
      });
      c.front = this.path(a[0]).attr({
        "class": "highcharts-3d-front"
      }).add(c);
      c.top = this.path(a[1]).attr({
        "class": "highcharts-3d-top"
      }).add(c);
      c.side = this.path(a[2]).attr({
        "class": "highcharts-3d-side"
      }).add(c);
      c.fillSetter = function (a) {
        this.front.attr({
          fill: a
        });
        this.top.attr({
          fill: m(a).brighten(.1).get()
        });
        this.side.attr({
          fill: m(a).brighten(-.1).get()
        });
        this.color = a;
        c.fill = a;
        return this
      };
      c.opacitySetter = function (a) {
        this.front.attr({
          opacity: a
        });
        this.top.attr({
          opacity: a
        });
        this.side.attr({
          opacity: a
        });
        return this
      };
      c.attr = function (a, c, b, e) {
        if ("string" === typeof a && "undefined" !== typeof c) {
          var B = a;
          a = {};
          a[B] = c
        }
        if (a.shapeArgs || h(a.x)) a = this.renderer.cuboidPath(a.shapeArgs || a), this.front.attr({
          d: a[0]
        }), this.top.attr({
          d: a[1]
        }), this.side.attr({
          d: a[2]
        });
        else return d.prototype.attr.call(this,
          a, void 0, b, e);
        return this
      };
      c.animate = function (a, c, b) {
        h(a.x) && h(a.y) ? (a = this.renderer.cuboidPath(a), this.front.animate({
          d: a[0]
        }, c, b), this.top.animate({
          d: a[1]
        }, c, b), this.side.animate({
          d: a[2]
        }, c, b), this.attr({
          zIndex: -a[3]
        })) : a.opacity ? (this.front.animate(a, c, b), this.top.animate(a, c, b), this.side.animate(a, c, b)) : d.prototype.animate.call(this, a, c, b);
        return this
      };
      c.destroy = function () {
        this.front.destroy();
        this.top.destroy();
        this.side.destroy();
        return b.call(this)
      };
      c.attr({
        zIndex: -a[3]
      });
      return c
    };
    b.SVGRenderer.prototype.cuboidPath =
      function (a) {
        function c(a) {
          return h[a]
        }
        var d = a.x,
          g = a.y,
          r = a.z,
          t = a.height,
          l = a.width,
          f = a.depth,
          q = y[this.chartIndex],
          v, m, n = q.options.chart.options3d.alpha,
          p = 0,
          h = [{
            x: d,
            y: g,
            z: r
          }, {
            x: d + l,
            y: g,
            z: r
          }, {
            x: d + l,
            y: g + t,
            z: r
          }, {
            x: d,
            y: g + t,
            z: r
          }, {
            x: d,
            y: g + t,
            z: r + f
          }, {
            x: d + l,
            y: g + t,
            z: r + f
          }, {
            x: d + l,
            y: g,
            z: r + f
          }, {
            x: d,
            y: g,
            z: r + f
          }],
          h = k(h, q, a.insidePlotArea);
        m = function (a, d) {
          var g = [
            [], -1
          ];
          a = e(a, c);
          d = e(d, c);
          0 > b.shapeArea(a) ? g = [a, 0] : 0 > b.shapeArea(d) && (g = [d, 1]);
          return g
        };
        v = m([3, 2, 1, 0], [7, 6, 5, 4]);
        a = v[0];
        l = v[1];
        v = m([1, 6, 7, 0], [4, 5, 2, 3]);
        t = v[0];
        f = v[1];
        v = m([1, 2, 5, 6], [0, 7, 4, 3]);
        m = v[0];
        v = v[1];
        1 === v ? p += 1E4 * (1E3 - d) : v || (p += 1E4 * d);
        p += 10 * (!f || 0 <= n && 180 >= n || 360 > n && 357.5 < n ? q.plotHeight - g : 10 + g);
        1 === l ? p += 100 * r : l || (p += 100 * (1E3 - r));
        p = -Math.round(p);
        return [this.toLinePath(a, !0), this.toLinePath(t, !0), this.toLinePath(m, !0), p]
      };
    b.SVGRenderer.prototype.arc3d = function (c) {
      function b(c) {
        var d = !1,
          b = {};
        c = f(c);
        for (var e in c) - 1 !== a(e, t) && (b[e] = c[e], delete c[e], d = !0);
        return d ? b : !1
      }
      var e = this.g(),
        k = e.renderer,
        t = "x y r innerR start end".split(" ");
      c = f(c);
      c.alpha *=
        w;
      c.beta *= w;
      e.top = k.path();
      e.side1 = k.path();
      e.side2 = k.path();
      e.inn = k.path();
      e.out = k.path();
      e.onAdd = function () {
        var a = e.parentGroup,
          c = e.attr("class");
        e.top.add(e);
        v(["out", "inn", "side1", "side2"], function (d) {
          e[d].attr({
            "class": c + " highcharts-3d-side"
          }).add(a)
        })
      };
      v(["addClass", "removeClass"], function (a) {
        e[a] = function () {
          var c = arguments;
          v(["top", "out", "inn", "side1", "side2"], function (d) {
            e[d][a].apply(e[d], c)
          })
        }
      });
      e.setPaths = function (a) {
        var c = e.renderer.arc3dPath(a),
          d = 100 * c.zTop;
        e.attribs = a;
        e.top.attr({
          d: c.top,
          zIndex: c.zTop
        });
        e.inn.attr({
          d: c.inn,
          zIndex: c.zInn
        });
        e.out.attr({
          d: c.out,
          zIndex: c.zOut
        });
        e.side1.attr({
          d: c.side1,
          zIndex: c.zSide1
        });
        e.side2.attr({
          d: c.side2,
          zIndex: c.zSide2
        });
        e.zIndex = d;
        e.attr({
          zIndex: d
        });
        a.center && (e.top.setRadialReference(a.center), delete a.center)
      };
      e.setPaths(c);
      e.fillSetter = function (a) {
        var c = m(a).brighten(-.1).get();
        this.fill = a;
        this.side1.attr({
          fill: c
        });
        this.side2.attr({
          fill: c
        });
        this.inn.attr({
          fill: c
        });
        this.out.attr({
          fill: c
        });
        this.top.attr({
          fill: a
        });
        return this
      };
      v(["opacity", "translateX",
        "translateY", "visibility"
      ], function (a) {
        e[a + "Setter"] = function (a, c) {
          e[c] = a;
          v(["out", "inn", "side1", "side2", "top"], function (d) {
            e[d].attr(c, a)
          })
        }
      });
      q(e, "attr", function (a, c) {
        var d;
        "object" === typeof c && (d = b(c)) && (l(e.attribs, d), e.setPaths(e.attribs));
        return a.apply(this, [].slice.call(arguments, 1))
      });
      q(e, "animate", function (a, c, d, k) {
        var t, l = this.attribs,
          r;
        delete c.center;
        delete c.z;
        delete c.depth;
        delete c.alpha;
        delete c.beta;
        r = x(g(d, this.renderer.globalAnimation));
        r.duration && (t = b(c), c.dummy = e.dummy++, t &&
          (r.step = function (a, c) {
            function d(a) {
              return l[a] + (g(t[a], l[a]) - l[a]) * c.pos
            }
            "dummy" === c.prop && c.elem.setPaths(f(l, {
              x: d("x"),
              y: d("y"),
              r: d("r"),
              innerR: d("innerR"),
              start: d("start"),
              end: d("end")
            }))
          }), d = r);
        return a.call(this, c, d, k)
      });
      e.dummy = 0;
      e.destroy = function () {
        this.top.destroy();
        this.out.destroy();
        this.inn.destroy();
        this.side1.destroy();
        this.side2.destroy();
        d.prototype.destroy.call(this)
      };
      e.hide = function () {
        this.top.hide();
        this.out.hide();
        this.inn.hide();
        this.side1.hide();
        this.side2.hide()
      };
      e.show = function () {
        this.top.show();
        this.out.show();
        this.inn.show();
        this.side1.show();
        this.side2.show()
      };
      return e
    };
    c.prototype.arc3dPath = function (a) {
      function c(a) {
        a %= 2 * Math.PI;
        a > Math.PI && (a = 2 * Math.PI - a);
        return a
      }
      var d = a.x,
        e = a.y,
        b = a.start,
        g = a.end - .00001,
        k = a.r,
        t = a.innerR,
        l = a.depth,
        f = a.alpha,
        r = a.beta,
        q = Math.cos(b),
        v = Math.sin(b);
      a = Math.cos(g);
      var m = Math.sin(g),
        h = k * Math.cos(r),
        k = k * Math.cos(f),
        y = t * Math.cos(r),
        x = t * Math.cos(f),
        t = l * Math.sin(r),
        w = l * Math.sin(f),
        l = ["M", d + h * q, e + k * v],
        l = l.concat(u(d, e, h, k, b, g, 0, 0)),
        l = l.concat(["L", d + y * a, e + x * m]),
        l =
        l.concat(u(d, e, y, x, g, b, 0, 0)),
        l = l.concat(["Z"]),
        A = 0 < r ? Math.PI / 2 : 0,
        r = 0 < f ? 0 : Math.PI / 2,
        A = b > -A ? b : g > -A ? -A : b,
        D = g < p - r ? g : b < p - r ? p - r : g,
        F = 2 * p - r,
        f = ["M", d + h * z(A), e + k * n(A)],
        f = f.concat(u(d, e, h, k, A, D, 0, 0));
      g > F && b < F ? (f = f.concat(["L", d + h * z(D) + t, e + k * n(D) + w]), f = f.concat(u(d, e, h, k, D, F, t, w)), f = f.concat(["L", d + h * z(F), e + k * n(F)]), f = f.concat(u(d, e, h, k, F, g, 0, 0)), f = f.concat(["L", d + h * z(g) + t, e + k * n(g) + w]), f = f.concat(u(d, e, h, k, g, F, t, w)), f = f.concat(["L", d + h * z(F), e + k * n(F)]), f = f.concat(u(d, e, h, k, F, D, 0, 0))) : g > p - r && b < p - r && (f = f.concat(["L",
        d + h * Math.cos(D) + t, e + k * Math.sin(D) + w
      ]), f = f.concat(u(d, e, h, k, D, g, t, w)), f = f.concat(["L", d + h * Math.cos(g), e + k * Math.sin(g)]), f = f.concat(u(d, e, h, k, g, D, 0, 0)));
      f = f.concat(["L", d + h * Math.cos(D) + t, e + k * Math.sin(D) + w]);
      f = f.concat(u(d, e, h, k, D, A, t, w));
      f = f.concat(["Z"]);
      r = ["M", d + y * q, e + x * v];
      r = r.concat(u(d, e, y, x, b, g, 0, 0));
      r = r.concat(["L", d + y * Math.cos(g) + t, e + x * Math.sin(g) + w]);
      r = r.concat(u(d, e, y, x, g, b, t, w));
      r = r.concat(["Z"]);
      q = ["M", d + h * q, e + k * v, "L", d + h * q + t, e + k * v + w, "L", d + y * q + t, e + x * v + w, "L", d + y * q, e + x * v, "Z"];
      d = ["M", d + h * a,
        e + k * m, "L", d + h * a + t, e + k * m + w, "L", d + y * a + t, e + x * m + w, "L", d + y * a, e + x * m, "Z"
      ];
      m = Math.atan2(w, -t);
      e = Math.abs(g + m);
      a = Math.abs(b + m);
      b = Math.abs((b + g) / 2 + m);
      e = c(e);
      a = c(a);
      b = c(b);
      b *= 1E5;
      g = 1E5 * a;
      e *= 1E5;
      return {
        top: l,
        zTop: 1E5 * Math.PI + 1,
        out: f,
        zOut: Math.max(b, g, e),
        inn: r,
        zInn: Math.max(b, g, e),
        side1: q,
        zSide1: .99 * e,
        side2: d,
        zSide2: .99 * g
      }
    }
  })(A);
  (function (b) {
    function u(b, l) {
      var a = b.plotLeft,
        e = b.plotWidth + a,
        f = b.plotTop,
        k = b.plotHeight + f,
        g = a + b.plotWidth / 2,
        d = f + b.plotHeight / 2,
        c = Number.MAX_VALUE,
        q = -Number.MAX_VALUE,
        t = Number.MAX_VALUE,
        r = -Number.MAX_VALUE,
        v, m = 1;
      v = [{
        x: a,
        y: f,
        z: 0
      }, {
        x: a,
        y: f,
        z: l
      }];
      n([0, 1], function (a) {
        v.push({
          x: e,
          y: v[a].y,
          z: v[a].z
        })
      });
      n([0, 1, 2, 3], function (a) {
        v.push({
          x: v[a].x,
          y: k,
          z: v[a].z
        })
      });
      v = y(v, b, !1);
      n(v, function (a) {
        c = Math.min(c, a.x);
        q = Math.max(q, a.x);
        t = Math.min(t, a.y);
        r = Math.max(r, a.y)
      });
      a > c && (m = Math.min(m, 1 - Math.abs((a + g) / (c + g)) % 1));
      e < q && (m = Math.min(m, (e - g) / (q - g)));
      f > t && (m = 0 > t ? Math.min(m, (f + d) / (-t + f + d)) : Math.min(m, 1 - (f + d) / (t + d) % 1));
      k < r && (m = Math.min(m, Math.abs((k - d) / (r - d))));
      return m
    }
    var z = b.addEvent,
      p = b.Chart,
      n =
      b.each,
      x = b.merge,
      y = b.perspective,
      m = b.pick,
      h = b.wrap;
    p.prototype.is3d = function () {
      return this.options.chart.options3d && this.options.chart.options3d.enabled
    };
    p.prototype.propsRequireDirtyBox.push("chart.options3d");
    p.prototype.propsRequireUpdateSeries.push("chart.options3d");
    z(p, "afterInit", function () {
      var b = this.options;
      this.is3d() && n(b.series, function (l) {
        "scatter" === (l.type || b.chart.type || b.chart.defaultSeriesType) && (l.type = "scatter3d")
      })
    });
    z(p, "addSeries", function (b) {
      this.is3d() && "scatter" === b.options.type &&
        (b.options.type = "scatter3d")
    });
    b.wrap(b.Chart.prototype, "isInsidePlot", function (b) {
      return this.is3d() || b.apply(this, [].slice.call(arguments, 1))
    });
    var w = b.getOptions();
    x(!0, w, {
      chart: {
        options3d: {
          enabled: !1,
          alpha: 0,
          beta: 0,
          depth: 100,
          fitToPlot: !0,
          viewDistance: 25,
          axisLabelPosition: "default",
          frame: {
            visible: "default",
            size: 1,
            bottom: {},
            top: {},
            left: {},
            right: {},
            back: {},
            front: {}
          }
        }
      }
    });
    h(p.prototype, "setClassName", function (b) {
      b.apply(this, [].slice.call(arguments, 1));
      this.is3d() && (this.container.className += " highcharts-3d-chart")
    });
    z(b.Chart, "afterSetChartSize", function () {
      var b = this.options.chart.options3d;
      if (this.is3d()) {
        var l = this.inverted,
          a = this.clipBox,
          e = this.margin;
        a[l ? "y" : "x"] = -(e[3] || 0);
        a[l ? "x" : "y"] = -(e[0] || 0);
        a[l ? "height" : "width"] = this.chartWidth + (e[3] || 0) + (e[1] || 0);
        a[l ? "width" : "height"] = this.chartHeight + (e[0] || 0) + (e[2] || 0);
        this.scale3d = 1;
        !0 === b.fitToPlot && (this.scale3d = u(this, b.depth));
        this.frame3d = this.get3dFrame()
      }
    });
    z(p, "beforeRedraw", function () {
      this.is3d() && (this.isDirtyBox = !0)
    });
    z(p, "beforeRender", function () {
      this.is3d() &&
        (this.frame3d = this.get3dFrame())
    });
    h(p.prototype, "renderSeries", function (b) {
      var l = this.series.length;
      if (this.is3d())
        for (; l--;) b = this.series[l], b.translate(), b.render();
      else b.call(this)
    });
    z(p, "afterDrawChartBox", function () {
      if (this.is3d()) {
        var m = this.renderer,
          l = this.options.chart.options3d,
          a = this.get3dFrame(),
          e = this.plotLeft,
          f = this.plotLeft + this.plotWidth,
          k = this.plotTop,
          g = this.plotTop + this.plotHeight,
          l = l.depth,
          d = e - (a.left.visible ? a.left.size : 0),
          c = f + (a.right.visible ? a.right.size : 0),
          q = k - (a.top.visible ?
            a.top.size : 0),
          t = g + (a.bottom.visible ? a.bottom.size : 0),
          r = 0 - (a.front.visible ? a.front.size : 0),
          h = l + (a.back.visible ? a.back.size : 0),
          n = this.hasRendered ? "animate" : "attr";
        this.frame3d = a;
        this.frameShapes || (this.frameShapes = {
          bottom: m.polyhedron().add(),
          top: m.polyhedron().add(),
          left: m.polyhedron().add(),
          right: m.polyhedron().add(),
          back: m.polyhedron().add(),
          front: m.polyhedron().add()
        });
        this.frameShapes.bottom[n]({
          "class": "highcharts-3d-frame highcharts-3d-frame-bottom",
          zIndex: a.bottom.frontFacing ? -1E3 : 1E3,
          faces: [{
            fill: b.color(a.bottom.color).brighten(.1).get(),
            vertexes: [{
              x: d,
              y: t,
              z: r
            }, {
              x: c,
              y: t,
              z: r
            }, {
              x: c,
              y: t,
              z: h
            }, {
              x: d,
              y: t,
              z: h
            }],
            enabled: a.bottom.visible
          }, {
            fill: b.color(a.bottom.color).brighten(.1).get(),
            vertexes: [{
              x: e,
              y: g,
              z: l
            }, {
              x: f,
              y: g,
              z: l
            }, {
              x: f,
              y: g,
              z: 0
            }, {
              x: e,
              y: g,
              z: 0
            }],
            enabled: a.bottom.visible
          }, {
            fill: b.color(a.bottom.color).brighten(-.1).get(),
            vertexes: [{
              x: d,
              y: t,
              z: r
            }, {
              x: d,
              y: t,
              z: h
            }, {
              x: e,
              y: g,
              z: l
            }, {
              x: e,
              y: g,
              z: 0
            }],
            enabled: a.bottom.visible && !a.left.visible
          }, {
            fill: b.color(a.bottom.color).brighten(-.1).get(),
            vertexes: [{
              x: c,
              y: t,
              z: h
            }, {
              x: c,
              y: t,
              z: r
            }, {
              x: f,
              y: g,
              z: 0
            }, {
              x: f,
              y: g,
              z: l
            }],
            enabled: a.bottom.visible && !a.right.visible
          }, {
            fill: b.color(a.bottom.color).get(),
            vertexes: [{
              x: c,
              y: t,
              z: r
            }, {
              x: d,
              y: t,
              z: r
            }, {
              x: e,
              y: g,
              z: 0
            }, {
              x: f,
              y: g,
              z: 0
            }],
            enabled: a.bottom.visible && !a.front.visible
          }, {
            fill: b.color(a.bottom.color).get(),
            vertexes: [{
              x: d,
              y: t,
              z: h
            }, {
              x: c,
              y: t,
              z: h
            }, {
              x: f,
              y: g,
              z: l
            }, {
              x: e,
              y: g,
              z: l
            }],
            enabled: a.bottom.visible && !a.back.visible
          }]
        });
        this.frameShapes.top[n]({
          "class": "highcharts-3d-frame highcharts-3d-frame-top",
          zIndex: a.top.frontFacing ? -1E3 : 1E3,
          faces: [{
            fill: b.color(a.top.color).brighten(.1).get(),
            vertexes: [{
              x: d,
              y: q,
              z: h
            }, {
              x: c,
              y: q,
              z: h
            }, {
              x: c,
              y: q,
              z: r
            }, {
              x: d,
              y: q,
              z: r
            }],
            enabled: a.top.visible
          }, {
            fill: b.color(a.top.color).brighten(.1).get(),
            vertexes: [{
              x: e,
              y: k,
              z: 0
            }, {
              x: f,
              y: k,
              z: 0
            }, {
              x: f,
              y: k,
              z: l
            }, {
              x: e,
              y: k,
              z: l
            }],
            enabled: a.top.visible
          }, {
            fill: b.color(a.top.color).brighten(-.1).get(),
            vertexes: [{
              x: d,
              y: q,
              z: h
            }, {
              x: d,
              y: q,
              z: r
            }, {
              x: e,
              y: k,
              z: 0
            }, {
              x: e,
              y: k,
              z: l
            }],
            enabled: a.top.visible && !a.left.visible
          }, {
            fill: b.color(a.top.color).brighten(-.1).get(),
            vertexes: [{
              x: c,
              y: q,
              z: r
            }, {
              x: c,
              y: q,
              z: h
            }, {
              x: f,
              y: k,
              z: l
            }, {
              x: f,
              y: k,
              z: 0
            }],
            enabled: a.top.visible &&
              !a.right.visible
          }, {
            fill: b.color(a.top.color).get(),
            vertexes: [{
              x: d,
              y: q,
              z: r
            }, {
              x: c,
              y: q,
              z: r
            }, {
              x: f,
              y: k,
              z: 0
            }, {
              x: e,
              y: k,
              z: 0
            }],
            enabled: a.top.visible && !a.front.visible
          }, {
            fill: b.color(a.top.color).get(),
            vertexes: [{
              x: c,
              y: q,
              z: h
            }, {
              x: d,
              y: q,
              z: h
            }, {
              x: e,
              y: k,
              z: l
            }, {
              x: f,
              y: k,
              z: l
            }],
            enabled: a.top.visible && !a.back.visible
          }]
        });
        this.frameShapes.left[n]({
          "class": "highcharts-3d-frame highcharts-3d-frame-left",
          zIndex: a.left.frontFacing ? -1E3 : 1E3,
          faces: [{
              fill: b.color(a.left.color).brighten(.1).get(),
              vertexes: [{
                x: d,
                y: t,
                z: r
              }, {
                x: e,
                y: g,
                z: 0
              }, {
                x: e,
                y: g,
                z: l
              }, {
                x: d,
                y: t,
                z: h
              }],
              enabled: a.left.visible && !a.bottom.visible
            }, {
              fill: b.color(a.left.color).brighten(.1).get(),
              vertexes: [{
                x: d,
                y: q,
                z: h
              }, {
                x: e,
                y: k,
                z: l
              }, {
                x: e,
                y: k,
                z: 0
              }, {
                x: d,
                y: q,
                z: r
              }],
              enabled: a.left.visible && !a.top.visible
            }, {
              fill: b.color(a.left.color).brighten(-.1).get(),
              vertexes: [{
                x: d,
                y: t,
                z: h
              }, {
                x: d,
                y: q,
                z: h
              }, {
                x: d,
                y: q,
                z: r
              }, {
                x: d,
                y: t,
                z: r
              }],
              enabled: a.left.visible
            }, {
              fill: b.color(a.left.color).brighten(-.1).get(),
              vertexes: [{
                x: e,
                y: k,
                z: l
              }, {
                x: e,
                y: g,
                z: l
              }, {
                x: e,
                y: g,
                z: 0
              }, {
                x: e,
                y: k,
                z: 0
              }],
              enabled: a.left.visible
            },
            {
              fill: b.color(a.left.color).get(),
              vertexes: [{
                x: d,
                y: t,
                z: r
              }, {
                x: d,
                y: q,
                z: r
              }, {
                x: e,
                y: k,
                z: 0
              }, {
                x: e,
                y: g,
                z: 0
              }],
              enabled: a.left.visible && !a.front.visible
            }, {
              fill: b.color(a.left.color).get(),
              vertexes: [{
                x: d,
                y: q,
                z: h
              }, {
                x: d,
                y: t,
                z: h
              }, {
                x: e,
                y: g,
                z: l
              }, {
                x: e,
                y: k,
                z: l
              }],
              enabled: a.left.visible && !a.back.visible
            }
          ]
        });
        this.frameShapes.right[n]({
          "class": "highcharts-3d-frame highcharts-3d-frame-right",
          zIndex: a.right.frontFacing ? -1E3 : 1E3,
          faces: [{
              fill: b.color(a.right.color).brighten(.1).get(),
              vertexes: [{
                x: c,
                y: t,
                z: h
              }, {
                x: f,
                y: g,
                z: l
              }, {
                x: f,
                y: g,
                z: 0
              }, {
                x: c,
                y: t,
                z: r
              }],
              enabled: a.right.visible && !a.bottom.visible
            }, {
              fill: b.color(a.right.color).brighten(.1).get(),
              vertexes: [{
                x: c,
                y: q,
                z: r
              }, {
                x: f,
                y: k,
                z: 0
              }, {
                x: f,
                y: k,
                z: l
              }, {
                x: c,
                y: q,
                z: h
              }],
              enabled: a.right.visible && !a.top.visible
            }, {
              fill: b.color(a.right.color).brighten(-.1).get(),
              vertexes: [{
                x: f,
                y: k,
                z: 0
              }, {
                x: f,
                y: g,
                z: 0
              }, {
                x: f,
                y: g,
                z: l
              }, {
                x: f,
                y: k,
                z: l
              }],
              enabled: a.right.visible
            }, {
              fill: b.color(a.right.color).brighten(-.1).get(),
              vertexes: [{
                x: c,
                y: t,
                z: r
              }, {
                x: c,
                y: q,
                z: r
              }, {
                x: c,
                y: q,
                z: h
              }, {
                x: c,
                y: t,
                z: h
              }],
              enabled: a.right.visible
            },
            {
              fill: b.color(a.right.color).get(),
              vertexes: [{
                x: c,
                y: q,
                z: r
              }, {
                x: c,
                y: t,
                z: r
              }, {
                x: f,
                y: g,
                z: 0
              }, {
                x: f,
                y: k,
                z: 0
              }],
              enabled: a.right.visible && !a.front.visible
            }, {
              fill: b.color(a.right.color).get(),
              vertexes: [{
                x: c,
                y: t,
                z: h
              }, {
                x: c,
                y: q,
                z: h
              }, {
                x: f,
                y: k,
                z: l
              }, {
                x: f,
                y: g,
                z: l
              }],
              enabled: a.right.visible && !a.back.visible
            }
          ]
        });
        this.frameShapes.back[n]({
          "class": "highcharts-3d-frame highcharts-3d-frame-back",
          zIndex: a.back.frontFacing ? -1E3 : 1E3,
          faces: [{
            fill: b.color(a.back.color).brighten(.1).get(),
            vertexes: [{
              x: c,
              y: t,
              z: h
            }, {
              x: d,
              y: t,
              z: h
            }, {
              x: e,
              y: g,
              z: l
            }, {
              x: f,
              y: g,
              z: l
            }],
            enabled: a.back.visible && !a.bottom.visible
          }, {
            fill: b.color(a.back.color).brighten(.1).get(),
            vertexes: [{
              x: d,
              y: q,
              z: h
            }, {
              x: c,
              y: q,
              z: h
            }, {
              x: f,
              y: k,
              z: l
            }, {
              x: e,
              y: k,
              z: l
            }],
            enabled: a.back.visible && !a.top.visible
          }, {
            fill: b.color(a.back.color).brighten(-.1).get(),
            vertexes: [{
              x: d,
              y: t,
              z: h
            }, {
              x: d,
              y: q,
              z: h
            }, {
              x: e,
              y: k,
              z: l
            }, {
              x: e,
              y: g,
              z: l
            }],
            enabled: a.back.visible && !a.left.visible
          }, {
            fill: b.color(a.back.color).brighten(-.1).get(),
            vertexes: [{
              x: c,
              y: q,
              z: h
            }, {
              x: c,
              y: t,
              z: h
            }, {
              x: f,
              y: g,
              z: l
            }, {
              x: f,
              y: k,
              z: l
            }],
            enabled: a.back.visible &&
              !a.right.visible
          }, {
            fill: b.color(a.back.color).get(),
            vertexes: [{
              x: e,
              y: k,
              z: l
            }, {
              x: f,
              y: k,
              z: l
            }, {
              x: f,
              y: g,
              z: l
            }, {
              x: e,
              y: g,
              z: l
            }],
            enabled: a.back.visible
          }, {
            fill: b.color(a.back.color).get(),
            vertexes: [{
              x: d,
              y: t,
              z: h
            }, {
              x: c,
              y: t,
              z: h
            }, {
              x: c,
              y: q,
              z: h
            }, {
              x: d,
              y: q,
              z: h
            }],
            enabled: a.back.visible
          }]
        });
        this.frameShapes.front[n]({
          "class": "highcharts-3d-frame highcharts-3d-frame-front",
          zIndex: a.front.frontFacing ? -1E3 : 1E3,
          faces: [{
            fill: b.color(a.front.color).brighten(.1).get(),
            vertexes: [{
              x: d,
              y: t,
              z: r
            }, {
              x: c,
              y: t,
              z: r
            }, {
              x: f,
              y: g,
              z: 0
            }, {
              x: e,
              y: g,
              z: 0
            }],
            enabled: a.front.visible && !a.bottom.visible
          }, {
            fill: b.color(a.front.color).brighten(.1).get(),
            vertexes: [{
              x: c,
              y: q,
              z: r
            }, {
              x: d,
              y: q,
              z: r
            }, {
              x: e,
              y: k,
              z: 0
            }, {
              x: f,
              y: k,
              z: 0
            }],
            enabled: a.front.visible && !a.top.visible
          }, {
            fill: b.color(a.front.color).brighten(-.1).get(),
            vertexes: [{
              x: d,
              y: q,
              z: r
            }, {
              x: d,
              y: t,
              z: r
            }, {
              x: e,
              y: g,
              z: 0
            }, {
              x: e,
              y: k,
              z: 0
            }],
            enabled: a.front.visible && !a.left.visible
          }, {
            fill: b.color(a.front.color).brighten(-.1).get(),
            vertexes: [{
              x: c,
              y: t,
              z: r
            }, {
              x: c,
              y: q,
              z: r
            }, {
              x: f,
              y: k,
              z: 0
            }, {
              x: f,
              y: g,
              z: 0
            }],
            enabled: a.front.visible &&
              !a.right.visible
          }, {
            fill: b.color(a.front.color).get(),
            vertexes: [{
              x: f,
              y: k,
              z: 0
            }, {
              x: e,
              y: k,
              z: 0
            }, {
              x: e,
              y: g,
              z: 0
            }, {
              x: f,
              y: g,
              z: 0
            }],
            enabled: a.front.visible
          }, {
            fill: b.color(a.front.color).get(),
            vertexes: [{
              x: c,
              y: t,
              z: r
            }, {
              x: d,
              y: t,
              z: r
            }, {
              x: d,
              y: q,
              z: r
            }, {
              x: c,
              y: q,
              z: r
            }],
            enabled: a.front.visible
          }]
        })
      }
    });
    p.prototype.retrieveStacks = function (b) {
      var l = this.series,
        a = {},
        e, f = 1;
      n(this.series, function (k) {
        e = m(k.options.stack, b ? 0 : l.length - 1 - k.index);
        a[e] ? a[e].series.push(k) : (a[e] = {
          series: [k],
          position: f
        }, f++)
      });
      a.totalStacks = f + 1;
      return a
    };
    p.prototype.get3dFrame = function () {
      var h = this,
        l = h.options.chart.options3d,
        a = l.frame,
        e = h.plotLeft,
        f = h.plotLeft + h.plotWidth,
        k = h.plotTop,
        g = h.plotTop + h.plotHeight,
        d = l.depth,
        c = function (a) {
          a = b.shapeArea3d(a, h);
          return .5 < a ? 1 : -.5 > a ? -1 : 0
        },
        q = c([{
          x: e,
          y: g,
          z: d
        }, {
          x: f,
          y: g,
          z: d
        }, {
          x: f,
          y: g,
          z: 0
        }, {
          x: e,
          y: g,
          z: 0
        }]),
        t = c([{
          x: e,
          y: k,
          z: 0
        }, {
          x: f,
          y: k,
          z: 0
        }, {
          x: f,
          y: k,
          z: d
        }, {
          x: e,
          y: k,
          z: d
        }]),
        r = c([{
          x: e,
          y: k,
          z: 0
        }, {
          x: e,
          y: k,
          z: d
        }, {
          x: e,
          y: g,
          z: d
        }, {
          x: e,
          y: g,
          z: 0
        }]),
        p = c([{
          x: f,
          y: k,
          z: d
        }, {
          x: f,
          y: k,
          z: 0
        }, {
          x: f,
          y: g,
          z: 0
        }, {
          x: f,
          y: g,
          z: d
        }]),
        x = c([{
          x: e,
          y: g,
          z: 0
        }, {
          x: f,
          y: g,
          z: 0
        }, {
          x: f,
          y: k,
          z: 0
        }, {
          x: e,
          y: k,
          z: 0
        }]),
        c = c([{
          x: e,
          y: k,
          z: d
        }, {
          x: f,
          y: k,
          z: d
        }, {
          x: f,
          y: g,
          z: d
        }, {
          x: e,
          y: g,
          z: d
        }]),
        w = !1,
        G = !1,
        u = !1,
        z = !1;
      n([].concat(h.xAxis, h.yAxis, h.zAxis), function (a) {
        a && (a.horiz ? a.opposite ? G = !0 : w = !0 : a.opposite ? z = !0 : u = !0)
      });
      var A = function (a, c, d) {
          for (var b = ["size", "color", "visible"], e = {}, g = 0; g < b.length; g++)
            for (var k = b[g], f = 0; f < a.length; f++)
              if ("object" === typeof a[f]) {
                var t = a[f][k];
                if (void 0 !== t && null !== t) {
                  e[k] = t;
                  break
                }
              }
          a = d;
          !0 === e.visible || !1 === e.visible ? a = e.visible : "auto" === e.visible && (a = 0 < c);
          return {
            size: m(e.size,
              1),
            color: m(e.color, "none"),
            frontFacing: 0 < c,
            visible: a
          }
        },
        a = {
          bottom: A([a.bottom, a.top, a], q, w),
          top: A([a.top, a.bottom, a], t, G),
          left: A([a.left, a.right, a.side, a], r, u),
          right: A([a.right, a.left, a.side, a], p, z),
          back: A([a.back, a.front, a], c, !0),
          front: A([a.front, a.back, a], x, !1)
        };
      "auto" === l.axisLabelPosition ? (p = function (a, c) {
        return a.visible !== c.visible || a.visible && c.visible && a.frontFacing !== c.frontFacing
      }, l = [], p(a.left, a.front) && l.push({
        y: (k + g) / 2,
        x: e,
        z: 0,
        xDir: {
          x: 1,
          y: 0,
          z: 0
        }
      }), p(a.left, a.back) && l.push({
        y: (k + g) / 2,
        x: e,
        z: d,
        xDir: {
          x: 0,
          y: 0,
          z: -1
        }
      }), p(a.right, a.front) && l.push({
        y: (k + g) / 2,
        x: f,
        z: 0,
        xDir: {
          x: 0,
          y: 0,
          z: 1
        }
      }), p(a.right, a.back) && l.push({
        y: (k + g) / 2,
        x: f,
        z: d,
        xDir: {
          x: -1,
          y: 0,
          z: 0
        }
      }), q = [], p(a.bottom, a.front) && q.push({
        x: (e + f) / 2,
        y: g,
        z: 0,
        xDir: {
          x: 1,
          y: 0,
          z: 0
        }
      }), p(a.bottom, a.back) && q.push({
        x: (e + f) / 2,
        y: g,
        z: d,
        xDir: {
          x: -1,
          y: 0,
          z: 0
        }
      }), t = [], p(a.top, a.front) && t.push({
        x: (e + f) / 2,
        y: k,
        z: 0,
        xDir: {
          x: 1,
          y: 0,
          z: 0
        }
      }), p(a.top, a.back) && t.push({
        x: (e + f) / 2,
        y: k,
        z: d,
        xDir: {
          x: -1,
          y: 0,
          z: 0
        }
      }), r = [], p(a.bottom, a.left) && r.push({
        z: (0 + d) / 2,
        y: g,
        x: e,
        xDir: {
          x: 0,
          y: 0,
          z: -1
        }
      }), p(a.bottom, a.right) && r.push({
        z: (0 + d) / 2,
        y: g,
        x: f,
        xDir: {
          x: 0,
          y: 0,
          z: 1
        }
      }), g = [], p(a.top, a.left) && g.push({
        z: (0 + d) / 2,
        y: k,
        x: e,
        xDir: {
          x: 0,
          y: 0,
          z: -1
        }
      }), p(a.top, a.right) && g.push({
        z: (0 + d) / 2,
        y: k,
        x: f,
        xDir: {
          x: 0,
          y: 0,
          z: 1
        }
      }), e = function (a, c, d) {
        if (0 === a.length) return null;
        if (1 === a.length) return a[0];
        for (var b = 0, e = y(a, h, !1), g = 1; g < e.length; g++) d * e[g][c] > d * e[b][c] ? b = g : d * e[g][c] === d * e[b][c] && e[g].z < e[b].z && (b = g);
        return a[b]
      }, a.axes = {
        y: {
          left: e(l, "x", -1),
          right: e(l, "x", 1)
        },
        x: {
          top: e(t, "y", -1),
          bottom: e(q, "y", 1)
        },
        z: {
          top: e(g,
            "y", -1),
          bottom: e(r, "y", 1)
        }
      }) : a.axes = {
        y: {
          left: {
            x: e,
            z: 0,
            xDir: {
              x: 1,
              y: 0,
              z: 0
            }
          },
          right: {
            x: f,
            z: 0,
            xDir: {
              x: 0,
              y: 0,
              z: 1
            }
          }
        },
        x: {
          top: {
            y: k,
            z: 0,
            xDir: {
              x: 1,
              y: 0,
              z: 0
            }
          },
          bottom: {
            y: g,
            z: 0,
            xDir: {
              x: 1,
              y: 0,
              z: 0
            }
          }
        },
        z: {
          top: {
            x: u ? f : e,
            y: k,
            xDir: u ? {
              x: 0,
              y: 0,
              z: 1
            } : {
              x: 0,
              y: 0,
              z: -1
            }
          },
          bottom: {
            x: u ? f : e,
            y: g,
            xDir: u ? {
              x: 0,
              y: 0,
              z: 1
            } : {
              x: 0,
              y: 0,
              z: -1
            }
          }
        }
      };
      return a
    };
    b.Fx.prototype.matrixSetter = function () {
      var h;
      if (1 > this.pos && (b.isArray(this.start) || b.isArray(this.end))) {
        var l = this.start || [1, 0, 0, 1, 0, 0],
          a = this.end || [1, 0, 0, 1, 0, 0];
        h = [];
        for (var e = 0; 6 > e; e++) h.push(this.pos *
          a[e] + (1 - this.pos) * l[e])
      } else h = this.end;
      this.elem.attr(this.prop, h, null, !0)
    }
  })(A);
  (function (b) {
    function u(d, c, b) {
      if (!d.chart.is3d() || "colorAxis" === d.coll) return c;
      var g = d.chart,
        k = y * g.options.chart.options3d.alpha,
        f = y * g.options.chart.options3d.beta,
        l = a(b && d.options.title.position3d, d.options.labels.position3d);
      b = a(b && d.options.title.skew3d, d.options.labels.skew3d);
      var h = g.frame3d,
        q = g.plotLeft,
        m = g.plotWidth + q,
        n = g.plotTop,
        p = g.plotHeight + n,
        g = !1,
        w = 0,
        x = 0,
        u = {
          x: 0,
          y: 1,
          z: 0
        };
      c = d.swapZ({
        x: c.x,
        y: c.y,
        z: 0
      });
      if (d.isZAxis)
        if (d.opposite) {
          if (null ===
            h.axes.z.top) return {};
          x = c.y - n;
          c.x = h.axes.z.top.x;
          c.y = h.axes.z.top.y;
          q = h.axes.z.top.xDir;
          g = !h.top.frontFacing
        } else {
          if (null === h.axes.z.bottom) return {};
          x = c.y - p;
          c.x = h.axes.z.bottom.x;
          c.y = h.axes.z.bottom.y;
          q = h.axes.z.bottom.xDir;
          g = !h.bottom.frontFacing
        }
      else if (d.horiz)
        if (d.opposite) {
          if (null === h.axes.x.top) return {};
          x = c.y - n;
          c.y = h.axes.x.top.y;
          c.z = h.axes.x.top.z;
          q = h.axes.x.top.xDir;
          g = !h.top.frontFacing
        } else {
          if (null === h.axes.x.bottom) return {};
          x = c.y - p;
          c.y = h.axes.x.bottom.y;
          c.z = h.axes.x.bottom.z;
          q = h.axes.x.bottom.xDir;
          g = !h.bottom.frontFacing
        }
      else if (d.opposite) {
        if (null === h.axes.y.right) return {};
        w = c.x - m;
        c.x = h.axes.y.right.x;
        c.z = h.axes.y.right.z;
        q = h.axes.y.right.xDir;
        q = {
          x: q.z,
          y: q.y,
          z: -q.x
        }
      } else {
        if (null === h.axes.y.left) return {};
        w = c.x - q;
        c.x = h.axes.y.left.x;
        c.z = h.axes.y.left.z;
        q = h.axes.y.left.xDir
      }
      "chart" !== l && ("flap" === l ? d.horiz ? (f = Math.sin(k), k = Math.cos(k), d.opposite && (f = -f), g && (f = -f), u = {
        x: q.z * f,
        y: k,
        z: -q.x * f
      }) : q = {
        x: Math.cos(f),
        y: 0,
        z: Math.sin(f)
      } : "ortho" === l ? d.horiz ? (u = Math.cos(k), l = Math.sin(f) * u, k = -Math.sin(k), f = -u * Math.cos(f), u = {
        x: q.y * f - q.z * k,
        y: q.z * l - q.x * f,
        z: q.x * k - q.y * l
      }, k = 1 / Math.sqrt(u.x * u.x + u.y * u.y + u.z * u.z), g && (k = -k), u = {
        x: k * u.x,
        y: k * u.y,
        z: k * u.z
      }) : q = {
        x: Math.cos(f),
        y: 0,
        z: Math.sin(f)
      } : d.horiz ? u = {
        x: Math.sin(f) * Math.sin(k),
        y: Math.cos(k),
        z: -Math.cos(f) * Math.sin(k)
      } : q = {
        x: Math.cos(f),
        y: 0,
        z: Math.sin(f)
      });
      c.x += w * q.x + x * u.x;
      c.y += w * q.y + x * u.y;
      c.z += w * q.z + x * u.z;
      g = v([c], d.chart)[0];
      b && (0 > e(v([c, {
        x: c.x + q.x,
        y: c.y + q.y,
        z: c.z + q.z
      }, {
        x: c.x + u.x,
        y: c.y + u.y,
        z: c.z + u.z
      }], d.chart)) && (q = {
        x: -q.x,
        y: -q.y,
        z: -q.z
      }), d = v([{
          x: c.x,
          y: c.y,
          z: c.z
        },
        {
          x: c.x + q.x,
          y: c.y + q.y,
          z: c.z + q.z
        }, {
          x: c.x + u.x,
          y: c.y + u.y,
          z: c.z + u.z
        }
      ], d.chart), g.matrix = [d[1].x - d[0].x, d[1].y - d[0].y, d[2].x - d[0].x, d[2].y - d[0].y, g.x, g.y], g.matrix[4] -= g.x * g.matrix[0] + g.y * g.matrix[2], g.matrix[5] -= g.x * g.matrix[1] + g.y * g.matrix[3]);
      return g
    }
    var z, p = b.addEvent,
      n = b.Axis,
      x = b.Chart,
      y = b.deg2rad,
      m = b.each,
      h = b.extend,
      w = b.merge,
      v = b.perspective,
      l = b.perspective3D,
      a = b.pick,
      e = b.shapeArea,
      f = b.splat,
      k = b.Tick,
      g = b.wrap;
    w(!0, n.prototype.defaultOptions, {
      labels: {
        position3d: "offset",
        skew3d: !1
      },
      title: {
        position3d: null,
        skew3d: null
      }
    });
    p(n, "afterSetOptions", function () {
      var d;
      this.chart.is3d && this.chart.is3d() && "colorAxis" !== this.coll && (d = this.options, d.tickWidth = a(d.tickWidth, 0), d.gridLineWidth = a(d.gridLineWidth, 1))
    });
    g(n.prototype, "getPlotLinePath", function (a) {
      var c = a.apply(this, [].slice.call(arguments, 1));
      if (!this.chart.is3d() || "colorAxis" === this.coll || null === c) return c;
      var d = this.chart,
        b = d.options.chart.options3d,
        b = this.isZAxis ? d.plotWidth : b.depth,
        d = d.frame3d,
        c = [this.swapZ({
          x: c[1],
          y: c[2],
          z: 0
        }), this.swapZ({
          x: c[1],
          y: c[2],
          z: b
        }), this.swapZ({
          x: c[4],
          y: c[5],
          z: 0
        }), this.swapZ({
          x: c[4],
          y: c[5],
          z: b
        })],
        b = [];
      this.horiz ? (this.isZAxis ? (d.left.visible && b.push(c[0], c[2]), d.right.visible && b.push(c[1], c[3])) : (d.front.visible && b.push(c[0], c[2]), d.back.visible && b.push(c[1], c[3])), d.top.visible && b.push(c[0], c[1]), d.bottom.visible && b.push(c[2], c[3])) : (d.front.visible && b.push(c[0], c[2]), d.back.visible && b.push(c[1], c[3]), d.left.visible && b.push(c[0], c[1]), d.right.visible && b.push(c[2], c[3]));
      b = v(b, this.chart, !1);
      return this.chart.renderer.toLineSegments(b)
    });
    g(n.prototype, "getLinePath", function (a) {
      return this.chart.is3d() && "colorAxis" !== this.coll ? [] : a.apply(this, [].slice.call(arguments, 1))
    });
    g(n.prototype, "getPlotBandPath", function (a) {
      if (!this.chart.is3d() || "colorAxis" === this.coll) return a.apply(this, [].slice.call(arguments, 1));
      var c = arguments,
        d = c[2],
        b = [],
        c = this.getPlotLinePath(c[1]),
        d = this.getPlotLinePath(d);
      if (c && d)
        for (var e = 0; e < c.length; e += 6) b.push("M", c[e + 1], c[e + 2], "L", c[e + 4], c[e + 5], "L", d[e + 4], d[e + 5], "L", d[e + 1], d[e + 2], "Z");
      return b
    });
    g(k.prototype,
      "getMarkPath",
      function (a) {
        var c = a.apply(this, [].slice.call(arguments, 1)),
          c = [u(this.axis, {
            x: c[1],
            y: c[2],
            z: 0
          }), u(this.axis, {
            x: c[4],
            y: c[5],
            z: 0
          })];
        return this.axis.chart.renderer.toLineSegments(c)
      });
    p(k, "afterGetLabelPosition", function (a) {
      h(a.pos, u(this.axis, a.pos))
    });
    g(n.prototype, "getTitlePosition", function (a) {
      var c = a.apply(this, [].slice.call(arguments, 1));
      return u(this, c, !0)
    });
    p(n, "drawCrosshair", function (a) {
      this.chart.is3d() && "colorAxis" !== this.coll && a.point && (a.point.crosshairPos = this.isXAxis ? a.point.axisXpos :
        this.len - a.point.axisYpos)
    });
    p(n, "destroy", function () {
      m(["backFrame", "bottomFrame", "sideFrame"], function (a) {
        this[a] && (this[a] = this[a].destroy())
      }, this)
    });
    n.prototype.swapZ = function (a, c) {
      return this.isZAxis ? (c = c ? 0 : this.chart.plotLeft, {
        x: c + a.z,
        y: a.y,
        z: a.x - c
      }) : a
    };
    z = b.ZAxis = function () {
      this.init.apply(this, arguments)
    };
    h(z.prototype, n.prototype);
    h(z.prototype, {
      isZAxis: !0,
      setOptions: function (a) {
        a = w({
          offset: 0,
          lineWidth: 0
        }, a);
        n.prototype.setOptions.call(this, a);
        this.coll = "zAxis"
      },
      setAxisSize: function () {
        n.prototype.setAxisSize.call(this);
        this.width = this.len = this.chart.options.chart.options3d.depth;
        this.right = this.chart.chartWidth - this.width - this.left
      },
      getSeriesExtremes: function () {
        var d = this,
          c = d.chart;
        d.hasVisibleSeries = !1;
        d.dataMin = d.dataMax = d.ignoreMinPadding = d.ignoreMaxPadding = null;
        d.buildStacks && d.buildStacks();
        m(d.series, function (b) {
          if (b.visible || !c.options.chart.ignoreHiddenSeries) d.hasVisibleSeries = !0, b = b.zData, b.length && (d.dataMin = Math.min(a(d.dataMin, b[0]), Math.min.apply(null, b)), d.dataMax = Math.max(a(d.dataMax, b[0]), Math.max.apply(null,
            b)))
        })
      }
    });
    p(x, "afterGetAxes", function () {
      var a = this,
        c = this.options,
        c = c.zAxis = f(c.zAxis || {});
      a.is3d() && (this.zAxis = [], m(c, function (c, b) {
        c.index = b;
        c.isX = !0;
        (new z(a, c)).setScale()
      }))
    });
    g(n.prototype, "getSlotWidth", function (b, c) {
      if (this.chart.is3d() && c && c.label && this.categories) {
        var d = this.chart,
          e = this.ticks,
          g = this.gridGroup.element.childNodes[0].getBBox(),
          k = d.frameShapes.left.getBBox(),
          f = d.options.chart.options3d,
          d = {
            x: d.plotWidth / 2,
            y: d.plotHeight / 2,
            z: f.depth / 2,
            vd: a(f.depth, 1) * a(f.viewDistance, 0)
          },
          h,
          m, f = c.pos,
          n = e[f - 1],
          e = e[f + 1];
        0 !== f && n && (h = l({
          x: n.label.xy.x,
          y: n.label.xy.y,
          z: null
        }, d, d.vd));
        e && e.label.xy && (m = l({
          x: e.label.xy.x,
          y: e.label.xy.y,
          z: null
        }, d, d.vd));
        e = {
          x: c.label.xy.x,
          y: c.label.xy.y,
          z: null
        };
        e = l(e, d, d.vd);
        return Math.abs(h ? e.x - h.x : m ? m.x - e.x : g.x - k.x)
      }
      return b.apply(this, [].slice.call(arguments, 1))
    })
  })(A);
  (function (b) {
    var u = b.addEvent,
      z = b.perspective,
      p = b.pick;
    u(b.Series, "afterTranslate", function () {
      this.chart.is3d() && this.translate3dPoints()
    });
    b.Series.prototype.translate3dPoints = function () {
      var b =
        this.chart,
        u = p(this.zAxis, b.options.zAxis[0]),
        y = [],
        m, h, w;
      for (w = 0; w < this.data.length; w++) m = this.data[w], u && u.translate ? (h = u.isLog && u.val2lin ? u.val2lin(m.z) : m.z, m.plotZ = u.translate(h), m.isInside = m.isInside ? h >= u.min && h <= u.max : !1) : m.plotZ = 0, m.axisXpos = m.plotX, m.axisYpos = m.plotY, m.axisZpos = m.plotZ, y.push({
        x: m.plotX,
        y: m.plotY,
        z: m.plotZ
      });
      b = z(y, b, !0);
      for (w = 0; w < this.data.length; w++) m = this.data[w], u = b[w], m.plotX = u.x, m.plotY = u.y, m.plotZ = u.z
    }
  })(A);
  (function (b) {
    function u(b) {
      var a = b.apply(this, [].slice.call(arguments,
        1));
      this.chart.is3d && this.chart.is3d() && (a.stroke = this.options.edgeColor || a.fill, a["stroke-width"] = x(this.options.edgeWidth, 1));
      return a
    }
    var z = b.addEvent,
      p = b.each,
      n = b.perspective,
      x = b.pick,
      y = b.Series,
      m = b.seriesTypes,
      h = b.inArray,
      w = b.svg,
      v = b.wrap;
    v(m.column.prototype, "translate", function (b) {
      b.apply(this, [].slice.call(arguments, 1));
      this.chart.is3d() && this.translate3dShapes()
    });
    v(b.Series.prototype, "alignDataLabel", function (b) {
      arguments[3].outside3dPlot = arguments[1].outside3dPlot;
      b.apply(this, [].slice.call(arguments,
        1))
    });
    v(b.Series.prototype, "justifyDataLabel", function (b) {
      return arguments[2].outside3dPlot ? !1 : b.apply(this, [].slice.call(arguments, 1))
    });
    m.column.prototype.translate3dPoints = function () {};
    m.column.prototype.translate3dShapes = function () {
      var b = this,
        a = b.chart,
        e = b.options,
        f = e.depth || 25,
        k = (e.stacking ? e.stack || 0 : b.index) * (f + (e.groupZPadding || 1)),
        g = b.borderWidth % 2 ? .5 : 0;
      a.inverted && !b.yAxis.reversed && (g *= -1);
      !1 !== e.grouping && (k = 0);
      k += e.groupZPadding || 1;
      p(b.data, function (d) {
        d.outside3dPlot = null;
        if (null !==
          d.y) {
          var c = d.shapeArgs,
            e = d.tooltipPos,
            h;
          p([
            ["x", "width"],
            ["y", "height"]
          ], function (a) {
            h = c[a[0]] - g;
            0 > h && (c[a[1]] += c[a[0]] + g, c[a[0]] = -g, h = 0);
            h + c[a[1]] > b[a[0] + "Axis"].len && 0 !== c[a[1]] && (c[a[1]] = b[a[0] + "Axis"].len - c[a[0]]);
            if (0 !== c[a[1]] && (c[a[0]] >= b[a[0] + "Axis"].len || c[a[0]] + c[a[1]] <= g)) {
              for (var e in c) c[e] = 0;
              d.outside3dPlot = !0
            }
          });
          d.shapeType = "cuboid";
          c.z = k;
          c.depth = f;
          c.insidePlotArea = !0;
          e = n([{
            x: e[0],
            y: e[1],
            z: k
          }], a, !0)[0];
          d.tooltipPos = [e.x, e.y]
        }
      });
      b.z = k
    };
    v(m.column.prototype, "animate", function (b) {
      if (this.chart.is3d()) {
        var a =
          arguments[1],
          e = this.yAxis,
          f = this,
          k = this.yAxis.reversed;
        w && (a ? p(f.data, function (a) {
          null !== a.y && (a.height = a.shapeArgs.height, a.shapey = a.shapeArgs.y, a.shapeArgs.height = 1, k || (a.shapeArgs.y = a.stackY ? a.plotY + e.translate(a.stackY) : a.plotY + (a.negative ? -a.height : a.height)))
        }) : (p(f.data, function (a) {
          null !== a.y && (a.shapeArgs.height = a.height, a.shapeArgs.y = a.shapey, a.graphic && a.graphic.animate(a.shapeArgs, f.options.animation))
        }), this.drawDataLabels(), f.animate = null))
      } else b.apply(this, [].slice.call(arguments, 1))
    });
    v(m.column.prototype, "plotGroup", function (b, a, e, f, k, g) {
      this.chart.is3d() && g && !this[a] && (this.chart.columnGroup || (this.chart.columnGroup = this.chart.renderer.g("columnGroup").add(g)), this[a] = this.chart.columnGroup, this.chart.columnGroup.attr(this.getPlotBox()), this[a].survive = !0);
      return b.apply(this, Array.prototype.slice.call(arguments, 1))
    });
    v(m.column.prototype, "setVisible", function (b, a) {
      var e = this,
        f;
      e.chart.is3d() && p(e.data, function (b) {
        f = (b.visible = b.options.visible = a = void 0 === a ? !b.visible : a) ? "visible" :
          "hidden";
        e.options.data[h(b, e.data)] = b.options;
        b.graphic && b.graphic.attr({
          visibility: f
        })
      });
      b.apply(this, Array.prototype.slice.call(arguments, 1))
    });
    m.column.prototype.handle3dGrouping = !0;
    z(y, "afterInit", function () {
      if (this.chart.is3d() && this.handle3dGrouping) {
        var b = this.options,
          a = b.grouping,
          e = b.stacking,
          f = x(this.yAxis.options.reversedStacks, !0),
          k = 0;
        if (void 0 === a || a) {
          a = this.chart.retrieveStacks(e);
          k = b.stack || 0;
          for (e = 0; e < a[k].series.length && a[k].series[e] !== this; e++);
          k = 10 * (a.totalStacks - a[k].position) +
            (f ? e : -e);
          this.xAxis.reversed || (k = 10 * a.totalStacks - k)
        }
        b.zIndex = k
      }
    });
    v(m.column.prototype, "pointAttribs", u);
    m.columnrange && (v(m.columnrange.prototype, "pointAttribs", u), m.columnrange.prototype.plotGroup = m.column.prototype.plotGroup, m.columnrange.prototype.setVisible = m.column.prototype.setVisible);
    v(y.prototype, "alignDataLabel", function (b) {
      if (this.chart.is3d() && ("column" === this.type || "columnrange" === this.type)) {
        var a = arguments,
          e = a[4],
          a = a[1],
          f = {
            x: e.x,
            y: e.y,
            z: this.z
          },
          f = n([f], this.chart, !0)[0];
        e.x = f.x;
        e.y =
          a.outside3dPlot ? -9E9 : f.y
      }
      b.apply(this, [].slice.call(arguments, 1))
    });
    v(b.StackItem.prototype, "getStackBox", function (h, a) {
      var e = h.apply(this, [].slice.call(arguments, 1));
      if (a.is3d()) {
        var f = {
            x: e.x,
            y: e.y,
            z: 0
          },
          f = b.perspective([f], a, !0)[0];
        e.x = f.x;
        e.y = f.y
      }
      return e
    })
  })(A);
  (function (b) {
    var u = b.deg2rad,
      z = b.each,
      p = b.pick,
      n = b.seriesTypes,
      x = b.svg;
    b = b.wrap;
    b(n.pie.prototype, "translate", function (b) {
      b.apply(this, [].slice.call(arguments, 1));
      if (this.chart.is3d()) {
        var m = this,
          h = m.options,
          n = h.depth || 0,
          p = m.chart.options.chart.options3d,
          l = p.alpha,
          a = p.beta,
          e = h.stacking ? (h.stack || 0) * n : m._i * n,
          e = e + n / 2;
        !1 !== h.grouping && (e = 0);
        z(m.data, function (b) {
          var f = b.shapeArgs;
          b.shapeType = "arc3d";
          f.z = e;
          f.depth = .75 * n;
          f.alpha = l;
          f.beta = a;
          f.center = m.center;
          f = (f.end + f.start) / 2;
          b.slicedTranslation = {
            translateX: Math.round(Math.cos(f) * h.slicedOffset * Math.cos(l * u)),
            translateY: Math.round(Math.sin(f) * h.slicedOffset * Math.cos(l * u))
          }
        })
      }
    });
    b(n.pie.prototype.pointClass.prototype, "haloPath", function (b) {
      var m = arguments;
      return this.series.chart.is3d() ? [] : b.call(this,
        m[1])
    });
    b(n.pie.prototype, "pointAttribs", function (b, m, h) {
      b = b.call(this, m, h);
      h = this.options;
      this.chart.is3d() && (b.stroke = h.edgeColor || m.color || this.color, b["stroke-width"] = p(h.edgeWidth, 1));
      return b
    });
    b(n.pie.prototype, "drawPoints", function (b) {
      b.apply(this, [].slice.call(arguments, 1));
      this.chart.is3d() && z(this.points, function (b) {
        var h = b.graphic;
        if (h) h[b.y && b.visible ? "show" : "hide"]()
      })
    });
    b(n.pie.prototype, "drawDataLabels", function (b) {
      if (this.chart.is3d()) {
        var m = this.chart.options.chart.options3d;
        z(this.data,
          function (b) {
            var h = b.shapeArgs,
              n = h.r,
              l = (h.start + h.end) / 2,
              a = b.labelPos,
              e = -n * (1 - Math.cos((h.alpha || m.alpha) * u)) * Math.sin(l),
              f = n * (Math.cos((h.beta || m.beta) * u) - 1) * Math.cos(l);
            z([0, 2, 4], function (b) {
              a[b] += f;
              a[b + 1] += e
            })
          })
      }
      b.apply(this, [].slice.call(arguments, 1))
    });
    b(n.pie.prototype, "addPoint", function (b) {
      b.apply(this, [].slice.call(arguments, 1));
      this.chart.is3d() && this.update(this.userOptions, !0)
    });
    b(n.pie.prototype, "animate", function (b) {
      if (this.chart.is3d()) {
        var m = arguments[1],
          h = this.options.animation,
          n =
          this.center,
          p = this.group,
          l = this.markerGroup;
        x && (!0 === h && (h = {}), m ? (p.oldtranslateX = p.translateX, p.oldtranslateY = p.translateY, m = {
          translateX: n[0],
          translateY: n[1],
          scaleX: .001,
          scaleY: .001
        }, p.attr(m), l && (l.attrSetters = p.attrSetters, l.attr(m))) : (m = {
          translateX: p.oldtranslateX,
          translateY: p.oldtranslateY,
          scaleX: 1,
          scaleY: 1
        }, p.animate(m, h), l && l.animate(m, h), this.animate = null))
      } else b.apply(this, [].slice.call(arguments, 1))
    })
  })(A);
  (function (b) {
    var u = b.Point,
      z = b.seriesType,
      p = b.seriesTypes;
    z("scatter3d", "scatter", {
      tooltip: {
        pointFormat: "x: \x3cb\x3e{point.x}\x3c/b\x3e\x3cbr/\x3ey: \x3cb\x3e{point.y}\x3c/b\x3e\x3cbr/\x3ez: \x3cb\x3e{point.z}\x3c/b\x3e\x3cbr/\x3e"
      }
    }, {
      pointAttribs: function (n) {
        var u = p.scatter.prototype.pointAttribs.apply(this, arguments);
        this.chart.is3d() && n && (u.zIndex = b.pointCameraDistance(n, this.chart));
        return u
      },
      axisTypes: ["xAxis", "yAxis", "zAxis"],
      pointArrayMap: ["x", "y", "z"],
      parallelArrays: ["x", "y", "z"],
      directTouch: !0
    }, {
      applyOptions: function () {
        u.prototype.applyOptions.apply(this, arguments);
        void 0 ===
          this.z && (this.z = 0);
        return this
      }
    })
  })(A);
  (function (b) {
    var u = b.addEvent,
      z = b.Axis,
      p = b.SVGRenderer,
      n = b.VMLRenderer;
    n && (b.setOptions({
      animate: !1
    }), n.prototype.face3d = p.prototype.face3d, n.prototype.polyhedron = p.prototype.polyhedron, n.prototype.cuboid = p.prototype.cuboid, n.prototype.cuboidPath = p.prototype.cuboidPath, n.prototype.toLinePath = p.prototype.toLinePath, n.prototype.toLineSegments = p.prototype.toLineSegments, n.prototype.createElement3D = p.prototype.createElement3D, n.prototype.arc3d = function (b) {
      b = p.prototype.arc3d.call(this,
        b);
      b.css({
        zIndex: b.zIndex
      });
      return b
    }, b.VMLRenderer.prototype.arc3dPath = b.SVGRenderer.prototype.arc3dPath, u(z, "render", function () {
      this.sideFrame && (this.sideFrame.css({
        zIndex: 0
      }), this.sideFrame.front.attr({
        fill: this.sideFrame.color
      }));
      this.bottomFrame && (this.bottomFrame.css({
        zIndex: 1
      }), this.bottomFrame.front.attr({
        fill: this.bottomFrame.color
      }));
      this.backFrame && (this.backFrame.css({
        zIndex: 0
      }), this.backFrame.front.attr({
        fill: this.backFrame.color
      }))
    }))
  })(A)
});
