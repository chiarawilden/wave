const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
    mode: "development",
    entry: {
        main: path.resolve(__dirname, "src/index.js")
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "index.[contenthash].js",
        assetModuleFilename: "[name][ext]",
        clean: true
    },
    devServer: {
        port: 3000,
        open: true,
        hot: true
    },
    devtool: "inline-source-map",
    plugins: [
        new HtmlWebpackPlugin({
            template: (__dirname, "public/index.html"),
        })
    ],
    resolve: {
        modules: [__dirname, "src", "node_modules"],
        extensions: ["*", ".js", ".jsx", ".tsx", ".ts"],
    },
    module: {
        rules: [
            {
                test: /\.m?(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env", "@babel/preset-react"],
                        plugins: ["@babel/plugin-transform-runtime"]
                    }
                }
            },
            {
                test: /\.css|scss$/,
                use: ["style-loader", "css-loader", "sass-loader"],
            },
            {
                test: /\.gif|ico|jpg|jpeg|png|svg$/,
                type: "asset/resource",
                use: ["file-loader"],
            } 
        ]
    }
};
