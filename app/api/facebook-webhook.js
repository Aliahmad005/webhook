// pages/api/facebook-webhook.js

import { parse } from 'url';
import bodyParser from 'body-parser';

// Set up bodyParser middleware
const jsonParser = bodyParser.json();

// Replace with your own verify token
const VERIFY_TOKEN = 'ali';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    // Verify token when Facebook sends a verification request
    const { query } = parse(req.url, true);
    const { 'hub.mode': mode, 'hub.verify_token': token, 'hub.challenge': challenge } = query;

    if (mode === 'subscribe' && token === VERIFY_TOKEN) {
      res.status(200).send(challenge);
    } else {
      res.status(403).send('Verification failed');
    }
  } else if (req.method === 'POST') {
    // Handle incoming webhook events from Facebook
    try {
      await jsonParser(req, res);

      const { body } = req;
      // Handle the webhook event data (e.g., messaging, post updates, etc.)
      console.log('Received webhook event:', body);

      // Respond with a 200 OK to acknowledge receipt of the event
      res.status(200).end();
    } catch (error) {
      console.error('Error handling webhook event:', error);
      res.status(500).end();
    }
  } else {
    res.status(405).end();
  }
}
