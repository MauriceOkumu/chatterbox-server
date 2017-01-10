'use strict';

const url = require('url');

let headers = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10 // Seconds.
};

let data = [];

var requestHandler = function(request, response) {
  
  console.log('Serving request type ' + request.method + ' for url ' + request.url);

  let parsedURL = url.parse(request.url);

  request.on('error', function(err) {
    console.error(err);
    response.statusCode = 400;
    response.end();
  });

  response.on('error', function(err) {
    console.error(err);
  });

  if (parsedURL.pathname === '/classes/messages') {
    response.setHeader('Content-Type', 'application/json');
    
    // Get request
    if (request.method === 'GET') {
      response.writeHead(200, headers);


    // Post request
    } else if (request.method === 'POST') {
      response.writeHead(201, headers);

      let body = '';

      request.on('data', function(chunk) {
        body += chunk;
      });

      request.on('end', function() {
        var obj = JSON.parse(body);
        data.push(obj);
      });

      
    }
    
    response.write(JSON.stringify({results: data }));
    response.end();

  } else {
    response.statusCode = 404;
    response.end();
  }
};

module.exports = requestHandler;
