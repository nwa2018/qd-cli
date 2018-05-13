const path = require('path');
const fs = require('fs');
const glob = require('glob');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const EslintFriendlyFormatter = require('eslint-friendly-formatter');
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const R = require('ramda')
const os = require('os')
const HappyPack = require('happypack')

const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length })
const {
  cwd,
  ownDir,
  getProjectName
} = require('../util')

const isDev = process.env.NODE_ENV !== 'production'

const entry = {}
const htmlPlugins = []

glob.sync(cwd('./src/*.@(js|jsx)')).forEach((filePath) => {
  const name = path.basename(filePath, path.extname(filePath))
  const artPath = cwd(`${name}.art`)
  if (fs.existsSync(artPath)) {
    htmlPlugins.push(new HtmlWebpackPlugin({
      filename: `${name}.html`,
      template: artPath
    }))
  }
  entry[name] = filePath
})

module.exports = {
  entry,
  plugins: [
    // 当遇到$标识符的时候，自动加载jquery
    new webpack.ProvidePlugin({
      $: 'jquery'
    }),
    new CleanWebpackPlugin(['dist'], {
      root: cwd()
    }),
    new VueLoaderPlugin(),
    new HappyPack({
      id: 'eslint',
      verbose: false,
      loaders: [
        {
          loader: "eslint-loader",
          options: {
            configFile: ownDir('lib/config/eslint.config.js'),
            formatter: EslintFriendlyFormatter
          }
        }
      ],
      threadPool: happyThreadPool
    }),
    new HappyPack({
      id: 'js',
      verbose: false,
      loaders: [
        {
          loader: 'babel-loader',
          query: require(ownDir('lib/config/babel.config.js'))
        }
      ],
      threadPool: happyThreadPool
    })
  ].concat(htmlPlugins),
  output: {
    filename: isDev ? '[name].js' : '[name].[chunkhash:4].js',
    path: cwd('dist')
  },
  resolve: {
    alias: {
      '@': cwd('src'),
      'vue$': 'vue/dist/vue.esm.js'
    },
    modules: [cwd(), cwd('node_modules'), ownDir('node_modules'), cwd('../web_modules')],
    extensions: ['.js', '.vue', '.styl', '.jsx', '.ts']
  },
  resolveLoader: {
    modules: [cwd('node_modules'), ownDir('node_modules')]
  },
  module: {
    rules: [
      {
        test: /\.pug$/,
        use: [
          'pug-plain-loader'
        ]
      },
      {
        test: /\.css$/,
        use: [
          isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              config: {
                path: ownDir('lib/config/postcss.config.js')
              }
            }
          }
        ]
      },
      {
        test: /\.styl(us)?$/,
        use: [
          isDev ? 'vue-style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              config: {
                path: ownDir('lib/config/postcss.config.js')
              }
            }
          },
          'stylus-loader'
        ]
      },
      {
        test: /\.scss$/,
        use: [
          isDev ? 'vue-style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              config: {
                path: ownDir('lib/config/postcss.config.js')
              }
            }
          },
          'sass-loader'
        ]
      },
      {
        test: /\.vue$/,
        use: [
          'vue-loader'
        ]
      },
      {
        enforce: "pre",
        test: /\.(jsx?|vue)$/,
        exclude: /node_modules/,
        loader: 'happypack/loader?id=eslint'
        // loader: "eslint-loader",
      },
      {
        test: /\.jsx?$/,
        // In order to ensure JS transpilation is applied to Vue SFCs in node_modules, you need to whitelist them by using an exclude function instead:
        exclude: file => (
          /node_modules/.test(file) &&
          !/\.vue\.js/.test(file)
        ),
        use: [
          {
            // loader: 'babel-loader',
            loader: 'happypack/loader?id=js'
          }
        ]
      },
      {
        test: /\.art$/,
        use: [
          'art-template-loader'
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader'
        ]
      },
      {
        test: /\.(png|svga?|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              fallback: 'file-loader'
            }
          }
        ].concat(isDev ? [] : [
          {
            loader: 'image-webpack-loader',
            options: {
              pngquant: {
                speed: 4,
                quality: '75-90'
              },
              optipng: {
                optimizationLevel: 7
              },
              mozjpeg: {
                quality: 70,
                progressive: true
              },
              gifsicle: {
                interlaced: false
              }
            }
          }
        ])
      },
      {
        test: /anything\//,
        use: 'file-loader'
      }
    ]
  }
};
