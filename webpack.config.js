const path = require('path')

module.exports = {
  entry: {
    index: ['./src/index.js'],
  },
  output: {
    path: path.resolve(__dirname),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          'babel-loader',
        ],
      },
    ],
  },
  plugins: [],
}
