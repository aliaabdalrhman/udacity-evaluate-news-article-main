// Required modules and plugins for the webpack configuration
const { merge } = require("webpack-merge"); // Combine multiple webpack configuration files
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // Extract CSS into separate files for better caching
const TerserPlugin = require("terser-webpack-plugin"); // Minify JavaScript files to reduce their size
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin"); // Minify CSS files to optimize loading times
const common = require("./webpack.common.js"); // Import common configuration settings shared across environments
const path = require("path"); // Node.js utility for resolving file paths

module.exports = merge(common, {
    mode: "production", // Optimize the build for production with minification and other enhancements
    devtool: "hidden-source-map", // Generate source maps to aid debugging while keeping them hidden from the output

    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i, // Apply the following loaders to Sass/SCSS files
                use: [
                    MiniCssExtractPlugin.loader, // Extract CSS into a separate file rather than including it in the JavaScript bundle
                    "css-loader", // Resolve and bundle CSS imports
                    "sass-loader" // Compile Sass/SCSS code into CSS
                ]
            }
        ]
    },

    output: {
        filename: 'bundle.[contenthash].js', // Use a content hash in the filename to enable long-term caching
        path: path.resolve(__dirname, 'dist'), // Define the directory where output files will be saved
        clean: true // Remove old files from the output directory before each build
    },

    optimization: {
        minimize: true, // Enable file minimization to reduce file sizes
        minimizer: [
            new TerserPlugin(), // Minimize JavaScript code
            new CssMinimizerPlugin() // Minimize CSS code
        ],
    },

    plugins: [
        new MiniCssExtractPlugin({
            filename: 'style.[contenthash].css' // Generate a separate CSS file with a content hash for better caching
        })
    ]
});
