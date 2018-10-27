import { mapxy } from '../helper'

export default class Brain {
	brain: Decisions;

	constructor(public mode: 'dev' | 'prod' = 'prod') {
		this.brain = {}
	}

	decide(rotations: string[], mirrors: string[]): Guess {
		for (let i = 0; i < rotations.length; i++) {
			const key = rotations[i]

			if (key in this.brain) {
				let x: Coord, y: Coord
				if(this.mode === 'prod') {
					let res = this.brain[key] as Guess
					x = res.x
					y = res.y
				} else {
					let res = this.brain[key] as FitGuess[]
					let random = res[Math.floor(Math.random() * res.length)]
					x = random.x
					y = random.y
				}
				const [mappedX, mappedY] = mapxy(x, y, i, 'rotation')
				return { x: mappedX as Coord, y: mappedY as Coord}
			}
		}

		for (let i = 0; i < mirrors.length; i++) {
			const key = mirrors[i]

			if (key in this.brain) {
				let x: Coord, y: Coord
				if(this.mode === 'prod') {
					let res = this.brain[key] as Guess
					x = res.x
					y = res.y
				} else {
					let res = this.brain[key] as FitGuess[]
					let random = res[Math.floor(Math.random() * res.length)]
					x = random.x
					y = random.y
				}
				const [mappedX, mappedY] = mapxy(x, y, i, 'mirror')
				return { x: mappedX as Coord, y: mappedY as Coord}
			}
		}

		if(this.mode === 'dev') {
			this.createMoves(rotations[0])
			return this.decide(rotations, mirrors)
		}

		return {
			x: -1 as Coord,
			y: -1 as Coord
		}
	}

	private createMoves(board: string) {
		this.brain[board] = []
		const dec = this.brain[board] as FitGuess[]

		let specimen = board.replace(/[10]/g, '    ')
		if(specimen.indexOf('null') === -1) return

		do {
			let currField = specimen.lastIndexOf('null') / 4
			dec.push({
				x: Math.floor(currField / 3) as Coord,
				y: currField % 3 as Coord,
				fitness: 100
			})

			specimen = specimen.replace(/null(?! +)$/, '    ')
		} while(specimen.indexOf('null') !== -1)
	}
}
