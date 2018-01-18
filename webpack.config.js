/**
 *
 * @typedef {{BannerPlugin: function,HotModuleReplacementPlugin:function,DefinePlugin:function}} webpack
 * @typedef {{extract: function}} extracttextplugin
 */
const webpack = require("webpack");
const extracttextplugin = require('extract-text-webpack-plugin');
const htmlwebpackplugin = require('html-webpack-plugin');
const manifestplugin = require('manifest-webpack-plugin');

module.exports = {
    entry    : {
        bundle: __dirname + "/public/src/main.js",
        vendor: [
            'antd',
            'react',
            'react-dom',
            'react-redux',
            'react-router',
            'redux',
            'react-router-dom'
        ],
    },
    output   : {
        path    : __dirname + "/build",
        filename: "asset/js/[hash].js",
    },
    // just for dev
    //devtool  : 'eval-source-map',
    devtool  : false,
    devServer: {
        contentBase       : "./build",
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
                            'presets': ['react', 'es2015', 'stage-0'],
                            'plugins': ['transform-decorators-legacy']
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
                test: /\.css$/,
                use : extracttextplugin.extract({
                    use     : [
                        {
                            loader : 'css-loader',
                            options: {
                                localIdentName: '[local]',
                                importLoaders : 1,
                                modules       : true,
                                autoprefixer  : true,
                            }
                        },
                        {loader: 'postcss-loader'},
                    ],
                    fallback: 'style-loader',
                }),
            }, {
                test: /\.less$/,
                use : extracttextplugin.extract({
                    use     : [
                        {
                            loader : 'css-loader',
                            options: {
                                localIdentName: '[local]',
                                importLoaders : 1,
                                modules       : true,
                                autoprefixer  : true,
                            }
                        },
                        {loader: 'postcss-loader'},
                        {loader: 'less-loader'},
                    ],
                    fallback: 'style-loader',
                }),
            }
        ]
    },
    plugins  : [
        new webpack.BannerPlugin('版权所有，翻版必究'),
        new webpack.HotModuleReplacementPlugin(),
        new htmlwebpackplugin({
            template: 'public/index.html',
            filename: 'index.html',
            favicon : './public/favicon.ico'
        }),
        // new webpack.optimize.UglifyJsPlugin(),
        new extracttextplugin("asset/css/[hash].css"),
        new manifestplugin('build/manifest.json'),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name    : 'vendor',
            filename: 'vendor.bundle.js'
        }),
    ],
};