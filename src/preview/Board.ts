import Tile from './Tile.js'

interface Signs {
	AI: string
	player: string
}

export default class Board {
	tiles: Tile[][]

	constructor(public width: number, public height: number) {
		this.tiles = new Array(height).fill(null).map((_, y) =>
			new Array(width).fill(null).map((_, x) =>
				new Tile(x as Coord, y as Coord, null)
			)
		)
	}

	draw(signs: Signs, scale: number, size: { x: number, y: number }) {
		this.tiles.forEach(row =>
			row.forEach(({ x, y, sign }) => {
				const txt = sign === null ? '' : sign === 0 ? signs.player : signs.AI
				text(txt, scale * (x + 1 / 2), scale * (y + 1 / 2))
				line(scale * x, 0, scale * x, size.y)
				line(0, scale * y, size.x, scale * y)
			})
		)
	}

	playerMove(x: number, y: number) {
		if (this.tiles[x][y].sign === null) {
			this.tiles[x][y].sign = 0
			window.dispatchEvent(new CustomEvent('aiTurn'))
			redraw()
		}
	}

	aiMove(x: number, y: number) {
		this.tiles[x][y].sign = 1
		window.dispatchEvent(new CustomEvent('playerTurn'))
		redraw()
	}
}
