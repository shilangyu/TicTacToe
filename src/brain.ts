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

	decide(board: string[]): Choice {


		return
	}

	static parseBoard(board: Tile[][], player: string): string[] {
		const stringify = (signs: string[][]): string =>
			signs.flat().map(e => {
				if (e === player)
					return '0'
				else if (e !== '')
					return '1'
				else
					return 'null'
			}).join('')


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
