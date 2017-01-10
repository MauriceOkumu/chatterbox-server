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

  let parsedURL = url.parse(request.url);
  console.log(parsedURL);

  request.on('error', function(err) {
    console.error(err);
    response.statusCode = 400;
    response.end();
  });

  response.on('error', function(err) {
    console.error(err);
  });

  if (parsedURL.pathname === '/classes/messages') {
    if (request.method === 'GET') {
      response.writeHead(200, headers);
      response.write(JSON.stringify({results: [] }));
    
    } else if (request.method === 'POST') {
      response.setHeader('Content-Type', 'text/json');
      response.writeHead(201, headers);

      let body = '';

      request.on('data', function(chunk) {
        body += chunk;
      });

      request.on('end', function() {
        console.log(body);
        response.end(body);
      });

      
      // response.write(JSON.stringify({results: [] }));
    }
    response.end();
  } else {
    response.statusCode = 404;
    response.end();
  }
  
  // let parsedURL = url.parse(request.url);
  
  // let statusCode = 404;

  // if (parsedURL.pathname === '/classes/messages') {


  //   headers['Content-Type'] = 'application/json';


  //   if (request.method.toLowerCase() === 'get') {
  //     statusCode = 200;
  //   }

  //   if (request.method.toLowerCase() === 'post') {
  //     statusCode = 201;
  //     let body = [];
  //     request.on('data', function(chunk) {
  //       body.push(chunk);
  //     }).on('end', function() {
  //       body = Buffer.concat(body).toString();
  //     });
  //     console.log(body);
  //   }
  // }

  // if (statusCode === 404) {
  //   response.writeHead(statusCode, headers);  
  //   response.end();
  // } else {
  //   response.writeHead(statusCode, headers);
  //   response.write(JSON.stringify({results: data }));
  //   response.end();
  // }

  // console.log('Serving request type ' + request.method + ' for url ' + request.url);

};


module.exports = requestHandler;
