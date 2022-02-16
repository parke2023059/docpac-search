const express = require('express');
const app = express()
app.set('view engine', 'ejs')
const csvToJson = require('convert-csv-to-json');
const port = 1234
const localhost = '127.0.0.1'
const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();
app.use(express.urlencoded({extended:true}))

let db = new sqlite3.Database('DocPac.db', (err) => {
  if (err) {
    return console.log(err.message)
  }
  console.log('connected to database')
})

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

app.get('/get_info', function(req,res){
  res.render('getData.ejs')
})

app.get('/add_data', function(req,res){
  res.render('addData.ejs')
})

app.post('/add_data', function(req,res) {
  res.render('addData.ejs')
  console.log(req.body.people1)
  var data = {
    date: req.body.dates,
    goals: req.body.goals,
    inc_doc: req.body.inc_doc,
    req_doc: req.body.req_doc,
    changes: req.body.changes,
    events: req.body.events,
    person1: req.body.people1,
    person2: req.body.people2,
    inc_type: req.body.inc_doc_type,
    req_type: req.body.req_doc_type,
    event_type: req.body.events_type,
    event_due_date: req.body.event_due
  }

  if (data.date && data.goals) {
    db.run(`INSERT INTO goals(field1, field2) VALUES (?, ?)`, [data.date, `${data.goals}`], (err) => {
      if (err) {
        return console.log(err.message);
      }
      console.log('data was added to goals in DB template')
    })
  }

  if (data.date && data.inc_doc) {
    db.run(`INSERT INTO included_doc(field1, field2, field3) VALUES (?, ?, ?)`, [data.date, `${data.inc_type}`, `${data.inc_doc}`], (err) => {
      if (err) {
        return console.log(err.message);
      }
      console.log('data was added to included_doc in DB template')
    })
  }

  if (data.date && data.req_doc) {
    db.run(`INSERT INTO required_doc(field1, field2, field3) VALUES (?, ?, ?)`, [data.date, `${data.req_type}`, `${data.req_doc}`], (err) => {
      if (err) {
        return console.log(err.message);
      }
      console.log('data was added to required_doc in DB template')
    })
  }

  if (data.date && data.changes) {
    db.run(`INSERT INTO changes(field1, field2) VALUES (?, ?)`, [data.date, `${data.changes}`], (err) => {
      if (err) {
        return console.log(err.message);
      }
      console.log('data was added to changes in DB template')
    })
  }

  if (data.date && data.events) {
    db.run(`INSERT INTO events(field1, field2, field3, field4) VALUES (?, ?, ?, ?)`, [data.date, `${data.event_due_date}`, `${data.event_type}`, `${data.events}`], (err) => {
      if (err) {
        return console.log(err.message);
      }
      console.log('data was added to events in DB template')
    })
  }

  // if (data.date && data.inc_doc) {
  //   db.run(`INSERT INTO inc doc(field1, field2) VALUES (?, ?)`, [data.date, `${data.inc_doc}`], (err) => {
  //     if (err) {
  //       return console.log(err.message);
  //     }
  //     console.log('data was added to goals in DB template')
  //   })
  // }


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
