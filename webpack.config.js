const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const fs = require('fs');
const autoprefixer = require('autoprefixer');
const webpack = require('webpack');

function generateHtmlPlugins(templateDir) {
  const templateFiles = fs.readdirSync(path.resolve(__dirname, templateDir));
  return templateFiles.map(item => {
    const parts = item.split('.');
    const name = parts[0];
    const extension = parts[1];
    return new HtmlWebpackPlugin({
      filename: `${name}.html`,
      template: path.resolve(__dirname, `${templateDir}/${name}.${extension}`),
      inject: false,
    })
  })
}

const htmlPlugins = generateHtmlPlugins('./src/html/views');

const PATHS = {
    source: path.join(__dirname, 'source'),
    build: path.join(__dirname, 'build')
};

module.exports = {
  entry: [
    './src/js/index.js',
    './src/scss/common.scss'
  ],
  output: {
    filename: './js/bundle.js',
      path: path.resolve(__dirname, 'dist/')
  },
  watch: true,
  devtool: "source-map",
  module: {
    rules: [{
        test: /\.js$/,
        include: path.resolve(__dirname, 'src/js'),
        use: {
          loader: 'babel-loader',
          options: {
            presets: 'env'
          }
        }
      },
      {
        test: /\.(sass|scss)$/,
        include: path.resolve(__dirname, 'src/scss'),
        use: ExtractTextPlugin.extract({
          use: [{
              loader: "css-loader",
              options: {
                sourceMap: true,
                minimize: true,
                url: false
              }
            },
            {
                loader: 'postcss-loader',
                options: {
                    plugins: [
                        autoprefixer({
                            browsers:['ie >= 11', 'last 4 version']
                        })
                    ],
                    sourceMap: true
                }
            },
            {
              loader: "sass-loader",
              options: {
                sourceMap: true
              }
            }
          ]
        })
      },
      {
        test: /\.html$/,
        include: path.resolve(__dirname, 'src/html/includes'),
        use: ['raw-loader']
      },
    ]
  },
  plugins: [
    /*new BrowserSyncPlugin({
      host: 'localhost',
      port: 3000,
      files: ['/dist/*.html'],
      server: { 
          baseDir: ['dist'] 
      }
    }),*/
      
    new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        "window.jQuery": "jquery"
    }),

    new ExtractTextPlugin({
      filename: './css/style.bundle.css',
      allChunks: true,
    }),
	
	new UglifyJsPlugin({
        uglifyOptions: {
          warnings: false,
          output: {
            comments: false,
            beautify: false,
          },
        }
    }),
      
    new CopyWebpackPlugin([
      {
        from: './src/fonts',
        to: './fonts'
      },
      /*{
        from: './src/favicon',
        to: './favicon'
      },*/
      {
        from: './src/img',
        to: './img'
      }/*,
      {
        from: './src/uploads',
        to: './uploads'
      }*/
    ]),
  ].concat(htmlPlugins)
};
