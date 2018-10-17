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
    Brain.parseBoard = function (board, player) {
        var stringify = function (signs) {
            return signs.flat().map(function (e) {
                if (e === player)
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
