const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist/'),
    filename: 'bundle.js',
  },
  module: {
    loaders: [{
      test: /(\.js)|(\.jsx)$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      query: {
        compact:false,
        presets: [
          'babel-preset-es2015',
          'babel-preset-react',
          'babel-preset-stage-2',
        ].map(require.resolve),
      },
    }],
  },
};
