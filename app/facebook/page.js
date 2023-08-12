// pages/facebook.js

import React from 'react';
import FacebookWebhookHandler from '../api/facebook-webhook';

const FacebookPage = () => {
  return (
    <div>
      <h1>Facebook Webhook Verification</h1>
      <FacebookWebhookHandler />
    </div>
  );
};

export default FacebookPage;
