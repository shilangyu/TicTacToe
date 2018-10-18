const env = {
	scale: 150,
	background: 151,
	canvasSize: {
		x: 450,
		y: 450
	}
}

const board = new Board(3, 3)
const brain = new Brain('/decision.json')
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
	board.canvas = document.querySelector('canvas') || document.createElement('canvas')
}

function draw() {
	board.draw(game.signs)
}

window.addEventListener('aiTurn', evt => {
	const { x, y } = brain.decide(Brain.parseBoard(board.tiles))

	board.aiMove(x, y)
})
