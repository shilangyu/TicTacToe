interface Signs {
	AI: string
	player: string
}

class Game {
	constructor(public board: Tile[][], public signs: Signs) {
		
	}
}
