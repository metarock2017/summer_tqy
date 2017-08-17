var express = require('express')
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var login = require('./login.js');
var db = require('./db.js')
var bodyParser = require('body-parser')
var port = 8806;


app.use(express.static('./'))

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});
app.get('/login', function(req, res) {
    res.sendFile(__dirname + "/login.html");
})

app.post('/login', function(req, res) {
    console.log(login)
    login(req, res);
})

app.get('/register.html', function(req, res) {
    res.sendFile(__dirname + "/register.html");
    console.log('asdasdas')
})

app.post('/register', function(req, res) {
    var name = req.body.name === 'undefined' ? 557 : req.body.name;
    var psd = req.body.psd || 557;
    var user = {
        num: name,
        psd: psd
    };
    console.log(user);
    db.query('insert into user set ?', user, function(err, rs) {
        if (err) throw err;
        console.log('ok');
        //res.sendFile(__dirname + "/" + "index.html" );
    })
})


http.listen(port, function() {
    console.log('listening on ' + port);
});



io.on('connection', function(socket) {
    console.log('a user has connected');
});

io.on('connection', function(socket) {
    socket.on('chat message', function(msg) {
        console.log('message: ' + msg);
    });
});

io.on('connection', function(socket) {
    socket.on('chat message', function(msg) {
        io.emit('chat message', msg);
    });
});