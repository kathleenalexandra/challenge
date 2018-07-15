const express = require('express');
const app = express();
const http = require('http').Server(app);
const renderFile = require('ejs').renderFile;

////

app.use(express.static('./dist/'));
app.set('views', './dist/');
app.engine('html', renderFile);
app.set('view engine', 'html');
app.get('/', (req, res) => {
  res.render('index.html', {});
});
http.listen(3000, () => {
  console.log('Listening at port 3000');
});
