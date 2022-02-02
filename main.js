const express = require('express');
const app = express()
app.set('view engine', 'ejs')
const port = 1234
const localhost = '127.0.0.1'
const fs = require('fs');
app.use(express.urlencoded({extended:true}))




app.get('/', function(req,res){
  res.render('index.ejs')
})

app.get('/getinfo', function(req,res){
  res.render('getData.ejs')
})

app.get('/adddata', function(req,res){
  res.render('addData.ejs')
})

app.get('/dates', function(req,res){
  res.render('datesList.ejs')
})


app.get('/dev', function(req,res){
  res.render('dev.ejs')
})

app.post('/dev', function(req,res){
  const inData = req.body.addDate
  const dates = []
  dates.push(inData)
  stringData = JSON.stringify(dates)
  fs.writeFileSync('dates.json', stringData, function(){
    console.log("Saved " + stringData);
  })
})


app.listen(port, localhost, function(){
  console.log("Server Status: Functional");
})
