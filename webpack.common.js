// Load required modules and plugins
const webpack = require("webpack");
const htmlWebpackPlugin = require("html-webpack-plugin"); // Generates an HTML file from a specified template
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // Cleans the build directory before each build
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin"); // Optimizes and compresses CSS files

module.exports = {
    // Define the main entry point for the application where the bundling process begins
    entry: "./src/client/index.js",
    
    module: {
        // Specify loaders for processing different types of files
        rules: [
            {
                // Handle JavaScript files with Babel for compatibility
                test: /\.js$/, // Target all JavaScript files
                exclude: /node_modules/, // Ignore files in the node_modules directory
                loader: "babel-loader" // Transpile modern JavaScript into a backward-compatible version
            },
        ]
    },

    optimization: {
        minimizer: [
            `...`, // Preserve the default minimizers (e.g., JavaScript minimizers)
            new CssMinimizerPlugin(), // Compress CSS files to minimize their size
        ],
        minimize: true, // Activate the minimization process for both JavaScript and CSS files
    },
    
    plugins: [
        new htmlWebpackPlugin({
            template: "./src/client/views/index.html", // Source path for the HTML template
            filename: "./index.html" // Destination filename for the generated HTML file
        }),
        new CleanWebpackPlugin({
            dry: false, // Perform actual deletion of files (if set to false)
            verbose: true, // Output the file deletion process details to the console
            cleanStaleWebpackAssets: true, // Remove obsolete files from the output directory
            protectWebpackAssets: false, // Allow the removal of assets specific to Webpack
        }),
    ]
}
