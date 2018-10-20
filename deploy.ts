import * as cp from 'child_process'
import * as fs from 'fs'
import * as os from 'os'
import * as path from 'path'

const pjoin = (...strings: string[]) => path.join(__dirname, ...strings)

fs.mkdtemp(os.tmpdir(), (err, tempPath) => {
	if (err) throw err

	cp.execSync(`git worktree add "${tempPath}" gh-pages`)

	fs.readdirSync('./build/preview')
		.forEach(file => fs.copyFileSync(pjoin('build', 'preview', file), path.join(tempPath, file)))

	fs.copyFileSync(pjoin('src', 'preview', 'index.html'), path.join(tempPath, 'index.html'))
	fs.copyFileSync(pjoin('src', 'trainer', 'decision.json'), path.join(tempPath, 'decision.json'))

	cp.execSync(`cd "${tempPath}" && git add --all && git commit -m "${new Date().toLocaleString()}" && git push origin gh-pages && cd "${__dirname}"`)
	
	cp.execSync(`git worktree prune`)
	fs.unlinkSync(tempPath)
})
