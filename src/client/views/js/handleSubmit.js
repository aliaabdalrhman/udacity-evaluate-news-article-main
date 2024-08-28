// Import the URL validation utility.
import { isValidUrl } from "./checkURL.js";
// Import axios for making HTTP requests.
import axios from "axios";

// Access the URL input element.
const input = document.getElementById("URI");

// Initialize event listeners once the document is fully loaded.
document.addEventListener('DOMContentLoaded', () => {
    // Set up an event listener for changes to the URL input field.
    input.addEventListener("input", () => {
        clearError(); // Remove any visible error messages.
        showResults(false); // Hide the results section.
    });
});

// Function to handle form submissions, including validation and server communication.
async function handleSubmit(event) {
    event.preventDefault(); // Stop the default form submission process.

    const url = input.value.trim(); // Retrieve and trim the URL input.

    // Validate the URL and show an error if it's not valid.
    if (!isValidUrl(url)) {
        displayError("Please provide a valid URL."); // Show error message.
        input.value = ""; // Clear the input field.
        return; // Exit the function.
    }

    toggleLoader(true); // Show the loading spinner.

    try {
        // Send a POST request to the server with the URL.
        const { data } = await axios.post(
            'http://localhost:8000/',
            { URI: url },
            { headers: { 'Content-Type': 'application/json' } }
        );
        updateResults(data); // Update the UI with the results from the server.
    } catch (error) {
        displayError("An error occurred while retrieving data."); // Show error message if request fails.
    } finally {
        toggleLoader(false); // Hide the loading spinner.
    }
}

// Function to update the UI with results from the server.
const updateResults = (data) => {
    // If there's an error message, display it and hide the results.
    if (data.msg) {
        displayError(data.msg); // Show server-provided error message.
        showResults(false); // Hide results.
        return;
    }

    clearError(); // Remove any existing error messages.
    showResults(true); // Display the results section.

    // Populate the results with the data received from the server.
    document.getElementById("agreement").innerText = `Agreement: ${data.sample.agreement}`;
    document.getElementById("subjectivity").innerText = `Subjectivity: ${data.sample.subjectivity}`;
    document.getElementById("confidence").innerText = `Confidence: ${data.sample.confidence}`;
    document.getElementById("irony").innerText = `Irony: ${data.sample.irony}`;
    document.getElementById("score_tag").innerText = `Score Tag: ${data.sample.score_tag}`;
}

// Function to control the visibility of the loading spinner.
const toggleLoader = (isVisible) => {
    document.getElementById('loader').style.display = isVisible ? 'block' : 'none';
}

// Function to show or hide the results section.
const showResults = (isVisible) => {
    document.querySelectorAll("#results ul li").forEach(item => {
        item.style.display = isVisible ? "block" : "none";
    });
}

// Function to display an error message with custom text.
const displayError = (message) => {
    const errorElement = document.getElementById("error");
    errorElement.innerText = message;
    errorElement.style.display = "block";
}

// Function to hide the error message.
const clearError = () => {
    document.getElementById("error").style.display = "none";
}

// Export the handleSubmit function for use in other parts of the application.
export { handleSubmit };
