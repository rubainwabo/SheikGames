import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';

export default {
  entry: './src/App.js',
  output: {
    path: path.resolve(process.cwd(), 'dist'),  // Use `process.cwd()` to make it work cross-platform
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ],
  devServer: {
    static: path.resolve(process.cwd(), 'dist'),
    port: 3000,
    open: true
  }
};
