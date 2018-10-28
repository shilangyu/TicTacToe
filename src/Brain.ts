import { mapxy } from './helper'

export default class Brain {
	brain: Decisions;

	constructor(public mode: 'dev' | 'prod' = 'prod') {
		this.brain = {}
	}

	mappedDecisions(rotations: string[], mirrors: string[]): Guess | FitGuess[] {
		for (let i = 0; i < rotations.length; i++) {
			const key = rotations[i]

			if (key in this.brain) {
				if (this.mode === 'prod') {
					let res = this.brain[key] as Guess
					let [x, y] = mapxy(res.x, res.y, i, 'rotation')
					return { x, y }
				} else {
					let res = this.brain[key] as FitGuess[]
					return res.map(e => {
						let [x, y] = mapxy(e.x, e.y, i, 'rotation')
						return {
							x, y, fitness: e.fitness
						}
					})
				}
			}
		}

		for (let i = 0; i < mirrors.length; i++) {
			const key = mirrors[i]

			if (key in this.brain) {
				if (this.mode === 'prod') {
					let res = this.brain[key] as Guess
					let [x, y] = mapxy(res.x, res.y, i, 'mirror')
					return { x, y }
				} else {
					let res = this.brain[key] as FitGuess[]
					return res.map(e => {
						let [x, y] = mapxy(e.x, e.y, i, 'mirror')
						return {
							x, y, fitness: e.fitness
						}
					})
				}
			}
		}
		return { x: -1 as Coord, y: -1 as Coord }
	}

	decide(rotations: string[], mirrors: string[]): Guess {
		if (this.mode === 'prod') {
			const guess = this.mappedDecisions(rotations, mirrors) as Guess
			return guess
		} else {
			const guesses = this.mappedDecisions(rotations, mirrors) as FitGuess[]
			if(!('x' in guesses)) {
				const random = guesses[Math.floor(Math.random() * guesses.length)]
				return { x: random.x, y: random.y }
			}
		}

		this.createMoves(rotations[0])
		return this.decide(rotations, mirrors)
	}

	private createMoves(board: string) {
		this.brain[board] = []
		const dec = this.brain[board] as FitGuess[]

		let specimen = board.replace(/[10]/g, '    ')
		if (!specimen.includes('null')) return

		do {
			let currField = specimen.lastIndexOf('null') / 4
			dec.push({
				x: Math.floor(currField / 3) as Coord,
				y: currField % 3 as Coord,
				fitness: 100
			})
			
			specimen = specimen.replace(/null(?<rest> *)$/, '    $<rest>')
		} while (specimen.includes('null'))
	}
}
