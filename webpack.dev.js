// Load configuration and utilities
const common = require("./webpack.common.js"); // Import shared webpack configuration settings
const { merge } = require("webpack-merge"); // Utility for combining multiple webpack configuration files
const path = require("path"); // Node.js module for handling file and directory paths
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin"); // Plugin for compressing CSS files

module.exports = merge(common, {
    mode: "development", // Set the build mode to 'development' to optimize for faster builds and better debugging
    devtool: "source-map", // Create source maps to help with debugging by mapping the bundled code back to the original source

    module: {
        // Define how different file types should be processed
        rules: [
            {
                // Transform Sass/SCSS files into CSS
                test: /\.s[ac]ss$/i, // Target files with .sass or .scss extensions
                use: [
                    "style-loader", // Injects CSS into the DOM by adding <style> tags
                    "css-loader", // Resolves @import and url() paths within CSS files
                    "sass-loader" // Converts Sass/SCSS into standard CSS
                ]
            }
        ]
    },

    output: {
        filename: 'bundle.js', // Name of the resulting bundled JavaScript file
        path: path.resolve(__dirname, 'dist'), // Directory where the output files will be placed
        libraryTarget: 'var', // Define the format of the exported library
        library: 'Client', // Name of the variable that will hold the exported library
        clean: true, // Remove old build files from the output directory before creating new ones
    },

    optimization: {
        minimize: true, // Enable optimization for minimizing file size
        minimizer: [
            // Include additional minimizers for optimizing the build output
            new CssMinimizerPlugin(), // Compress CSS files to reduce their size
        ],
    },
});
