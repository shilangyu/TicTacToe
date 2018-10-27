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
				const { x, y } = (this.mode === 'prod' ? this.brain[key] : (this.brain[key] as FitGuess[]).sort((a, b) => b.fitness - a.fitness)[0]) as Guess
				const [mappedX, mappedY] = mapxy(x, y, i, 'rotation')
				return { x: mappedX as Coord, y: mappedY as Coord}
			}
		}

		for (let i = 0; i < mirrors.length; i++) {
			const key = mirrors[i]

			if (key in this.brain) {
				const { x, y } = (this.mode === 'prod' ? this.brain[key] : (this.brain[key] as FitGuess[]).sort((a, b) => b.fitness - a.fitness)[0]) as Guess
				const [mappedX, mappedY] = mapxy(x, y, i, 'mirror')
				return { x: mappedX as Coord, y: mappedY as Coord}
			}
		}

		return {
			x: -1 as Coord,
			y: -1 as Coord
		}
	}
}
