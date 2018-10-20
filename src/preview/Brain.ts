interface Choice {
	x: number,
	y: number
}

interface Decisions {
	[key: string]: Choice
}


class Brain {
	brain: Decisions;

	constructor(public source: string) {
		this.brain = {}

		fetch(source)
			.then(res => res.json())
			.then(json => this.brain = json)
	}

	decide(boards: string[]): Choice {
		for (let i = 0; i < boards.length; i++) {
			const key = boards[i]

			if (key in this.brain) {
				const { x, y } = this.brain[key]
				const ang = (Math.PI / 2) * i
				const cos = Math.cos(ang)
				const sin = Math.sin(ang)
				const rotatedX = Math.round(10000 * ((x - 1) * cos - (y - 1) * sin)) / 10000
				const rotatedY = Math.round(10000 * ((x - 1) * sin + (y - 1) * cos)) / 10000
				return { x: rotatedX+1, y: rotatedY+1 }
			}
		}

		return {
			x: -1,
			y: -1
		}
	}

	static parseBoard(board: Tile[][]): string[] {
		const stringify = (signs: Sign[][]): string =>
			signs.flat().map(String).join('')


		const rotate = (matrix: any[][]): any[][] => {
			const N = matrix.length - 1
			const result = matrix.map((row, i) =>
				row.map((_, j) => matrix[N - j][i])
			)
			matrix.length = 0
			matrix.push(...result)
			return matrix
		}

		let signs = board.map(row => row.map(({ sign }) => sign))

		const result: string[] = []
		for (let i = 0; i < 4; i++) {
			result.push(stringify(signs))
			signs = rotate(signs)
		}

		return result
	}
}
