// Get dependencies
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const jsonServer = require('json-server');

// Import the required dependencies
const jwt = require('express-jwt');
const jwks = require('jwks-rsa');
const cors = require('cors');

// Get our API routes
const api = require('./server/routes/api');
const users = require('./server/routes/users');
const posts = require('./server/routes/posts');

//Create our express object
const app = express();

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// We are going to implement a JWT middleware that will ensure the validity of our token. 
//We'll require each protected route to have a valid access_token sent in the Authorization header
const authCheck = jwt({
  secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: "https://ewf.auth0.com/.well-known/jwks.json"
    }),

    // This is the identifier we set when we created the API
    audience: 'https://ewf.auth0.com/api/v2/',
    issuer: "https://ewf.auth0.com/",
    algorithms: ['RS256']
});

// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));

// Set our api routes
app.use('/api', api);
app.use('/api/users', users);
app.use('/api/posts', posts);
//app.use('/api', jsonServer.router('db.json'));

// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '3000';
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(`API running on localhost:${port}`));
