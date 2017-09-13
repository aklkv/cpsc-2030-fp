const express = require('express');
const fortune = require('fortune');
const jsonApiSerializer = require('fortune-json-api');
const bodyParser  = require('body-parser');
const cors = require('cors');
const Datastore = require('nedb');
const morgan = require('morgan');
const net = require('fortune-http');

const app = express();
const db = {};
db.users = new Datastore({ filename: 'data/user.db', autoload: true });
db.article = new Datastore({ filename: 'data/article.db', autoload: true });
db.category = new Datastore({ filename: 'data/category.db', autoload: true });

const store = require('./models/store');

const listener = net(store, {
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
  console.log(req.body.email);
  db.users.findOne( { email: req.body.email }, (err, user) => {
    console.log(user);
    if(err || !user){
      res.status('401');
      res.json({
          status: 401,
          message: 'Authentication failed. User not found.'
      });
    } else if (user && (user.password === req.body.password)) {
      let data = {
        _id: user._id
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
