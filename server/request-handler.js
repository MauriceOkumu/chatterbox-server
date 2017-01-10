'use strict';

const url = require('url');
const qs = require('querystring');

let data = [];

var requestHandler = function(request, response) {

  console.log('Serving request type ' + request.method + ' for url ' + request.url);

  let parsedURL = url.parse(request.url, true);

  // The outgoing status.
  var statusCode = 200;

  if (parsedURL.pathname === '/classes/messages') {
    if (request.method === 'GET') {
      statusCode = 200;
    }

    if (request.method === 'POST') {
      statusCode = 201;

      var body = '';

      request.on('data', function (data) {
          body += data;
      })

      request.on('end', function () {
        data.push(JSON.parse(body));
      });
    };

  } else {
    statusCode = 404;
  }

  // See the note below about CORS headers.
  var headers = defaultCorsHeaders;

  headers['Content-Type'] = 'application/json';

  response.writeHead(statusCode, headers);
  console.log(data);
  response.end(JSON.stringify({results: data}));
};

var defaultCorsHeaders = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10 // Seconds.
};

exports.requestHandler = requestHandler;
