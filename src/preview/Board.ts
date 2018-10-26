import Tile from './Tile'
import { rotate90 } from '../helper'

interface Signs {
	AI: string
	player: string
}

export default class Board {
	tiles: Tile[][]
	turn: Sign

	constructor(public width: number, public height: number, public mode: 'dev' | 'prod' = 'prod', public signs: Signs = {AI: 'o', player: '×'} ) {
		this.tiles = new Array(height).fill(null).map((_, y) =>
			new Array(width).fill(null).map((_, x) =>
				new Tile(x as Coord, y as Coord, null)
			)
		)
		this.turn = 0
	}

	draw(scale: number, size: { x: number, y: number }) {
		this.tiles.forEach(row =>
			row.forEach(({ x, y, sign }) => {
				const txt = sign === null ? '' : sign === 0 ? this.signs.player : this.signs.AI
				text(txt, scale * (x + 1 / 2), scale * (y + 1 / 2))
				line(scale * x, 0, scale * x, size.y)
				line(0, scale * y, size.x, scale * y)
			})
		)
	}

	private toggleTurn() {
		const outcome = this.win()
		if (outcome !== null || this.tiles.every(row => row.every(cell => cell.sign !== null)))
			this.endGame(outcome)

		this.turn = 0 ? 1 : 0
		if(this.mode === 'prod')
			redraw()
	}

	get stringified(): string {
		return this.tiles
			.map(row => row.map(({ sign }) => sign))
			.reduce((prev, curr) => [...prev, ...curr], [])
			.map(String)
			.join('')
	}

	get rotations(): string[] {
		const temp = new Board(3, 3)
		temp.tiles = this.tiles.map(row => row.map(e => ({...e})))
		const result: string[] = []
		for (let i = 0; i < 4; i++) {
			result.push(temp.stringified)
			temp.tiles = rotate90(temp.tiles)
		}
		return result
	}

	playerMove(x: Coord, y: Coord) {
		if (this.tiles[x][y].sign === null) {
			this.tiles[x][y].sign = 0
			this.toggleTurn()
		}
	}

	aiMove(x: Coord, y: Coord) {
		this.tiles[x][y].sign = 1
		this.toggleTurn()
	}

	endGame(winner: Sign) {
		if(this.mode === 'dev') {
			console.log(winner === 0 ? 'You won' : winner === 1 ? 'AI won' : 'Draw')
		} else {
			(document.querySelector('#msg') as HTMLSpanElement).innerHTML = `
				${winner === 0 ? 'You won' : winner === 1 ? 'AI won' : 'Draw'} <br>
				<button onclick="window.location.reload()"> restart </button>
			`
		}
	}

	win(): Sign {
		let correct = true
		let model: Sign

		for (const row of this.tiles) {
			correct = true
			model = row[0].sign
			for (const { sign } of row) {
				if (sign !== model) {
					correct = false
					break
				}
			}
			if (correct)
				return model
		}

		for (let i = 0; i < this.tiles.length; i++) {
			correct = true
			model = this.tiles[0][i].sign
			for (let j = 0; j < this.tiles[i].length; j++) {
				if (this.tiles[j][i].sign !== model) {
					correct = false
					break
				}
			}
			if (correct)
				return model
		}

		correct = true
		model = this.tiles[0][0].sign
		for (let i = 0; i < this.tiles.length; i++) {
			if (this.tiles[i][i].sign !== model) {
				correct = false
				break
			}
		}
		if (correct)
			return model

		correct = true
		model = this.tiles[0][2].sign
		for (let i = 0; i < this.tiles.length; i++) {
			if (this.tiles[i][2 - i].sign !== model) {
				correct = false
				break
			}
		}
		if (correct)
			return model

		return null
	}
}
