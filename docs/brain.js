"use strict";
var Brain = /** @class */ (function () {
    function Brain(source) {
        var _this = this;
        this.source = source;
        this.brain = {};
        fetch(source)
            .then(function (res) { return res.json(); })
            .then(function (json) { return _this.brain = json; });
    }
    Brain.prototype.decide = function (boards) {
        for (var _i = 0, boards_1 = boards; _i < boards_1.length; _i++) {
            var key = boards_1[_i];
            if (key in this.brain) {
                return this.brain[key].sort(function (a, b) { return b.fitness - a.fitness; })[0];
            }
        }
        return {
            x: -1,
            y: -1,
            fitness: -1
        };
    };
    Brain.parseBoard = function (board, playerSign) {
        var stringify = function (signs) {
            return signs.flat().map(function (e) {
                if (e === playerSign)
                    return '0';
                else if (e !== '')
                    return '1';
                else
                    return 'null';
            }).join('');
        };
        var rotate = function (matrix) {
            var N = matrix.length - 1;
            var result = matrix.map(function (row, i) {
                return row.map(function (val, j) { return matrix[N - j][i]; });
            });
            matrix.length = 0;
            matrix.push.apply(matrix, result);
            return matrix;
        };
        var signs = board.map(function (row) { return row.map(function (_a) {
            var sign = _a.sign;
            return sign;
        }); });
        var result = [];
        for (var i = 0; i < 4; i++) {
            result.push(stringify(signs));
            signs = rotate(signs);
        }
        return result;
    };
    return Brain;
}());
