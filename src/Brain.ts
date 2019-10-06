import { mapxy } from './helper'

export default class Brain {
	brain: Decisions

	constructor() {
		this.brain = {}
	}

	mappedDecisions(rotations: string[], mirrors: string[]): FitGuess[] {
		let i = 0
		for (const key of [...rotations, ...mirrors]) {
			if (key in this.brain) {
				let res = this.brain[key]
				return res.map(e => {
					let [x, y] = mapxy(e.x, e.y, i % 4, i < 4 ? 'rotation' : 'mirror')
					return {
						x,
						y,
						fitness: e.fitness
					}
				})
			}
			i++
		}

		return []
	}

	decide(rotations: string[], mirrors: string[]): Guess {
		const guesses = this.mappedDecisions(rotations, mirrors)
		if (guesses.length) {
			return guesses[Math.floor(Math.random() * guesses.length)]
		}

		this.createMoves(rotations[0])
		return this.decide(rotations, mirrors)
	}

	private createMoves(board: string) {
		this.brain[board] = []
		const dec = this.brain[board]

		let specimen = board.replace(/[10]/g, '    ')
		if (!specimen.includes('null')) return

		do {
			let currField = specimen.lastIndexOf('null') / 4
			dec.push({
				x: Math.floor(currField / 3) as Coord,
				y: (currField % 3) as Coord,
				fitness: 100
			})

			specimen = specimen.replace(/null(?<rest> *)$/, '    $<rest>')
		} while (specimen.includes('null'))
	}
}
