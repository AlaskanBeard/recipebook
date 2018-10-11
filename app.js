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

app.get ('/', function(req, res){
    // PG Connect
    const { Pool, Client } = require('pg');
    const connectionString = "postgresql://recipe:Password1.@localhost/recipes";
    const client = new Client({
        connectionString: connectionString,
      });
      client.connect();
      
      client.query('SELECT * FROM recipes', function(err, result) {
        if(err) {
            return console.log('error running query', err);
        }
        res.render('index', {recipes: result.rows});
        client.end();
      });
});
// Server
app.listen(3000, function(){
	console.log('Server Started on Port 3000');
});

