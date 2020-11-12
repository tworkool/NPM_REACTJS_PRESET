const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require('webpack');
const srcPath = path.resolve(__dirname, './src');
const distPath = path.resolve(__dirname, './dist');
const htmlMainPath = path.resolve(srcPath, './index.html');
const jsMainPath = path.resolve(srcPath, './index.js');

module.exports = {
    mode: "development",
    resolve: {
        extensions: ['.js', '.jsx', '.css']
    },
    entry: jsMainPath,
    output: {
        path: distPath,
        filename: "bundle.js"
        //publicPath: ""
    },
    module: {
        rules: [
            {
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader",
                        options: {minimize: true}
                    }
                ]
            },
            {
                test: /\.(js|jsx)$/,
                include: srcPath,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "babel-loader",
                        options: {
                            presets: ['@babel/react']
                        },
                    }
                ]
            },
            {
                test: /\.(css|scss)$/,
                include: srcPath,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "style-loader"
                    },
                    {
                        loader: "css-loader"
                    }
                ]
            }
        ]
    },
    devServer: {
        contentBase: distPath,
        compress: true,
        port: 9000
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: htmlMainPath
        })
    ]
};