const cors_proxy = require('cors-anywhere');

// Create the CORS Anywhere server
cors_proxy.createServer({
  originWhitelist: [], // Allow all origins
  requireHeader: ['origin', 'x-requested-with'],
  removeHeaders: ['cookie', 'cookie2']
}).listen(8080, function() {
  console.log('Running CORS Anywhere on port 8080');
});