const env = {
	scale: 150,
	background: 151,
	canvasSize: {
		x: 450,
		y: 450
	},
	signs: {
		AI: 'o',
		player: 'x'
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

	noLoop()
	console.log(Brain.parseBoard(board.tiles))
}

function draw() {
	board.tiles.forEach(row =>
		row.forEach(({ x, y, sign }) => {
			const txt = sign === null ? '' : sign === 0 ? env.signs.player : env.signs.AI
			text(txt, env.scale * (x + 1 / 2), env.scale * (y + 1 / 2))
			line(env.scale * x, 0, env.scale * x, env.canvasSize.y)
			line(0, env.scale * y, env.canvasSize.x, env.scale * y)
		})
	)

}
