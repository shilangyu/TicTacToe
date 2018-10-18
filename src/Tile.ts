declare type Sign = (0 | 1 | null)

interface Tile {
	x: number,
	y: number,
	sign: Sign
}

class Tile {
	constructor(data: Tile) {
		this.x = data.x
		this.y = data.y
		this.sign = data.sign
	}
}
