(function (root) {
  var Sierpinski = root.Sierpinski = (root.Sierpinski || {})

  var Triangle = Sierpinski.Triangle = function (ctx) {
    this.ctx = ctx;
    this.triangles = [Triangle.generateFirstGoldTriangle()];
  }

  Triangle.DIM = 1000;

  Triangle.generateFirstGoldTriangle = function () {
    return {
      color: "gold",
      ly: canvas.height,
      lx: 0,
      ry: canvas.height,
      rx: Triangle.DIM,
      ty: canvas.height - (Math.sqrt(3) * Triangle.DIM) / 2,
      tx: Triangle.DIM / 2,
      di: Triangle.DIM
    };
  }

  Triangle.generateTopTriangle = function (t) {
    return {
      color: "gold",
      ly: (t.ly + t.ty) / 2,
      lx: (t.lx + t.tx) / 2,
      ry: (t.ry + t.ty) / 2,
      rx: (t.rx + t.tx) / 2,
      ty: t.ty,
      tx: t.tx,
      di: t.di/2
    };
  }

  Triangle.generateBottomLeftTriangle = function (t) {
    return {
      color: "gold",
      ly: t.ly,
      lx: t.lx,
      ry: (t.ry + t.ly) / 2,
      rx: (t.rx + t.lx) / 2,
      ty: (t.ty + t.ly) / 2,
      tx: (t.tx + t.lx) / 2,
      di: t.di/2
    };
  }

  Triangle.generateBottomRightTriangle = function (t) {
    return {
      color: "gold",
      ly: (t.ly + t.ry) / 2,
      lx: (t.lx + t.rx) / 2,
      ry: t.ry,
      rx: t.rx,
      ty: (t.ty + t.ry) / 2,
      tx: (t.tx + t.rx) / 2,
      di: t.di/2
    };
  }


  Triangle.generateWhiteTriangle = function (t) {
    return {
      color: "white",
      ly: (t.ly + t.ty) / 2,
      lx: (t.lx + t.tx) / 2,
      ry: (t.ry + t.ty) / 2,
      rx: (t.rx + t.tx) / 2,
      ty: t.ty + (Math.sqrt(3) * t.di) / 2,
      tx: t.tx,
      di: t.di / 2
    };
  }

  Triangle.prototype.fractal_iteration = function (n) {
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (var i = 0; i < n; i++) {
      var t = this.triangles[i];
      if (t.color === "gold") {
          var white = Triangle.generateWhiteTriangle(t),
            top = Triangle.generateTopTriangle(t),
            bottomLeft = Triangle.generateBottomLeftTriangle(t),
            bottomRight = Triangle.generateBottomRightTriangle(t);

        this.triangles.push(white);
        this.triangles.push(top);
        this.triangles.push(bottomLeft);
        this.triangles.push(bottomRight);
      }
    }

    //draw them
    for (var i = 0; i < this.triangles.length; i++) {
      console.log(this.triangles[i]);
      this.draw(this.triangles[i])
    }
  }

  Triangle.prototype.draw = function (t) {

    this.ctx.beginPath();
    this.ctx.moveTo(t.lx, t.ly);
    this.ctx.lineTo(t.rx, t.ry);
    this.ctx.lineTo(t.tx, t.ty);
    this.ctx.lineTo(t.lx, t.ly);
    this.ctx.fillStyle = t.color;
    this.ctx.closePath();

    this.ctx.fill();
  }

})(this)
