const path = require("path");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const defaultConfig = {
    mode: "production",
    resolve: {
        extensions: [".ts", ".js"],
    },
    module: {
        rules: [
            {
                test: /\.node$/,
                loader: 'node-loader',
            },
            {
                test: /\.ts$/,
                include: path.resolve(__dirname, "app-back"),
                loader: "ts-loader",
                options: {
                    transpileOnly: true,
                },
            },
            {
                test: /\.js$/,
                include: path.resolve(__dirname, "app-back"),
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"],
                    },
                },
            },
        ],
    },
}

module.exports = [
    {
        ...defaultConfig,
        entry: "./app-back/index.ts",
        target: "electron-main",
        plugins: [...(process.env.ANALYZE ? [new BundleAnalyzerPlugin({analyzerPort:'auto'})] : [])],
        output: {
            path: path.resolve(__dirname, "app-back/.build"),
            filename: "index.js",
        },
    },
    {
        ...defaultConfig,
        entry: "./app-back/preload.ts",
        target: "electron-preload",
        plugins: [...(process.env.ANALYZE ? [new BundleAnalyzerPlugin({analyzerPort:'auto'})] : [])],
        output: {
            path: path.resolve(__dirname, "app-back/.build"),
            filename: "preload.js",
        },
    }
]