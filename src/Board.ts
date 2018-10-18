class Board {
	tiles: Tile[][]

	constructor(public width: number, public height: number, public target?: HTMLCanvasElement) {
		this.tiles = new Array(height).fill(null).map((_, y) =>
			new Array(width).fill(null).map((_, x) =>
				({ x, y, sign: null })
			)
		)

		if (target)
			this.addEventListener()
	}

	draw(signs: { AI: string, player: string }) {
		this.tiles.forEach(row =>
			row.forEach(({ x, y, sign }) => {
				const txt = sign === null ? '' : sign === 0 ? signs.player : signs.AI
				text(txt, env.scale * (x + 1 / 2), env.scale * (y + 1 / 2))
				line(env.scale * x, 0, env.scale * x, env.canvasSize.y)
				line(0, env.scale * y, env.canvasSize.x, env.scale * y)
			})
		)
	}

	private addEventListener() {
		(this.target as HTMLCanvasElement).addEventListener('click', ({ clientX: x, clientY: y, target }) => {
			const { clientHeight: canvasHeight, clientWidth: canvasWidth } = (target as HTMLElement)

			const grid = [x / (canvasWidth / this.width), y / (canvasHeight / this.height)].map(Math.floor)

			this.tiles[grid[1]][grid[0]].sign = 0
			redraw()
		})
	}

	set canvas(ele: HTMLCanvasElement) {
		this.target = ele
		this.addEventListener()
	}
}
