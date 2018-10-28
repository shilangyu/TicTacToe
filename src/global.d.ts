// x, y coord of the tictactoe board
declare type Coord = 0 | 1 | 2

// sign representing the signs on a given tile
declare type Sign = 0 | 1 | null

// pre-prased decision guesses
declare interface FitGuess {
	x: Coord,
	y: Coord,
	fitness: number
}

// parsed decision guess
declare interface Guess {
	x: Coord,
	y: Coord
}

// object containing the whole brain
declare interface Decisions {
	[key: string]: Guess | FitGuess[]
}
