import { expect } from 'chai';
import request from 'supertest';
// import express from 'express';
import waitForCompletion from '../library/poll.js'; // Adjust path if needed
import app from '../server.js'; // Ensure this exports your server

describe('Integration Test for Polling Functionality', function () {
  let server;
  const URL = 'http://localhost:3005';

  // Start the server before the tests
  before((done) => {
    server = app.listen(3005, () => done());
  });

  it('should poll the server until completion or timeout', async function () {
    this.timeout(15000); // Extend timeout for polling test

    const pollHelper = await waitForCompletion(URL + '/status', 10, 5000);
    expect(pollHelper.status).to.be.oneOf(['completed', 'pending', 'error']);
  });

  it('should respond correctly to /status requests', async function () {
    for (let i = 0; i < 10; i++) {
      const response = await request(URL).get('/status');
      expect(response.status).to.be.oneOf([200, 202, 500]);
      expect(response.body).to.have.property('status');
      expect(response.body.status).to.be.oneOf(['completed', 'pending', 'error']);
    }
  });

  // Stop the server after the tests
  after((done) => {
    server.close(() => done());
  });
});
