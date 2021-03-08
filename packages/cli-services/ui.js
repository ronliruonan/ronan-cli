const express = require('express');
const server = express();
const { Ports } = require('../cli-enums/index');
const { resolve } = require('path');
const distPath = resolve(__dirname, '../cli-ui/dist');

server.listen(Ports.uiPort, function(){
  const uri = `http://localhost:${Ports.uiPort}/`;
  require('../cli-editors/index').openWithBroswer(uri);
});

server.use('', express.static(distPath));
