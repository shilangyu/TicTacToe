"use strict";
var board = [
    [{ x: 0, y: 0, sign: 'O' }, { x: 1, y: 0, sign: 'O' }, { x: 2, y: 0, sign: 'O' }],
    [{ x: 0, y: 1, sign: 'O' }, { x: 1, y: 1, sign: 'O' }, { x: 2, y: 1, sign: 'O' }],
    [{ x: 0, y: 2, sign: 'O' }, { x: 1, y: 2, sign: 'X' }, { x: 2, y: 2, sign: 'O' }]
];
var env = {
    scale: 150,
    background: 151,
    canvasSize: {
        x: 450,
        y: 450
    }
};
var player = {
    sign: 'X',
    changeSign: function () {
        this.sign = this.sign === 'X' ? 'O' : 'X';
    }
};
var brain = new Brain('/decision.json');
function setup() {
    createCanvas(env.canvasSize.x, env.canvasSize.y);
    background(env.background);
    textAlign(CENTER, CENTER);
    textSize(env.scale);
    strokeWeight(15);
    stroke(255);
    noLoop();
}
function draw() {
    board.forEach(function (row) {
        return row.forEach(function (_a) {
            var x = _a.x, y = _a.y, sign = _a.sign;
            text(sign, env.scale * (x + 1 / 2), env.scale * (y + 1 / 2));
            line(env.scale * x, 0, env.scale * x, env.canvasSize.y);
            line(0, env.scale * y, env.canvasSize.x, env.scale * y);
        });
    });
}
