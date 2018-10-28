const [path, fs] = ['path', 'fs'].map(require)


fs.writeFileSync(
  path.join(__dirname, 'public', 'parsed-decision.json'),
  JSON.stringify(require('./src/trainer/decision.json')),
  { encoding: 'utf-8' }
)

module.exports = {
  entry: './build/preview/sketch.js',
  mode: 'production',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public')
  }
}
