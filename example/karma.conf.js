module.exports = karma =>
	karma.set({
		port: 9876,
		frameworks: ['mocha'],
		files: [
			'tests/index.test.js'
		],
		preprocessors: {
			'tests/index.test.js': ['webpack', 'sourcemap']
		},
		plugins: [
			'karma-webpack',
			'karma-mocha',
			'karma-chai',
			'karma-chrome-launcher',
			'karma-mocha-reporter',
			'karma-sourcemap-loader',
			'@neuralegion/karma-nexmock-reporter'
		],
		webpack: {
			mode: 'development',
			devtool: 'inline-source-map',
			module: {
				rules: [
					{
						test: /\.js$/,
						loader: 'babel-loader',
						exclude: /node_modules/,
						query: {
							babelrc: false, // ignore any .babelrc in project & dependencies
							cacheDirectory: true,
							plugins: ['transform-runtime'],
							presets: ['env']
						}
					}
				]
			}
		},
		reporters: ['mocha', 'nexmock'],
		nexmock: {
			path: '.nexmock'
		}
	});

