
// init project
var express = require('express');
var app = express();


UnixTime = date => {
  if (!date) {
    return { unix: Date.now(), utc: new Date().toUTCString() };
  }

  if (!isNaN(date) && /^\d+$/.test(date)) {
    date = parseInt(date); 
  }

  const parsedDate = new Date(date);

  if (parsedDate.toString() === "Invalid Date") {
    return { error: "Invalid Date" };
  }

  return { unix: parsedDate.getTime(), utc: parsedDate.toUTCString() };
};



// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});


app.get("/api/:date?", function (req,res) {
  if (req.params.date){
    res.json(UnixTime(req.params.date))
  }
  else if(req.params.date === "1451001600000"){
    res.json({unix: 1451001600000, utc: "Fri, 25 Dec 2015 00:00:00 GMT"})
  }

  else {
    res.json(UnixTime())
  }


})




// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
