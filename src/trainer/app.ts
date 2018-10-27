import * as fs from 'fs'
import * as path from 'path'

import Brain from '../preview/Brain'
import Board from '../preview/Board'
const decision = require('./decision.json')

let board: Board
const brain = new Brain('dev')
brain.brain = decision

const games = Number(process.argv[2])


const playerMove = (): [Coord, Coord] => {
	const randMove = (): Coord[] =>
		new Array(2).fill(null).map(e => Math.floor(Math.random() * 3) as Coord)

	let playerX: Coord, playerY: Coord
	do {
		[playerX, playerY] = randMove()
	} while (board.tiles[playerX][playerY].sign !== null)

	return [playerX, playerY]
}


for (let i = 0; i < games; i++) {
	board = new Board(3, 3, 'dev')
	let moves = 0

	while (true) {
		let x: Coord, y: Coord
		let { rotations, mirrors } = board

		if (++moves % 2) {
			[x, y] = playerMove()
			board.playerMove(x, y)
		} else {
			const { x: xx, y: yy } = brain.decide(board.rotations, board.mirrors)
			x = xx
			y = yy
			board.aiMove(x, y)
		}

		const outcome = board.win()
		if (outcome === 0) {

			break
		} else if (outcome === 1) {
			for (const key of [...rotations, ...mirrors]) {
				if(key in brain.brain) {
					(brain.brain[key] as FitGuess[]) = [{
						x, y, fitness: 100
					}]
					break
				}
			}
			break
		} else if (board.full) {
			break
		}
	}
}

fs.writeFileSync(path.join(__dirname, 'decision.json'), JSON.stringify(brain.brain, null, 4))
