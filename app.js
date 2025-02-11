const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// Static Files
app.use(express.static('public'));
app.use('/css', express.static(__dirname + '/public/css'));
app.use('/img', express.static(__dirname + '/public/img'));
app.use('/js', express.static(__dirname + '/public/js'));

// Templating Engine
app.set('views', './src/views');
app.set('view engine', 'ejs');

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
const newsRouter = require('./src/routes/news');
app.use('/', newsRouter);
app.use('/article', newsRouter);

// Error handling middleware (added to catch any issues)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Export the app for Vercel
module.exports = app;
