var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var BUILD_DIR = path.resolve(__dirname, 'src/dist/');
var APP_DIR = path.resolve(__dirname, 'src/lib/js');
var LESS_DIR = path.resolve(__dirname, "src/lib/less");

var config = {
    entry: {
        reactvideo: [APP_DIR + "/index.jsx"],
        less: [LESS_DIR + "/main.less"]
    },
    output: {
        path: BUILD_DIR,
        filename: '[name].js'
    },
    module: {
        loaders: [
            {
                test: /\.jsx?/,
                include: APP_DIR,
                loader: 'babel'
            }, {
                test: /\.less$/,
                include: LESS_DIR,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader!less-loader')
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin("./css/style.css")
    ]
};

module.exports = config;
