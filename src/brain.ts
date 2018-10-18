interface Choice {
	x: number,
	y: number,
	fitness: number
}

interface Decisions {
	[key: string]: Choice[]
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
		for (const key of boards) {
			if(key in this.brain) {
				return this.brain[key].sort((a, b) => b.fitness - a.fitness)[0]
			}
		}
		return {
			x: -1,
			y: -1,
			fitness: -1
		}
	}

	static parseBoard(board: Tile[][]): string[] {
		const stringify = (signs: Sign[][]): string =>
			signs.flat().map(String).join('')


		const rotate = (matrix: any[][]): any[][] => {
			const N = matrix.length - 1
			const result = matrix.map((row, i) =>
				row.map((val, j) => matrix[N - j][i])
			)
			matrix.length = 0     
			matrix.push(...result)
			return matrix
		}

		let signs = board.map(row => row.map(({ sign }) => sign))

		const result: string[] = []
		for(let i = 0; i < 4; i++) {
			result.push(stringify(signs))
			signs = rotate(signs)
		}

		return result
	}
}
