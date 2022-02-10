const express = require('express');
const app = express()
app.set('view engine', 'ejs')
const csvToJson = require('convert-csv-to-json');
const port = 1234
const localhost = '127.0.0.1'
const fs = require('fs');
app.use(express.urlencoded({extended:true}))

let inputfile = 'changes.csv';
let outputfile = 'changes.json';
csvToJson.generateJsonFileFromCsv(inputfile,outputfile);

function conversion(inputfile, outputfile) {
  let input = inputfile;
  let output = outputfile;
  csvToJson.generateJsonFileFromCsv(input,output);
  console.log('wrote to file')
}

conversion('Docpac Data.csv', 'docpacdata.json')

conversion('goals.csv', 'goals.json')

conversion('inc doc.csv', 'incdoc.json')

conversion('req doc.csv', 'reqdoc.json')

conversion('changes.csv', 'changes.json')


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

app.get('/requiredDocumentation', function(req,res) {
  res.render('ReqDoc.ejs')
})

app.get('/goals', function(req,res) {
  res.render('goals.ejs')
})

app.get('/changes', function(req,res) {
  res.render('changes.ejs')
})

app.get('/events', function(req,res) {
  res.render('events.ejs')
})

app.get('/IncludedDocumentation', function(req,res) {
  res.render('IncDoc.ejs')
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
