import { writeFileSync } from 'fs'
import { join, resolve } from 'path'
import { Configuration } from 'webpack'

writeFileSync(
	join(__dirname, 'public', 'decisions.json'),
	JSON.stringify(require('./src/trainer/decisions.json')),
	{ encoding: 'utf-8' }
)

const config: Configuration = {
	entry: './src/preview/sketch.ts',
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: 'ts-loader',
				exclude: /node_modules/
			}
		]
	},
	resolve: {
		extensions: ['.ts']
	},
	mode: 'production',
	output: {
		filename: 'bundle.js',
		path: resolve(__dirname, 'public')
	}
}

export default config
