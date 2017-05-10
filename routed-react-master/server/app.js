// server/app.js
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const app = express();

var request = require('request');
var http = require('http');


app.get('/api/items/q/:q', (req, resp) => {  
	var query = req.params.q;
	//console.log(resp.headers['content-type'])
	req.pipe(request('https://api.mercadolibre.com/sites/MLA/search?q='+ query)).pipe(resp)    
})

app.get('/api/items/id/:id', (req, resp) => {  
	var id = req.params.id;	
	req.pipe(request('https://api.mercadolibre.com/items/'+id)).pipe(resp)

})

app.get('/api/items/id/description/:id', (req, resp) => {  
	var id = req.params.id;	
	req.pipe(request('https://api.mercadolibre.com/items/'+id+'/description')).pipe(resp)
})


// Setup logger
app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));

// Serve static assets
app.use(express.static(path.resolve(__dirname, '..', 'build')));

// Always return the main index.html, so react-router render the route in the client
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});

module.exports = app;