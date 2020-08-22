var express = require('express');
var path = require('path');
var indexRouter = require('./routes/index');
var app = express();

const MongoClient = require('mongodb').MongoClient;
const CONNECTION_URL = 'mongodb+srv://challengeUser:WUMglwNBaydH8Yvu@challenge-xzwqd.mongodb.net/getircase-\n' +
                       'study?retryWrites=true';
const DATABASE_NAME = "getir-case-study";
const COLLECTION_NAME = "records";

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(8000,() =>{
  MongoClient.connect(CONNECTION_URL, { useNewUrlParser: true }, (error, client) => {
    if(error) {
      throw error;
    }
    database = client.db(DATABASE_NAME);
    collection = database.collection(COLLECTION_NAME);
    console.log("Connected to `" + DATABASE_NAME + "`!");
  });
});

app.get('/getir', function (req, res, next){
  res.render('main');
});

app.post('/getir', function (req,res,next){
  console.log(req.body);
  collection.find({createdAt: { $gt: new Date(req.body.startDate), $lt: new Date(req.body.endDate) }})
            .project({key: 1, createdAt :1, counts:1})
            .toArray(function(err, result) {

    if (err) throw err;

    var oprStatusCode;
    var oprStatusMessage;
    var recordsArr = [];

    if(req.body.startDate === '' ||
       req.body.endDate === ''   ||
       req.body.minCount === ''  ||
       req.body.maxCount === '' ){
      oprStatusCode = 11;
      oprStatusMessage = "YOU CAN NOT GIVE EMPTY PARAMETERS";
    }else if(req.body.startDate > req.body.endDate) {
      oprStatusCode = 12;
      oprStatusMessage = "START DATE CAN NOT BE GREATER THAN END DATE";
    }else if(req.body.minCount >= req.body.maxCount){
      oprStatusCode = 13;
      oprStatusMessage = "MIN COUNT CAN NOT BE GREATER OR EQUAL TO MAX COUNT";
    }else if(res.statusCode === 200){
      oprStatusCode = 0;
      oprStatusMessage = "SUCCESS";
    }else if(res.statusCode === 204){
      oprStatusCode = 1;
      oprStatusMessage = "NO CONTENT";
    }else if(res.statusCode === 304){
      oprStatusCode = 2;
      oprStatusMessage = "NOT MODIFIED";
    }else if(res.statusCode === 400){
      oprStatusCode = 3;
      oprStatusMessage = "BAD REQUEST";
    }else if(res.statusCode === 403){
      oprStatusCode = 4;
      oprStatusMessage = "FORBIDDEN";
    }else if(res.statusCode === 404){
      oprStatusCode = 5;
      oprStatusMessage = "NOT FOUND";
    }else if(res.statusCode === 409){
      oprStatusCode = 6;
      oprStatusMessage = "CONFLICT";
    }else if(res.statusCode === 500){
      oprStatusCode = 7;
      oprStatusMessage = "SERVER ERROR";
    }else if(res.statusCode === 503){
      oprStatusCode = 8;
      oprStatusMessage = "SERVICE UNAVAILABLE";
    }else if(res.statusCode === 504){
      oprStatusCode = 9;
      oprStatusMessage = "GATEWAY TIMEOUT";
    }else if(res.body.isEmpty()){
      oprStatusCode = 10;
      oprStatusMessage = "Wrong Args";
    }else{
      oprStatusCode = 99;
      oprStatusMessage = "UNKNOWN ERROR CONTACT ADMIN";
    }

    for(let val of result){
      let tempArr = val.counts;
      let total = 0;

      for (let values of tempArr){
        total += values;
      };

      if(total > req.body.minCount && total < req.body.maxCount){
        var records = {
          key : val.key,
          createdAt : val.createdAt,
          totalCounts : total
        }
        recordsArr.push(records);
      };
    };

    const responsePayloadJSON = {
        code: oprStatusCode,
        msg: oprStatusMessage,
        records : recordsArr
    };

    const resPayload = JSON.stringify(responsePayloadJSON,null,2);

    res.render('mainResult', {result: resPayload});
  });
});

app.use(function(req, res, next){
  res.status(404);

  // respond with html page
  if (req.accepts('html')) {
    res.render('404', { url: req.url });
    return;
  }

  // respond with json
  if (req.accepts('json')) {
    res.send({ error: 'Not found' });
    return;
  }

  // default to plain-text. send()
  res.type('txt').send('Not found');
});

module.exports = app;