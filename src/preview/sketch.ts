import Brain from './Brain'
import Board from './Board'
import Game from './Game'

const env = {
	scale: 150,
	background: 151,
	canvasSize: {
		x: 450,
		y: 450
	}
}

const board = new Board(3, 3)
const brain = new Brain('./parsed-decision.json')
const game = new Game(board.tiles, {
	AI: 'o',
	player: '×'
})

function setup() {
	createCanvas(env.canvasSize.x, env.canvasSize.y)
	background(env.background)

	textAlign(CENTER, CENTER)
	textSize(env.scale)
	strokeWeight(15)
	stroke(255)
	fill(255)

	noLoop()
}

function draw() {
	board.draw(game.signs, env.scale, env.canvasSize)
}

window.addEventListener('aiTurn', evt => {
	const { x, y } = brain.decide(Brain.parseBoard(board.tiles))

	board.aiMove(x, y)
})

	; (document.querySelector('canvas') as HTMLCanvasElement).addEventListener('click', ({ clientX: x, clientY: y, target }) => {
		const { clientHeight: canvasHeight, clientWidth: canvasWidth } = (target as HTMLElement)

		const grid = [x / (canvasWidth / board.width), y / (canvasHeight / board.height)].map(Math.floor)

		if (game.turn === 0)
			board.playerMove(grid[1], grid[0])
	})
