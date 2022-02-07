const express = require('express');
const app = express()
app.set('view engine', 'ejs')
const port = 1234
const localhost = '127.0.0.1'



app.get('/', function(req,res){
  res.render('index.ejs')
})

app.get('/getinfo', function(req,res){
  res.render()
})



app.listen(port, localhost, function(){
  console.log("Server Status: Functional");
})
