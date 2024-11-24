# waitForCompletion

A utility function that implements a polling mechanism to check the status of asynchronous jobs.

## Installation

```javascript
import waitForCompletion from './waitForCompletion.js';
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
| maxRetries | number | 10 | Maximum number of polling attempts |
| interval | number | 1000 | Time in milliseconds between each poll |

## Returns

Returns a Promise that resolves to:
- The result object when status is 'completed'
- The error object when status is 'error'
- String 'pending' when max retries are reached

## Usage Example

```javascript
// Basic usage
const result = await waitForCompletion('https://api.example.com/job/123');

// With custom retry settings
const result = await waitForCompletion('https://api.example.com/job/123', 5, 2000);
```

## Response States

The function expects the server to return an object with a `status` field that can be:
- 'completed': Job finished successfully
- 'error': Job failed
- Any other value: Job still in progress

## Error Handling

The function includes error handling that:
- Catches and logs any errors during execution
- Throws the error for upstream handling
- Logs progress messages to the console

## Dependencies

Requires the `HttpClient` class for making HTTP requests:

```javascript
import HttpClient from './httpClient.js';
```
