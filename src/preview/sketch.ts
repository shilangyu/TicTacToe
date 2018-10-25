import Brain from './Brain.js'
import Board from './Board.js'

const env = {
	scale: 150,
	background: 151,
	canvasSize: {
		x: 450,
		y: 450
	}
}

const board = new Board(3, 3, {
	AI: 'o',
	player: '×'
})
const brain = new Brain()

;(window as any).setup = async function () {
	brain.brain = await (await fetch('./parsed-decision.json')).json()

	createCanvas(env.canvasSize.x, env.canvasSize.y)
	background(env.background)

	textAlign(CENTER, CENTER)
	textSize(env.scale)
	strokeWeight(15)
	stroke(255)
	fill(255)

	noLoop()

	;(document.querySelector('canvas') as HTMLCanvasElement).addEventListener('click', ({ clientX: x, clientY: y, target }) => {
		const { clientHeight: canvasHeight, clientWidth: canvasWidth } = (target as HTMLElement)

		const grid = [x / (canvasWidth / board.width), y / (canvasHeight / board.height)].map(Math.floor)

		if (board.turn === 0) {
			board.playerMove(grid[1], grid[0])

			const { x, y } = brain.decide(Brain.parseBoard(board.tiles))
			board.aiMove(x, y)
		}
	})
}

;(window as any).draw = function () {
	board.draw(env.scale, env.canvasSize)
}
