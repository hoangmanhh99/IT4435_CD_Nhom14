#!/usr/bin/env node

/**
 * Module dependencies.
 */

var app = require('./app');
var http = require('http');
const env = require('./configs/index');

/**
 * Get port from environment and store in Express.
 */

// var port = normalizePort(process.env.PORT || '8080');
const port = env.PORT;
app.set('port', port);

/**
 * Create HTTP server.
 */

var server = http.createServer(app); 

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
console.log(`backend nhac14 is listening on port ${port}!`.yellow.bold);

/**
 * Normalize a port into a number, string, or false.
 */



/**
 * Event listener for HTTP server "error" event.
 */

/**
 * Event listener for HTTP server "listening" event.
 */

