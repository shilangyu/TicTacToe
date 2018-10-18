const env = {
	scale: 150,
	background: 151,
	canvasSize: {
		x: 450,
		y: 450
	},
	signs: {
		AI: 'o',
		player: '×'
	}
}

const board = new Board(3, 3)
const brain = new Brain('/decision.json')

function setup() {
	createCanvas(env.canvasSize.x, env.canvasSize.y)
	background(env.background)
	
	textAlign(CENTER, CENTER)
	textSize(env.scale)
	strokeWeight(15)
	stroke(255)
	fill(255)
	
	// noLoop()
	board.canvas = document.querySelector('canvas') || document.createElement('canvas')
	console.log(Brain.parseBoard(board.tiles))
}

function draw() {
	board.draw(env.signs)
}
