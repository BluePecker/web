/**
 *
 * @typedef {{BannerPlugin: function, HotModuleReplacementPlugin: function}} webpack
 * @typedef {{extract: function}} extracttextplugin
 */
const webpack = require("webpack");
const extracttextplugin = require('extract-text-webpack-plugin');
const htmlwebpackplugin = require('html-webpack-plugin');
const manifestplugin = require('manifest-webpack-plugin');

module.exports = {
    entry    : __dirname + "/public/src/main.js",
    output   : {
        path    : __dirname + "/dist",
        filename: "asset/js/[hash].js",
    },
    devtool  : 'eval-source-map',
    devServer: {
        contentBase       : "./dist",
        inline            : true,
        hot               : true,
        historyApiFallback: true,
    },
    module   : {
        rules: [
            {
                test   : /\.js[x]?$/,
                loader : [
                    {
                        loader : 'babel-loader',
                        options: {
                            'presets': ['latest', 'react'],
                        }
                    }
                ],
                exclude: /node_modules/,
            },
            {
                test  : /\.(png|jpg)$/,
                loader: [
                    {
                        loader : 'url-loader',
                        options: {
                            limit: 819200
                        }
                    }
                ]
            },
            {
                test  : /\.(woff|eot|ttf)$/,
                loader: [
                    {
                        loader : 'file-loader',
                        options: {
                            name: 'asset/font/[hash].[ext]'
                        }
                    }
                ]
            },
            {
                test  : /\.(svg|gif)$/,
                loader: [
                    {
                        loader : 'file-loader',
                        options: {
                            name: 'asset/icon/[hash].[ext]'
                        }
                    }
                ]
            },
            {
                test: /\.(less|css)$/,
                use : extracttextplugin.extract({
                    use     : [
                        {
                            loader : 'css-loader',
                            options: {
                                localIdentName: '[local]',
                                importLoaders : 1,
                                modules       : true,
                            }
                        },
                        {
                            loader: 'postcss-loader', // 补全css代码的兼容性前缀
                        },
                        {
                            loader: 'less-loader',
                        },
                    ],
                    fallback: 'style-loader',
                }),
            }
        ]
    },
    plugins  : [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.BannerPlugin('版权所有，翻版必究'),
        new htmlwebpackplugin({
            template: 'public/index.html',
            filename: 'index.html',
            favicon : './public/favicon.ico'
        }),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin(),
        new extracttextplugin("asset/css/[hash].css"),
        new manifestplugin('dist/manifest.json')
    ],
};