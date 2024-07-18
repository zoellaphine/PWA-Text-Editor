const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: 'Webpack Plugin',
        template: './index.html'
      }),
      new WebpackPwaManifest({
        name: 'Just Another Text Editor',
        short_name: "JATE",
        description: 'Just Another Text Editor',
        start_url: '/',
        publicPath: '/',
        background_color: '#7eb4e2',
        theme_color: '#7eb4e2',
        fingerprints: false,
        inject: true,
        icons: [
          {
            src: path.resolve('src/images/logo.png'),
            destination: path.join('assets', 'icons'),
            sizes: [96, 128, 192, 256, 384, 512]
          }
        ]
      }),
      new InjectManifest({
        swSrc: './src/js/src-sw.js',
        swDest: 'src-sw.js'
      })
    ],

    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader']
        },
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins:[
                '@babel/plugin-proposal-object-rest-spread',
                '@babel/transform-runtime'
              ]
            }
          }
        }
      ]
    }
  };
};
