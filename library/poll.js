import HttpClient from "./httpClient.js";


/**
 * Polls a given URL until the job is completed, fails, or max retries are reached.
 *
 * @param {string} url - The URL to poll.
 * @param {number} [maxRetries=10] - Maximum number of retry attempts.
 * @param {number} [interval=1000] - Time interval (in milliseconds) between retries.
 * @returns {Promise<Object>} - The result object from the server or 'pending' if max retries are reached.
 */
async function waitForCompletion(url, maxRetries = 15, interval = 5000) {
    validateInputs(url, maxRetries, interval);
    try {


        const object = new HttpClient();
        let attempts = 0;

        while (attempts < maxRetries) {
            const result = await object.get(url);
            if (result.status === 'completed') {
                console.log("Job completed successfully!");
                return result;
            } else if (result.status === "error") {
                console.error("Job failed.");
                return result;
            }

            console.log(`Retrying in ${interval / 1000} seconds...`);
            attempts += 1;

            // Pause for the specified interval before retrying
            await new Promise((resolve) => setTimeout(resolve, interval));
        }

        console.error("Max retries reached. Job status remains pending.");
        return "pending";
    }
    catch (error) {
        console.error("Error in waitForCompletion:", error);
        throw error;
    }

}

/**
 * Validates the inputs for the waitForCompletion function.
 *
 * @param {string} url - The URL to validate.
 * @param {number} [maxRetries=10] - Maximum number of retry attempts.
 * @param {number} [interval=1000] - Time interval (in milliseconds) between retries.
 * @returns {boolean} - Returns true if all inputs are valid, otherwise throws an error.
 */
function validateInputs(url, maxRetries, interval) {
    // Validate URL
    const urlPattern = /^(https?:\/\/)?([\w.-]+)+(:\d+)?(\/([\w/_-]+)*)*$/i;
    if (typeof url !== "string" || !urlPattern.test(url)) {
        throw new Error("Invalid URL. Please provide a valid URL string.");
    }

    // Validate maxRetries
    if (typeof maxRetries !== "number" || maxRetries <= 0 || !Number.isInteger(maxRetries)) {
        throw new Error("Invalid maxRetries. It must be a positive integer.");
    }

    // Validate interval
    if (typeof interval !== "number" || interval <= 0 || !Number.isFinite(interval)) {
        throw new Error("Invalid interval. It must be a positive number.");
    }
}

export default waitForCompletion;
