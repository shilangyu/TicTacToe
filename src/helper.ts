export const rotate = (matrix: any[][], amount: number): any[][] => {
	let copy = matrix.map(row => row.map(e => e))

	return copy.map((row, i) =>
		row.map((_, j) => {
			let [x, y] = mapxy(i as Coord, j as Coord, amount, 'rotation')
			return matrix[x][y]
		})
	)
}

export const mirror = (matrix: any[][], amount: number): any[][] => {
	const copy = matrix.map(row => row.map(e => e))
	let mapper: (x: Coord, y: Coord) => any

	switch (amount) {
		case 0:
			mapper = (x, y) => copy[matrix.length - y - 1][matrix[x].length - x - 1]
			break

		case 1:
			mapper = (x, y) => copy[y][x]
			break

		case 2:
			mapper = (x, y) => copy[x][matrix[x].length - y - 1]
			break

		case 3:
			mapper = (x, y) => copy[matrix.length - x - 1][y]
			break
	}

	return matrix.map((row, i) => row.map((_, j) => mapper(i as Coord, j as Coord)))
}

export const mapxy = (x: Coord, y: Coord, amount: number, what: 'rotation' | 'mirror'): Coord[] => {
	if (what === 'rotation') {
		x -= 1
		y -= 1
		const ang = (Math.PI / 2) * amount
		const cos = Math.cos(ang)
		const sin = Math.sin(ang)
		const rotatedX = (Math.round(x * cos - y * sin) + 1) as Coord
		const rotatedY = (Math.round(x * sin + y * cos) + 1) as Coord
		return [rotatedX, rotatedY]
	} else {
		switch (amount) {
			case 0:
				return [(2 - y) as Coord, (2 - x) as Coord]

			case 1:
				return [y, x]

			case 2:
				return [x, (2 - y) as Coord]

			case 3:
				return [(2 - x) as Coord, y]
		}
	}
	return [1]
}

export const unmapxy = (
	x: Coord,
	y: Coord,
	amount: number,
	what: 'rotation' | 'mirror'
): Coord[] => {
	if (what === 'rotation') amount = 4 - amount
	return mapxy(x, y, amount, what)
}
