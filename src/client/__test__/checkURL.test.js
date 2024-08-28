const { isValidUrl } = require("../views/js/checkURL.js");

/**
 * Test suite for URL validation functions.
 */
describe('URL Validity Checks', () => {

    /**
     * Test to ensure that invalid URL strings return false.
     */
    test('Strings that are not valid URLs should return false', () => {
        expect(isValidUrl("read")).toBeFalsy();
    });
    
    /**
     * Test to ensure that email addresses are not considered valid URLs.
     */
    test('Email addresses should not be considered valid URLs', () => {
        expect(isValidUrl("mailto:aliaabdalrhman2001@gmail.com")).toBeFalsy();
    });
    
    /**
     * Test to ensure that valid URLs return true.
     */
    test('Valid URLs should return true', () => {
        expect(isValidUrl("https://www.google.com")).toBeTruthy();
    });

    /**
     * Test to ensure that empty strings are considered invalid.
     */
    test('Empty strings should return false', () => {
        expect(isValidUrl("")).toBeFalsy();
    });
});
