/**
 * Class handling decision making
 */
module.exports = class Brain {
    constructor() {
        this.decisions = JSON.parse(require('fs').readFileSync('./AI/decision.json', 'utf8'))
        this.moves = []
    }

    /**
     * returns x and y of the move chosen
     * @param {Array.<number[]>} grid grid of the tictactoe board
     * @returns {Array} X and Y of the decision
     */
    makeMove(grid) {
        // checks all rotations of the board
        function getProperty() {
            let gridString = ''
            for (let i = 2; i >= 0; i--)
                for (let j = 0; j < grid.length; j++)
                    gridString += grid[j][i]
            if (this.decisions.hasOwnProperty(gridString)) return {rotation: "right", string: gridString}

            gridString = ''
            for (let i = 2; i >= 0; i--)
                for (let j = 2; j >= 0; j--)
                    gridString += grid[i][j]
            if (this.decisions.hasOwnProperty(gridString)) return {rotation: "down", string: gridString}

            gridString = ''
            for (let i = 0; i < grid.length; i++)
                for (let j = 2; j >= 0; j--)
                    gridString += grid[j][i]
            if (this.decisions.hasOwnProperty(gridString)) return {rotation: "left", string: gridString}

            gridString = ''
            for (let i = 0; i < grid.length; i++)
                for (let j = 0; j < grid.length; j++)
                    gridString += grid[i][j]
            if (this.decisions.hasOwnProperty(gridString)) return {rotation: "up", string: gridString}

            return {rotation: "up", string: gridString, fail: true}
        }
        function rotate(how, x, y) {
            let angle
            switch (how) {
                case 'up':
                    angle = 0
                    break
                case 'right':
                    angle = -Math.PI / 2
                    break
                case 'left':
                    angle = Math.PI / 2
                    break
                case 'down':
                    angle = Math.PI
                    break
            }
            x--
            y--
            let x1 = Math.round(Math.cos(angle) * x - Math.sin(angle) * y)
            let y1 = Math.round(Math.sin(angle) * x + Math.cos(angle) * y)
            return [++x1, ++y1]
        }

        let board = getProperty.call(this)

        // if this move doesnt exist, create it
        if(board.hasOwnProperty('fail')) {
            this.decisions[board.string] = []

            grid.forEach( (e, i) => {
                e.forEach( (e, j) => {
                    if(e == null) {
                        this.decisions[board.string].push({x: i, y: j, fitness: 100})
                    }
                })
            })
        }

        // decide on the move
        let choose = Math.random() * this.decisions[board.string].reduce((total, curr) => total + curr.fitness, 0)

        for (let i = 0; i < this.decisions[board.string].length; i++) {
            choose -= this.decisions[board.string][i].fitness
            if (choose <= 0) {
                this.moves.push({name: board.string, index: i})
                return rotate(board.rotation, this.decisions[board.string][i].x, this.decisions[board.string][i].y)
            }
        }
    }

    /**
     * Award the decisions and save the knowlegde
     * @param {string} outcome How the match ended
     * @returns {string} What did he learn
     */
    end(outcome) {
        let currVal = this.decisions[this.moves[this.moves.length - 1].name][this.moves[this.moves.length - 1].index].fitness

        this.decisions[this.moves[this.moves.length - 1].name][this.moves[this.moves.length - 1].index].fitness = (outcome == "wins") ? currVal + 50 : (outcome == "losses") ? 0 : currVal
        
        require('fs').writeFile('./AI/decision.json', JSON.stringify(this.decisions, null, 4) , 'utf-8')
        
        if(currVal > this.decisions[this.moves[this.moves.length - 1].name][this.moves[this.moves.length - 1].index].fitness)
            return 'defense'
        if(currVal < this.decisions[this.moves[this.moves.length - 1].name][this.moves[this.moves.length - 1].index].fitness)
            return 'offense'
        return 'nothing'
    }

    
    
}