import Brain from '../Brain'
import Board from '../Board'

const env = {
	scale: 150,
	background: '#9198a3',
	strokes: '#ffffff',
	msg: document.querySelector('#msg') as HTMLSpanElement,
	restart: document.querySelector('#restart') as HTMLButtonElement,
	canvas: {
		ref: document.querySelector('canvas') as HTMLCanvasElement,
		size: {
			x: 450,
			y: 450
		},
		ctx:(document.querySelector('canvas') as HTMLCanvasElement).getContext('2d') as CanvasRenderingContext2D
	},
	starting: function (): () => string {
		let nodes = Array.from(document.querySelectorAll('input[name=starting]')) as HTMLInputElement[]

		return (): string => {
			for(const radio of nodes)
				if(radio.checked)
					return radio.value
			return ''
		}
	}(),
	fps: 60
}

let board: Board
const brain = new Brain()

async function setup () {
	restartGame()

	brain.brain = await (await fetch('./decisions.json')).json()

	env.canvas.ref.width = env.canvas.size.x
	env.canvas.ref.height = env.canvas.size.y

	env.canvas.ctx.textAlign = 'center'
	env.canvas.ctx.textBaseline = 'middle'


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
setup()


setInterval(() => {
	const { scale, canvas: { size, ref, ctx } } = env
	ctx.fillStyle = env.background
	ctx.fillRect(0, 0, ref.width, ref.height)

	board.tiles.forEach((row, y) =>
		row.forEach((sign , x) => {
			const txt = sign === null ? '' : sign === 0 ? board.signs.player : board.signs.AI
			ctx.fillStyle = env.strokes
			ctx.font = `${scale}px sans-serif`
			ctx.fillText(txt, scale * (x + 1 / 2), scale * (y + 1 / 2))

			ctx.lineWidth = env.scale / 10
			ctx.strokeStyle = env.strokes

			ctx.beginPath()

			ctx.moveTo(scale * x, 0)
			ctx.lineTo(scale * x, size.y)
			ctx.stroke()
			
			ctx.moveTo(0, scale * y)
			ctx.lineTo(size.x, scale * y)
			ctx.stroke()
		})
	)
}, 1000 / env.fps)

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
