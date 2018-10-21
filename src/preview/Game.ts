interface Signs {
	AI: string
	player: string
}

export default class Game {
	turn: Sign
	constructor(private board: Tile[][], public signs: Signs) {
		this.turn = 0

		window.addEventListener('aiTurn', evt => {
			const outcome = this.win()
			if (outcome !== null || this.board.every(row => row.every(cell => cell.sign !== null)))
				this.endGame(outcome)

			this.turn = 1
		})
		window.addEventListener('playerTurn', evt => {
			const outcome = this.win()
			if (outcome !== null || this.board.every(row => row.every(cell => cell.sign !== null)))
				this.endGame(outcome)

			this.turn = 0
		})
	}

	endGame(winner: Sign) {
		(document.querySelector('#msg') as HTMLSpanElement).innerHTML = `
			${winner === 0 ? 'You won' : winner === 1 ? 'AI won' : 'Draw'} <br>
			<button onclick="window.location.reload()"> restart </button>
		`
	}

	win(): Sign {
		let correct = true
		let model: Sign

		for (const row of this.board) {
			correct = true
			model = row[0].sign
			for (const { sign } of row) {
				if (sign !== model) {
					correct = false
					break
				}
			}
			if (correct)
				return model
		}

		for (let i = 0; i < this.board.length; i++) {
			correct = true
			model = this.board[0][i].sign
			for (let j = 0; j < this.board[i].length; j++) {
				if (this.board[j][i].sign !== model) {
					correct = false
					break
				}
			}
			if (correct)
				return model
		}

		correct = true
		model = this.board[0][0].sign
		for (let i = 0; i < this.board.length; i++) {
			if (this.board[i][i].sign !== model) {
				correct = false
				break
			}
		}
		if (correct)
			return model

		correct = true
		model = this.board[0][2].sign
		for (let i = 0; i < this.board.length; i++) {
			if (this.board[i][2 - i].sign !== model) {
				correct = false
				break
			}
		}
		if (correct)
			return model

		return null
	}
}
