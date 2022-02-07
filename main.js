const express = require('express');
const app = express()
app.set('view engine', 'ejs')
const csvToJson = require('convert-csv-to-json');
const port = 1234
const localhost = '127.0.0.1'
const fs = require('fs');
app.use(express.urlencoded({extended:true}))



let json = csvToJson.getJsonFromCsv("changes.csv");
for(let i=0; i<json.length;i++){
    console.log(json[i]);
}


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

/*app.post('/dev', function(req,res){
  const inData = req.body.addDate
  const dates = []
  dates.push(inData)
  stringData = JSON.stringify(dates)
  fs.writeFileSync('dates.json', stringData)*/

app.listen(port, localhost, function(){
  console.log("Server Status: Functional");
})
