// webpack.config.js
const path = require('path');

module.exports = {
  mode: 'development',
  // Tell webpack how to handle .feature files
  module: {
    rules: [
      {
        test: /\.feature$/,
        use: 'raw-loader',
        include: [path.resolve(__dirname)]
      },
      // Add rules for JS/TS files if needed
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      },
      // Add CSS rule if needed
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.feature']
  }
};
