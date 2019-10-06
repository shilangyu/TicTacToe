import { mirror, rotate } from './helper'

export interface Signs {
	AI: string
	player: string
}

export default class Board {
	tiles: Sign[][]
	turn: Sign

	constructor(
		public width: number,
		public height: number,
		starting: Sign = 0,
		public signs: Signs = { AI: '○', player: '×' }
	) {
		this.tiles = new Array(height).fill(null).map(() => new Array(width).fill(null))
		this.turn = starting
	}

	get full() {
		return this.tiles.every(row => row.every(sign => sign !== null))
	}

	get stringified(): string {
		return this.tiles
			.map(row => row.map(sign => sign))
			.reduce((prev, curr) => [...prev, ...curr], [])
			.map(String)
			.join('')
	}

	get rotations(): string[] {
		const temp = new Board(3, 3)
		temp.tiles = this.tiles.map(row => row.map(sign => sign))
		const base = this.tiles.map(row => row.map(sign => sign))

		const result: string[] = []
		for (let i = 0; i < 4; i++) {
			temp.tiles = rotate(base, i)
			result.push(temp.stringified)
		}

		return result
	}

	get mirrors(): string[] {
		const temp = new Board(3, 3)
		temp.tiles = this.tiles.map(row => row.map(sign => sign))
		const base = this.tiles.map(row => row.map(sign => sign))

		const result: string[] = []
		for (let i = 0; i < 4; i++) {
			temp.tiles = mirror(base, i)
			result.push(temp.stringified)
		}

		return result
	}

	playerMove(x: Coord, y: Coord): boolean {
		this.move(x, y, 0)
		return this.win() === 0
	}

	aiMove(x: Coord, y: Coord): boolean {
		this.move(x, y, 1)
		return this.win() === 1
	}

	private move(x: Coord, y: Coord, whose: Sign) {
		this.tiles[x][y] = whose
		this.toggleTurn()
	}

	private toggleTurn() {
		if (this.win() === null && !this.full) this.turn = this.turn ? 0 : 1
		else this.turn = null
	}

	win(): Sign {
		let correct = true
		let model: Sign

		for (const row of this.tiles) {
			correct = true
			model = row[0]
			if (model === null) continue
			for (const sign of row) {
				if (sign !== model) {
					correct = false
					break
				}
			}
			if (correct) return model
		}

		for (let i = 0; i < this.tiles.length; i++) {
			correct = true
			model = this.tiles[0][i]
			if (model === null) continue
			for (let j = 0; j < this.tiles[i].length; j++) {
				if (this.tiles[j][i] !== model) {
					correct = false
					break
				}
			}
			if (correct) return model
		}

		correct = true
		model = this.tiles[0][0]
		if (model !== null) {
			for (let i = 0; i < this.tiles.length; i++) {
				if (this.tiles[i][i] !== model) {
					correct = false
					break
				}
			}
			if (correct) return model
		}

		correct = true
		model = this.tiles[0][2]
		if (model !== null) {
			for (let i = 0; i < this.tiles.length; i++) {
				if (this.tiles[i][2 - i] !== model) {
					correct = false
					break
				}
			}
			if (correct) return model
		}
		return null
	}
}
