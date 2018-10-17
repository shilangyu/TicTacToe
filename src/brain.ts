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

	static parseBoard(board: Tile[][], player: string): string[] {
		const stringify = (signs: string[][]) => 
			signs.flat().map(e => {
				if(e === player)
					return '0'
				else if(e !== '')
					return '1'
				else 
					return 'null'
			}).join('')
			
		const signs = board.map(row => row.map(({ sign }) => sign))
		stringify(signs)

		return [stringify(signs)]
	}
}
