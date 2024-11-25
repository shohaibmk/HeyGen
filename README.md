# waitForCompletion

A utility function that implements a polling mechanism to check the status of asynchronous jobs.

## Installation

```javascript
import waitForCompletion from './library/poll.js';
```

## Description

The `waitForCompletion` function polls a specified URL at regular intervals until one of the following conditions is met:
- The job is completed successfully
- The job fails with an error
- The maximum number of retry attempts is reached

## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| url | string | required | The endpoint URL to poll |
| maxRetries | number | 15 | Maximum number of polling attempts |
| interval | number | 5000 | Time in milliseconds between each poll |

## Returns

Returns a Promise that resolves to:
- The result object when status is 'completed'
- The error object when status is 'error'
- The pending object when status is 'pending' 

## Usage Example

```javascript
// Basic usage
const result = await waitForCompletion('https://api.example.com/status');

// With custom retry settings
const result = await waitForCompletion('https://api.example.com/status', 5, 2000);
```

## Response States

The function expects the server to return an object with a `status` field that can be:
- 'completed': Job finished successfully
- 'pending': Job still in progress
- 'error': Job failed

## Validation Rules

- URL: Must be a valid string matching the URL pattern.
- maxRetries: Must be a positive integer.
- interval: Must be a positive number.

## Error Handling

The function includes error handling that:
- Catches and logs any errors during execution
- Throws the error for upstream handling
- Logs progress messages to the console

## Dependencies

Requires the `HttpClient` class for making HTTP requests:

```javascript
import HttpClient from './library/httpClient.js';
```

## How to run the test 

- Requires `Node.js` to be installed 
- Install dependencies from `package.json`
- Run the integration test:
```bash
node test
```