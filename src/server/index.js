const express = require("express"); // Import Express framework for server setup
const port = 8000; // Define the port number on which the server will listen
const cors = require("cors"); // Import CORS middleware to handle cross-origin requests
const app = express(); // Create an Express application instance
const dotenv = require("dotenv"); // Import dotenv to manage environment variables
const { analyze } = require("./analyse"); // Import the 'analyze' function from the 'analyse' module

// Middleware setup
app.use(cors()); // Enable Cross-Origin Resource Sharing for all routes
app.use(express.static('dist')); // Serve static files from the 'dist' directory
app.use(express.json()); // Parse JSON formatted request bodies

// Load environment variables from the .env file
dotenv.config();

// Retrieve the API key from environment variables
const MEAN_CLOUD_API_KEY = process.env.API_KEY;

// Serve the main HTML file for the root route
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/dist/index.html'); // Send the 'index.html' file located in the 'dist' directory
});

// Handle POST requests for sentiment analysis
app.post("/", async (req, res) => {
    const url = req.body.URI; // Extract the URL from the incoming request body

    // Perform sentiment analysis using the 'analyze' function and the API key
    const analysisResult = await analyze(url, MEAN_CLOUD_API_KEY);
    const { code, msg, sample } = analysisResult;

    // Send an error response if the API returns an error code
    if (code === 212 || code === 100) {
        return res.status(400).send({ msg: msg, code: code });
    }

    // Send the analysis results if successful
    return res.send({ sample: sample, code: code });
});

// Start the Express server and listen on the specified port
app.listen(port, () => {
    console.log(`Server is running on port ${port}`); // Log a message to indicate the server is up and running
});
