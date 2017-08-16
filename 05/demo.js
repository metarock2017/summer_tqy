var express = require('express');
var bodyParser = require('body-parser')
var path= require('path')
var fs = require('fs')
var app = express();

//app.use(bodyParser.text({type:'text/plain'}));
// app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname,'public')));

app.post('/upload', function (req, res) {
	let segment = []
    req.on('data', function (chunk) {
		segment.push(chunk)
	})
	req.on('end', function () {
		var a = Buffer.concat(segment)
		var fileName =  Math.floor(Math.random() * 1000 ) + '.png'
		var pathName = './public/images/' +  fileName;
		console.log(a)
		fs.writeFile(pathName, a, function (err) {
			if (err) {
				console.log(err)
			}
			res.setHeader('Content-Type', 'text/plain')
			res.end('ok')
		})
	})
});


app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});