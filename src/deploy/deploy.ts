import * as cp from 'child_process'
import * as fs from 'fs'
import * as os from 'os'
import * as path from 'path'

const pjoin = (...strings: string[]) => path.join(__dirname, '..', ...strings)

fs.mkdtemp(os.tmpdir(), (err, tempPath) => {
	if (err) throw err

	cp.execSync(`git fetch`)
	cp.execSync(`git worktree add "${tempPath}" gh-pages`)
	cp.execSync(`git pull`)

	fs.readdirSync(pjoin('..', 'public'))
		.forEach(file => fs.copyFileSync(pjoin('..', 'public', file), path.join(tempPath, file)))

	cp.execSync(`cd "${tempPath}" && git add --all && git commit -m "${new Date().toLocaleString()}" && git push origin gh-pages && cd "${__dirname}"`)

	fs.unlinkSync(tempPath)
	cp.execSync(`git worktree prune`)
})
