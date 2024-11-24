/**
 * A reusable HTTP client for GET, POST, PUT, and DELETE requests using Fetch API.
 */
export default class HttpClient {
    /**
     * Handles all HTTP requests.
     * @param {string} url - API url.
     * @param {string} method - HTTP method (GET, POST, PUT, DELETE).
     * @param {Object} [body=null] - Request body for POST/PUT requests.
     * @param {Object} [headers={}] - Additional headers for the request.
     * @returns {Promise<any>} - Resolves to the response data.
     */
    async request(url, method, body = null, headers = {}) {
        const options = {
            method,
            headers: {
                "Content-Type": "application/json",
                ...headers,
            },
        };

        if (body) {
            options.body = JSON.stringify(body);
        }

        try {
            const response = await fetch(url, options);

            // Handle response based on content type
            const contentType = response.headers.get("content-type");
            let data;
            if (contentType && contentType.includes("application/json")) {
                data = await response.json();
            } else {
                data = await response.text();
            }

            // Check for HTTP errors
            if (!response.ok) {
                throw new Error(
                    `HTTP Error ${response.status}: ${response.statusText} - ${JSON.stringify(data)}`,
                );
            }

            return data;
        } catch (error) {
            console.error(`Error in ${method} request to ${url}:`, error);
            throw error;
        }
    }

    /**
     * Makes a GET request.
     * @param {string} url - API url.
     * @param {Object} [headers={}] - Additional headers for the request.
     * @returns {Promise<any>} - Resolves to the response data.
     */
    get(url, headers = {}) {
        return this.request(url, "GET", null, headers);
    }

    /**
     * Makes a POST request.
     * @param {string} url - API url.
     * @param {Object} body - Request body to send.
     * @param {Object} [headers={}] - Additional headers for the request.
     * @returns {Promise<any>} - Resolves to the response data.
     */
    post(url, body, headers = {}) {
        return this.request(url, "POST", body, headers);
    }

    /**
     * Makes a PUT request.
     * @param {string} url - API url.
     * @param {Object} body - Request body to send.
     * @param {Object} [headers={}] - Additional headers for the request.
     * @returns {Promise<any>} - Resolves to the response data.
     */
    put(url, body, headers = {}) {
        return this.request(url, "PUT", body, headers);
    }

    /**
     * Makes a DELETE request.
     * @param {string} url - API url.
     * @param {Object} [headers={}] - Additional headers for the request.
     * @returns {Promise<any>} - Resolves to the response data.
     */
    delete(url, headers = {}) {
        return this.request(url, "DELETE", null, headers);
    }
}
