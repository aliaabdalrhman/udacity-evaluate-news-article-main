// Import the valid-url library to help validate URLs.
const validUrl = require('valid-url');

// Function to check if a given URL is a valid web URI.
const isValidUrl = (url) => Boolean(validUrl.isWebUri(`${url}`));

// Export the isValidUrl function for use in other modules.
module.exports = {
    isValidUrl,
};
