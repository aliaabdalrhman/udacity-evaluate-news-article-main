const meaningCloud = "https://api.meaningcloud.com/sentiment-2.1"; // Endpoint for MeaningCloud Sentiment Analysis API
const axios = require("axios"); // Import axios for HTTP requests

/**
 * Analyzes sentiment of the content at the given URL using the MeaningCloud API.
 * @param {string} url - URL of the content to analyze.
 * @param {string} key - API key for MeaningCloud.
 * @returns {Promise<object>} - Object containing analysis results or error details.
 */
const analyze = async (url, key) => {
    try {
        // Perform a GET request to the MeaningCloud API with the URL and API key
        const response = await axios.get(`${meaningCloud}?key=${key}&url=${url}&lang=en`);
        const { code } = response.data.status;

        // Check API response code and handle accordingly
        if (code === 100) {
            // Return error if the URL is invalid
            return createErrorResponse(code, "The provided URL is invalid.");
        } else if (code === 212) {
            // Return error with API-specific message
            return createErrorResponse(code, response.data.status.msg);
        }

        // Return the analysis results if successful
        return formatSuccessResponse(response.data, code);
    } catch (error) {
        // Return a generic error for unexpected issues
        return createErrorResponse(500, "An unexpected error occurred.");
    }
};

/**
 * Generates an error response object.
 * @param {number} code - Error code from the API or internal logic.
 * @param {string} message - Description of the error.
 * @returns {object} - Error response object.
 */
const createErrorResponse = (code, message) => ({
    code: code,
    message: message
});

/**
 * Formats the successful response from the MeaningCloud API.
 * @param {object} data - Data received from the API.
 * @param {number} code - Response code from the API.
 * @returns {object} - Formatted response containing analysis results.
 */
const formatSuccessResponse = (data, code) => {
    const { score_tag, agreement, subjectivity, confidence, irony } = data;

    // Prepare the analysis results
    const sample = {
        score_tag: score_tag,
        agreement: agreement,
        subjectivity: subjectivity,
        confidence: confidence,
        irony: irony
    };

    // Return the formatted results along with the response code
    return {
        sample: sample,
        status: code
    };
};

module.exports = {
    analyze
};
