var express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    cons = require('consolidate'),
    dust = require('dustjs-helpers'),
    pg = require('pg'),
    app = express();

// Assign Dust Engine to .dust Files
app.engine('dust', cons.dust);

// Set default extension .dust
app.set('view engine', 'dust');
app.set('views', __dirname + '/views');

// Set public folder
app.use(express.static(path.join(__dirname, 'public')));

// Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

    // DB Connect String    
const { Pool } = require('pg')
var connectionString = 'postgresql://recipe:Password1.@localhost/recipes';
const pool = new Pool({
  connectionString: connectionString,
})
module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback)
  }
}

app.get('/', function(request, response) {
    //console.log('TEST');
    //response.render('index');
    pool.query('SELECT * FROM recipes', (err, result) => {
    if (err) {
      return next(err);
    }
    //console.log(err, res);
    response.render('index', {recipes: result.rows});
    //res.send(res.rows[0]);
    
    //pool.end();
  })
})
// Server
app.listen(3000, function(){
	console.log('Server Started on Port 3000');
});

