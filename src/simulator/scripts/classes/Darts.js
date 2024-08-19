class Dart {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    draw() {
        fill("purple")
        circle(this.x, this.y, dot_w);
    }
}

class Darts {
    constructor(num_darts) {
        this.darts = [];
        this.num_darts = num_darts;
        this.counter = 0;
    }

    shoot(mouseX, mouseY, dart_score, multiplier) {
        this.darts[this.counter] = new Dart(mouseX, mouseY);
        this.counter = (this.counter + 1) % this.num_darts;
        Module._register_dart(dart_score, multiplier);
    }

    draw() {
        for (let dart of this.darts) {
            dart.draw();
        }
    }
}