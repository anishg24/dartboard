class Dartboard {
    constructor() {
    }

    draw() {
        fill(0);
        noStroke();
        circle(0,0,R);

        // Slices
        const SLICE_ANGLE = 2*PI/20;
        noStroke();
        let chose = 0.00;

        for(let i=0; i<20; i++) {
            if(i%2===1){
                fill("red");
                arc(0,0,radii[1], radii[1], (i*SLICE_ANGLE)-SLICE_ANGLE/2+chose, (i*SLICE_ANGLE)+SLICE_ANGLE/2-chose);

                fill("black");
                arc(0,0,radii[2], radii[2], (i*SLICE_ANGLE)-SLICE_ANGLE/2, (i*SLICE_ANGLE)+SLICE_ANGLE/2);

                fill("red");
                arc(0,0,radii[3], radii[3], (i*SLICE_ANGLE)-SLICE_ANGLE/2+chose, (i*SLICE_ANGLE)+SLICE_ANGLE/2-chose);

                fill("black");
                arc(0,0,radii[4], radii[4], (i*SLICE_ANGLE)-SLICE_ANGLE/2, (i*SLICE_ANGLE)+SLICE_ANGLE/2);
            } else {
                //A white slice
                fill("green");
                arc(0,0,radii[1], radii[1], (i*SLICE_ANGLE)-SLICE_ANGLE/2+chose, (i*SLICE_ANGLE)+SLICE_ANGLE/2-chose);

                fill("white");
                arc(0,0,radii[2], radii[2], (i*SLICE_ANGLE)-SLICE_ANGLE/2, (i*SLICE_ANGLE)+SLICE_ANGLE/2);

                fill("green");
                arc(0,0,radii[3], radii[3], (i*SLICE_ANGLE)-SLICE_ANGLE/2+chose, (i*SLICE_ANGLE)+SLICE_ANGLE/2-chose);

                fill("white");
                arc(0,0,radii[4], radii[4], (i*SLICE_ANGLE)-SLICE_ANGLE/2, (i*SLICE_ANGLE)+SLICE_ANGLE/2);
            }
        }

        // Radial wires
        noFill();
        stroke(200);
        strokeWeight(W/300);
        for(let i=0.5; i<20; i++) {
            push();
            rotate(i*2*PI/20)
            line(0,0,0,radii[1]/2);
            pop();
        }

        // Double Bulls-eye
        noStroke();
        fill("green");
        circle(0,0,radii[radii.length-2])

        // Single Bulls-eye
        fill("red");
        circle(0,0,radii[radii.length-1])

        // Circular wires
        noFill();
        stroke(200);
        strokeWeight(W/300);
        for(let r of radii) {
            circle(0,0,r);
        }

        // Numbers
        noStroke();
        fill(255);
        textAlign(CENTER, CENTER);
        textSize(W*0.05);
        for(let i=0; i<20; i++) {
            push();
            rotate(i*2*PI/20);
            translate(0, -radii[0]/2+W*0.05);
            text(numbers[i], 0, 0);
            pop();

        }
    }
}