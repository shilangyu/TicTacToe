export const rotate = (matrix: any[][], how: number): any[][] => {
	const N = matrix.length - 1
	let result = matrix.map((row, i) =>
		row.map((_, j) => matrix[N - j][i])
	)

	for (let i = 0; i < how; i++) {
		result = result.map((row, i) =>
			row.map((_, j) => matrix[N - j][i])
		)
	}
	matrix.length = 0
	matrix.push(...result)
	return matrix
}

export const mirror = (matrix: any[][], how: number): any[][] => {
	const copy = matrix.map(row => row.map(e => Array.isArray(e) ? [...e] : e instanceof Object ? { ...e } : e))

	switch (how) {
		case 0:
			return matrix.map((row, i) =>
				row.map((_, j) => {
					const x = matrix.length - j - 1
					const y = matrix[i].length - i - 1
					return copy[x][y]
				})
			)

		case 1:
			return copy.map((row, i) =>
				row.map((_, j) => {
					const x = j
					const y = i
					return copy[x][y]
				})
			)

		case 2:
			return copy.map((row, i) =>
				row.map((_, j) => {
					const x = i
					const y = matrix[i].length - j - 1
					return copy[x][y]
				})
			)

		case 3:
			return copy.map((row, i) =>
				row.map((_, j) => {
					const x = matrix.length - i - 1
					const y = j
					return copy[x][y]
				})
			)
	}
	return Array(Array())
}

export const mapxy = (x: Coord, y: Coord, amount: number, what: 'rotation' | 'mirror'): Coord[] => {
	if(what === 'rotation') {
		x -= 1
		y -= 1
		const ang = (Math.PI / 2) * amount
		const cos = Math.cos(ang)
		const sin = Math.sin(ang)
		const rotatedX = Math.round(10000 * (x * cos - y * sin)) / 10000 + 1 as Coord
		const rotatedY = Math.round(10000 * (x * sin + y * cos)) / 10000 + 1 as Coord
		return [rotatedX, rotatedY]
	} else {
		switch (amount) {
			case 0:
				return [2 - y as Coord, 2 - x as Coord]
	
			case 1:
				return [y, x]

			case 2:
				return [x, 2 - y as Coord]
	
			case 3:
				return [2 - x as Coord, y]
		}
	}
	return [1]
}
