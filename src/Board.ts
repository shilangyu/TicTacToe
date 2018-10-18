class Board {
	tiles: Tile[][]
	constructor(public width: number, public height: number) {
		this.tiles = new Array(height).fill(null).map((e, y) =>
			new Array(width).fill(null).map((e, x) =>
				({ x, y, sign: null })
			)
		)
	}
}
