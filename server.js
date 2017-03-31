'use strict';

const express = require('express');
const app = express();
const requestProxy = require('express-request-proxy');
const PORT = process.env.PORT || 6767;

app.use(express.static('./public'));

function proxyGitHub(request, response) {
  console.log('Routing GitHub request for', request.params[0]);
  (requestProxy({
    url: `https://api.github.com/${request.params[0]}`,
    headers: {Authorization: `token ${process.env.GITHUB_TOKEN}`}
  }))(request, response);
}
app.get('/github/*', proxyGitHub);

app.get('*', function(req, res){
  res.sendFile('/index.html', {root: './public'});
});

app.use(function(req, res){
  res.status(404).sendFile('/404.html', {root: './public'});
});

app.listen(PORT, function(){
  console.log('Listening on port', PORT);
});
