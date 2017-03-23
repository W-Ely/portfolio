'use strict';

const express = require('express');
const app = express();

const PORT = process.env.PORT || 6767;

app.use(express.static('./public'));

app.get('/', function(req, res){
  res.sendFile('/index.html', {root: './public'});
});

app.use(function(req, res){
  res.status(404).sendFile('/404.html', {root: './public'});
});

app.listen(PORT, function(){
  console.log('Listening on port', PORT);
});
