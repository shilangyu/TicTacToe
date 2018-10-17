"use strict";
var board = [
    [{ x: 0, y: 0, sign: '' }, { x: 1, y: 0, sign: '' }, { x: 2, y: 0, sign: '' }],
    [{ x: 0, y: 1, sign: '' }, { x: 1, y: 1, sign: '' }, { x: 2, y: 1, sign: '' }],
    [{ x: 0, y: 2, sign: '' }, { x: 1, y: 2, sign: 'X' }, { x: 2, y: 2, sign: '' }]
];
var env = {
    scale: 150,
    background: 151,
    canvasSize: {
        x: 450,
        y: 450
    }
};
function setup() {
    createCanvas(env.canvasSize.x, env.canvasSize.y);
    background(env.background);
    textAlign(CENTER, CENTER);
    textSize(env.scale);
    console.log(Brain.parseBoard(board, 'X'));
}
function draw() {
    board.forEach(function (row) {
        return row.forEach(function (_a) {
            var x = _a.x, y = _a.y, sign = _a.sign;
            return text(sign, x * env.scale + env.scale / 2, y * env.scale + env.scale / 2);
        });
    });
}
