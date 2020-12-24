import HtmlWebpackPlugin from 'html-webpack-plugin'
import { CleanWebpackPlugin } from 'clean-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import { Configuration } from 'webpack'
import { join } from 'path'

const __DEV__ = process.env.NODE_ENV === 'development'
const entryPath = __DEV__ ? 'test/index.ts' : 'src/index.ts'
const resolve = (path: string) => join(__dirname, './', path)

const postcssLoader = __DEV__
  ? []
  : {
      loader: 'postcss-loader',
      options: {
        ident: 'postcss',
        plugins: () => [require('postcss-preset-env')()]
      }
    }

const styleLoader = [
  __DEV__ ? 'style-loader' : MiniCssExtractPlugin.loader,
  { loader: 'css-loader', options: {} }
].concat(postcssLoader)

const config: Configuration = {
  mode: __DEV__ ? 'development' : 'production',
  context: resolve('dist'),
  entry: {
    bundle: resolve(entryPath)
  },
  output: {
    path: resolve('dist'),
    filename: './js/[name].js'
  },
  devtool: __DEV__ ? 'eval-source-map' : 'hidden-source-map',
  resolve: {
    extensions: ['.ts', '.js', '.json'],
    alias: {
      '@': resolve('src')
    },
    modules: [resolve('node_modules')]
  },
  module: {
    rules: [
      {
        test: /\.(js|ts)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        exclude: /node_modules/
      },
      {
        oneOf: [
          {
            test: /\.ts$/,
            exclude: /node_modules/,
            include: [resolve('src')],
            use: [
              'babel-loader',
              {
                loader: 'ts-loader',
                options: {
                  onlyCompileBundledFiles: true
                }
              }
            ]
          },
          {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
          },
          {
            test: /\.css$/,
            use: styleLoader
          },
          {
            test: /\.scss$/,
            use: [
              ...styleLoader,
              {
                loader: 'sass-loader',
                options: {}
              }
            ]
          },
          {
            test: /\.html$/,
            loader: 'html-loader'
          },
          {
            test: /\.(png|jpg|gif)$/,
            loader: 'url-loader',
            options: {
              name: '[hash:10].[ext]',
              limit: 8 * 1024,
              outputPath: 'images',
              esModule: false
            }
          },
          {
            exclude: /\.(html|jsx?|tsx?|vue|css|less|scss|jpg|png|gif)/,
            loader: 'flie-loader',
            options: {
              name: '[hash:10].[ext]',
              outputPath: 'assets'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin(
      Object.assign(
        {
          template: resolve('public/index.html'),
          filename: 'index.html'
        },
        __DEV__
          ? {}
          : {
              minify: {
                removeComments: true,
                collapseWhitespace: true
              }
            }
      )
    ),
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [resolve('dist')]
    })
  ].concat(
    __DEV__
      ? []
      : new MiniCssExtractPlugin({
          filename: 'css/[name].[contenthash:10].css'
        })
  )
}

export default config
