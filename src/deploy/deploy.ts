import * as cp from 'child_process'
import * as fs from 'fs'
import * as os from 'os'
import * as path from 'path'

const productionDecision = (): string => {
	const decs = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'trainer', 'decision.json')).toString()) as Decisions

	const parsedDecisions: Decisions = {}

	for (const key of Object.keys(decs)) {
		const best = (decs[key] as FitGuess[]).sort((a, b) => b.fitness - a.fitness)[0]

		parsedDecisions[key] = {
			x: best.x,
			y: best.y
		}
	}

	return JSON.stringify(parsedDecisions)
}

const pjoin = (...strings: string[]) => path.join(__dirname, '..', ...strings)

fs.mkdtemp(os.tmpdir(), (err, tempPath) => {
	if (err) throw err

	cp.execSync(`git fetch`)
	cp.execSync(`git worktree add "${tempPath}" gh-pages`)
	cp.execSync(`git pull`)

	fs.readdirSync(pjoin('..', 'build', 'preview'))
		.forEach(file => fs.copyFileSync(pjoin('..', 'build', 'preview', file), path.join(tempPath, file)))

	fs.copyFileSync(pjoin('preview', 'index.html'), path.join(tempPath, 'index.html'))
	fs.writeFileSync(path.join(tempPath, 'parsed-decision.json'), productionDecision(), { encoding: 'utf-8' })

	cp.execSync(`cd "${tempPath}" && git add --all && git commit -m "${new Date().toLocaleString()}" && git push origin gh-pages && cd "${__dirname}"`)

	fs.unlinkSync(tempPath)
	cp.execSync(`git worktree prune`)
})
