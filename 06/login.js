// var express=require('express');
// var app=express();
var db = require('./db.js')

function login(req, res) {
    var name=req.query.num;
    var psd=req.query.psd;

    var selectSQL = "select * from user where num = '"+name+"' and psd = '"+psd+"'";
    db.query(selectSQL,function (err,rs) {
        if (err) throw err;
        console.log(rs);
        console.log('OK');
        res.sendFile(__dirname + "/index.html" );
    })
}

module.exports = login


