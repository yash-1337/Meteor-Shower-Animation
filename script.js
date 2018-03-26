let meteors = [];

let colors;

let title = 'Meteor Shower';
let subtitle = 'By Yash Patel';

let stars = [];

function setup() {
    let canvas = createCanvas(windowWidth, windowHeight);

    canvas.position(0, 0);

    colors = [color(0, 150, 136), color(255, 143, 0), color(250, 250, 250)];

    meteorShower();

    for (let i = 0; i < 100; i++) {
        stars.push(createVector(random(0, width), random(0, height)));
    }

}

function draw() {

    background(21, 35, 45);

    for (star of stars) {
        fill(255);
        ellipse(star.x, star.y, 5);
    }

    fill(25, 50, 65);
    triangle(0, height, 600, height, 300, height - 400);

    fill(35, 60, 75);
    triangle(500, height, 600, height, 300, height - 400);

    fill(36, 50, 60);
    triangle(925, height, width + 50, height, 925 + (width + 50 - 925) / 2, height - 450);

    fill(46, 60, 70);
    triangle(width - 50, height, width + 50, height, 925 + (width + 50 - 925) / 2, height - 450);

    fill(25, 55, 60);
    triangle(550, height, 1000, height, 775, height - 300);

    fill(35, 65, 70);
    triangle(900, height, 1000, height, 775, height - 300);

    for (meteor of meteors) {
        meteor.update();
        meteor.render();
    }

    textAlign(CENTER, CENTER);
    textSize(72);

    noStroke();

    fill(255);
    text(title, width / 2, height / 3);

    fill(255, 150);
    text(title, width / 2 - 3, height / 3 + 3);

    fill(255, 100);
    text(title, width / 2 - 6, height / 3 + 6);

    fill(255, 50);
    text(title, width / 2 - 9, height / 3 + 9);

    stroke(255, 200);
    strokeWeight(2);
    line(width / 2 - 100, height / 2 - 50, width / 2 + 100, height / 2 - 50);

    noStroke();
    textSize(36);

    fill(255);
    text(subtitle, width / 2, height / 2);

    fill(255, 150);
    text(subtitle, width / 2 - 2, height / 2 + 2);

    fill(255, 100);
    text(subtitle, width / 2 - 4, height / 2 + 4);

    fill(255, 50);
    text(subtitle, width / 2 - 6, height / 2 + 6);

}

function meteorShower() {
    meteors.push(new Meteor());
    meteors.push(new Meteor());
    meteors.push(new Meteor());
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight, true);
}

class Meteor {
    constructor() {
        if (random(1) < 0.5) {
            this.pos = createVector(random(-50, 0), random(-50, height / 3));
        } else {
            this.pos = createVector(random(-50, width / 3), random(-50, 0));
        }
        this.vel = createVector(random(5, 10), random(5, 10));

        this.r = 25;
        this.color = random(colors);
        this.trailColor = color(this.color.levels[0], this.color.levels[1], this.color.levels[2], 100);
        // this.trailColor.setAlpha(200);
    }

    update() {

        this.pos.add(this.vel);
        this.pos.add(createVector(random(-3, 3), random(-3, 3)));

        if (this.pos.x >= width && this.pos.y >= height) {
            meteors.splice(meteors.indexOf(this), 1);
            meteors.push(new Meteor());
        }

    }

    render() {

        push();

        translate(this.pos.x, this.pos.y);
        angleMode(DEGREES);
        rotate(this.vel.heading() - 90);

        noStroke();
        fill(this.color);
        ellipse(0, 0, this.r * 2);
        fill(this.trailColor);
        triangle(-this.r, 0, this.r, 0, random(-10, 10), -200 + random(-20, 20));

        pop();
    }
}