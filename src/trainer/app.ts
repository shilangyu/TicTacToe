import { writeFileSync } from 'fs'
import { join } from 'path'
import Board from '../Board'
import Brain from '../Brain'
import { unmapxy } from '../helper'

const decision = require('./decisions.json')

let board: Board
const brain = new Brain()
brain.brain = decision

const games = Number(process.argv[2])

if (
	process.argv.includes('help') ||
	process.argv.includes('-h') ||
	process.argv.includes('--help')
) {
	console.log(`
Usage: 
	node trainer <amount of games>

Flags: 
	--player: trains the AI where the player starts
	--AI: trains the AI where the AI starts

Description:
	Trains the decision.json file. When no such move exists, creates it. If AI did a mistake, never does it again. If AI did a winning move, does it everytime after. By default it alters between AI and player starting moves unless theres a flag that overwrites it.
	`)
	process.exit()
}

const playerMove = (board: Sign[][]): [Coord, Coord] => {
	let choices: number[][] = []
	board.flat().forEach((sign, i) => {
		if (sign === null) choices.push([Math.floor(i / 3), i % 3])
	})

	const [x, y] = choices[Math.floor(Math.random() * choices.length)] as Coord[]
	return [x, y]
}

const starting = (function() {
	let starter: () => 0 | 1
	if (process.argv.includes('--player')) starter = () => 0
	else if (process.argv.includes('--AI')) starter = () => 1
	else starter = () => Math.floor(Math.random() * 2) as 0 | 1

	return starter
})()

let off = 0,
	def = 0
for (let i = 0; i < games; i++) {
	process.stdout.write(`\r${((i / games) * 100).toFixed(2).padStart(5)}%`)
	board = new Board(3, 3, starting())
	let moves = starting()

	let prevX: Coord = 0,
		prevY: Coord = 0
	let prevRotations: string[] = [],
		prevMirrors: string[] = []

	while (true) {
		let x: Coord, y: Coord
		let { rotations, mirrors } = board

		if (++moves % 2) {
			;[x, y] = playerMove(board.tiles)
			board.playerMove(x, y)
		} else {
			const { x: xx, y: yy } = brain.decide(board.rotations, board.mirrors)
			x = xx
			y = yy
			board.aiMove(x, y)
		}

		const outcome = board.win()
		if (outcome === 0) {
			let i = 0
			for (const key of [...prevRotations, ...prevMirrors]) {
				if (key in brain.brain) {
					let target = brain.brain[key] as FitGuess[]
					if (target.length === 1) break

					let [xx, yy] = unmapxy(prevX, prevY, i % 4, i < 4 ? 'rotation' : 'mirror')

					target.splice(target.indexOf(target.find(e => e.x === xx && e.y === yy) as FitGuess), 1)
					def++
					break
				}
				i++
			}
			break
		} else if (outcome === 1) {
			let i = 0
			for (const key of [...rotations, ...mirrors]) {
				if (key in brain.brain) {
					let target = brain.brain[key] as FitGuess[]
					if (target.length === 1) break

					let [xx, yy] = unmapxy(x, y, i % 4, i < 4 ? 'rotation' : 'mirror')
					;(brain.brain[key] as FitGuess[]) = [
						{
							x: xx,
							y: yy,
							fitness: 100
						}
					]
					off++
					break
				}
				i++
			}
			break
		} else if (board.full) {
			break
		}
		;[prevX, prevY] = [x, y]
		;[prevRotations, prevMirrors] = [rotations, mirrors]
	}
}

writeFileSync(join(__dirname, 'decisions.json'), JSON.stringify(brain.brain, null, 4))

process.stdout.write(`\rLearned ${def} new defensive moves and ${off} offensive ones.`)
