const [path, fs] = ['path', 'fs'].map(require)

const decs = JSON.parse(fs.readFileSync(path.join(__dirname, 'src', 'trainer', 'decision.json')).toString())

const parsedDecisions = {}

for (const key of Object.keys(decs)) {
  const best = decs[key].sort((a, b) => b.fitness - a.fitness)[0]

  parsedDecisions[key] = {
    x: best.x,
    y: best.y
  }
}

fs.writeFileSync(path.join(__dirname, 'public', 'parsed-decision.json'), JSON.stringify(parsedDecisions), {
  encoding: 'utf-8'
})

module.exports = {
  entry: './build/preview/sketch.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public')
  }
}
