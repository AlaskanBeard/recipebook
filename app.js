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
// var connect = "postgres://recipe:Password1.@localhost:5432/recipes";

// DB Connect String    


// extra code..?
    // module.exports = {
    //   query: (text, params, callback) => {
    //     return pool.query(text, params, callback)
    //   }
    // }

const { Pool } = require('pg')
var connectionString = 'postgresql://recipe:Password1.@localhost:5432/recipes';
const pool = new Pool({
  connectionString: connectionString,
})

app.get ('/', function(req, response){
    //debug
        //console.log('TEST');
        //response.render('index');

    pool.query('SELECT * FROM recipes', (err, result) => {
        if (err) {
          return console.error('error running query', err);
        }
    response.render('index', {recipes: result.rows});

        
    //     //pool.end();
    });
});

app.post('/add', function(req, response){

    pool.query('INSERT INTO recipes(name, ingredients, directions) VALUES($1, $2, $3)',);
    [req.body.name, req.body.ingredients, req.body.directions]);

    done();
    response.redirect('/');
});

// Server
app.listen(3000, function(){
	console.log('Server Started on Port 3000');
});

