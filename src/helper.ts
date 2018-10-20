import * as fs from 'fs'
import * as path from 'path'


export const productionDecision = (): string => {
	interface Guess {
		x: number,
		y: number
	}
	
	interface FitGuess {
		x: number,
		y: number,
		fitness: number
	}

	interface Decisions {
		[key: string]: Guess
	}

	const decs = JSON.parse(fs.readFileSync(path.join(__dirname, 'trainer', 'decision.json')).toString())

	const parsedDecisions: Decisions = {}

	for(const key of Object.keys(decs)) {
		const best = (decs[key] as FitGuess[]).sort((a, b) => b.fitness - a.fitness)[0]

		parsedDecisions[key] = {
			x: best.x,
			y: best.y
		}
	}

	return JSON.stringify(parsedDecisions)
} 
