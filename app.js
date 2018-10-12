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
const { Pool } = require('pg')
var connectionString = 'postgresql://recipe:Password1.@localhost:5432/recipes';
const pool = new Pool({
  connectionString: connectionString,
})
// extra code..?
    // module.exports = {
    //   query: (text, params, callback) => {
    //     return pool.query(text, params, callback)
    //   }
    // }

app.get ('/', function(req, response){
    //debug
        //console.log('TEST');
        //response.render('index');

    pool.query('SELECT * FROM recipes', (err, result) => {
        if (err) {
          return console.error('error running query', err);
        }
        console.log(result.rowCount);
        //console.log(err, res);
    //     response.render('index', {recipes: result.rows});

        
    //     //pool.end();
    });
});

// const pg = require('pg') ;

//     const pool = new pg.Pool({
//         user:'recipe',
//         host: '127.0.0.1',
//         database: 'recipes',
//         password: 'Password1.',
//         port: '5432'
//     });

//     pool.query("Select * FROM recipes", (err, result) => {
//         console.log(err, res);
//         res.render('index', {recipes: result.rows});
//         pool.end();
//     });
    // // PG Connect
    // var pool = new pg.Pool();

    // pool.connect(connect, function(err, client, done) {
    //     if(err) {
    //         return console.error('error fetching client from pool', err);
    //     }
    //     client.query('SELECT * FROM recipes', function(err, result) {
    //         //call 'done()' to release the client back to the pool
    //         if(err) {
    //             return console.error('error running query', err);
    //         }
    //         res.render('index', {recipes: result.rows})
    //         done();
    //     });
    // });


// //	pg.connect(connect, function(err, client, done) {
//         if(err) {
//             return console.error('error fetching client from pool', err);
//         }
//         client.query('SELECT * FROM recipes', function(err, result) {
//             //call 'done()' to release the client back to the pool
//             if(err) {
//                 return console.error('error running query', err);
//             }
//             res.render('index', {recipes: result.rows})
//             done();
//         });
//     });
// });

// Server
app.listen(3000, function(){
	console.log('Server Started on Port 3000');
});

