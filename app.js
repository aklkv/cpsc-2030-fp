const express = require('express');
const fortune = require('fortune');
const jsonApiSerializer = require('fortune-json-api');
const bodyParser  = require('body-parser');
const cors = require('cors');
const Datastore = require('nedb');
const morgan = require('morgan');

const app = express();
const db = new Datastore();
db.users = new Datastore({ filename: 'data/user.db', autoload: true });

const store = require('./models/store');

const listener = fortune.net.http(store, {
    serializers: [
        [
            jsonApiSerializer, {
                inflectType: true
            }
        ]
    ]
});

let corsOptions = {
    origin: '*'
};

app.use(morgan('dev'))
app.use(cors(corsOptions));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/login', (req, res) => {

  db.users.find( { email: req.body.email }, (err, user) => {
    if(err || !user){
      console.log(err);
      res.json({
          status: 401,
          message: 'Authentication failed. User not found.'
      });
    } else if (user && (user[0].password === req.body.password)) {
      let data = {
        _id: user[0]._id
      }
      res.json({
        status: 200,
        message: 'Enjoy your token!',
        data
      });
    } else {
      res.json({
          status: 401,
          message: 'Authentication failed. Wrong password.'
      });
    }

  })
});

app.get('/logout', (req, res) => {
  res.json({
    status: 200,
    message: 'Bey Bey!'
  });
});

app.listen(80);
app.use(listener);
