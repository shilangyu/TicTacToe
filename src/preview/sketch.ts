import Brain from '../Brain'
import Board from '../Board'

const env = {
	scale: 150,
	background: 151,
	msg: document.querySelector('#msg') as HTMLSpanElement,
	restart: document.querySelector('#restart') as HTMLButtonElement,
	canvas: {
		ref: document.createElement('canvas'),
		size: {
			x: 450,
			y: 450
		}
	},
	starting: function (): () => string {
		let nodes = Array.from(document.querySelectorAll('input[name=starting]')) as HTMLInputElement[]

		return (): string => {
			for(const radio of nodes)
				if(radio.checked)
					return radio.value
			return ''
		}
	}()
}

let board: Board
const brain = new Brain()

;(window as any).setup = async function () {
	restartGame()
	brain.brain = await (await fetch('./decisions.json')).json()

	createCanvas(env.canvas.size.x, env.canvas.size.y)
	background(env.background)

	textAlign(CENTER, CENTER)
	textSize(env.scale)
	strokeWeight(15)
	stroke(255)
	fill(255)

	env.canvas.ref = document.querySelector('canvas') as HTMLCanvasElement

	env.canvas.ref.addEventListener('click', ({ layerX: x, layerY: y, target }) => {
		const { clientHeight: canvasHeight, clientWidth: canvasWidth } = (target as HTMLElement)

		const grid = [x / (canvasWidth / board.width), y / (canvasHeight / board.height)].map(e => Math.floor(e) as Coord)

		if (board.turn === 0 && board.tiles[grid[1]][grid[0]] === null) {
			const playerWon = board.playerMove(grid[1], grid[0])
			if(playerWon) endGame(0)
			if(board.full) endGame(null)

			if(!playerWon) {
				const { x, y } = brain.decide(board.rotations, board.mirrors)
				const AIWon = board.aiMove(x, y)
				if(AIWon) endGame(1)
				if(board.full) endGame(null)
			}
		}
	})

	env.restart.addEventListener('click', restartGame)
}

;(window as any).draw = function () {
	background(env.background)
	const { scale, canvas: { size } } = env

	board.tiles.forEach((row, y) =>
		row.forEach((sign , x) => {
			const txt = sign === null ? '' : sign === 0 ? board.signs.player : board.signs.AI
			text(txt, scale * (x + 1 / 2), scale * (y + 1 / 2))
			line(scale * x, 0, scale * x, size.y)
			line(0, scale * y, size.x, scale * y)
		})
	)
}

function endGame(winner: Sign) {
	env.msg.innerHTML = winner === 0 ? 'You won' : winner === 1 ? 'AI won' : 'Draw'
}

function restartGame() {
	board = new Board(3, 3, env.starting() === 'AI' ? 1 : 0)
	if(env.starting() === 'AI') {
		const { x, y } = brain.decide(board.rotations, board.mirrors)
		board.aiMove(x, y)
	}
	env.msg.innerHTML = ''
}
