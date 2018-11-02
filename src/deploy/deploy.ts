import * as cp from 'child_process'
import * as fs from 'fs'
import * as path from 'path'

const rootDir = (...strings: string[]) => path.join(__dirname, '..', '..', ...strings)

fs.mkdtemp('temp', (err, tempPath) => {
	if (err) throw err

	cp.execSync(`git worktree add "${tempPath}" gh-pages`)

	fs.readdirSync(rootDir('public')).forEach(file =>
		fs.copyFileSync(rootDir('public', file), path.join(tempPath, file))
	)

	cp.execSync(
		`cd "${tempPath}" && git add --all && git commit -m "${new Date().toLocaleString()}" && git push origin gh-pages && cd "${__dirname}"`
	)

	fs.readdirSync(tempPath)
		.map(file => path.join(tempPath, file))
		.forEach(path => {
			fs.unlinkSync(path)
		})
	fs.rmdirSync(tempPath)

	cp.execSync(`git worktree prune`)
})
