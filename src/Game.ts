interface Signs {
	AI: string
	player: string
}

class Game {
	turn: Sign
	constructor(private board: Tile[][], public signs: Signs) {
		this.turn = 0

		window.addEventListener('aiTurn', evt => this.turn = 1)
		window.addEventListener('playerTurn', evt => this.turn = 0)
	}
}
