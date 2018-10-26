export default class Brain {
	brain: Decisions;

	constructor() {
		this.brain = {}
	}

	decide(boards: string[]): Guess {
		for (let i = 0; i < boards.length; i++) {
			const key = boards[i]

			if (key in this.brain) {
				const { x, y } = this.brain[key] as Guess
				const ang = (Math.PI / 2) * i
				const cos = Math.cos(ang)
				const sin = Math.sin(ang)
				const rotatedX = Math.round(10000 * ((x - 1) * cos - (y - 1) * sin)) / 10000
				const rotatedY = Math.round(10000 * ((x - 1) * sin + (y - 1) * cos)) / 10000
				return { x: rotatedX+1 as Coord, y: rotatedY+1 as Coord}
			}
		}

		return {
			x: -1 as Coord,
			y: -1 as Coord
		}
	}
}
