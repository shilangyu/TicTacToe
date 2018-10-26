export const rotate90 = (matrix: any[][]): any[][] => {
	const N = matrix.length - 1
	const result = matrix.map((row, i) =>
		row.map((_, j) => matrix[N - j][i])
	)
	matrix.length = 0
	matrix.push(...result)
	return matrix
}

export const mapxy = (x: Coord, y: Coord, rotation: 0 | 1 | 2 | 3): Coord[] => {
	x -= 1
	y -= 1
	const ang = (Math.PI / 2) * rotation
	const cos = Math.cos(ang)
	const sin = Math.sin(ang)
	const rotatedX = Math.round(10000 * (x * cos - y * sin)) / 10000 + 1 as Coord
	const rotatedY = Math.round(10000 * (x * sin + y * cos)) / 10000 + 1 as Coord
	return [rotatedX, rotatedY]
}
