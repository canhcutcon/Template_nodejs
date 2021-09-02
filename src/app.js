const request = require('request');
const express = require('express');
const hbs = require('hbs');
const path = require('path');

//  port
const app = express();
const port = process.env.PORT || 3000;

// path
const publicDirectoryPath = path.join(__dirname, '../public/dist');
const viewPath = path.join(__dirname, '../template/views');
const particalPath = path.join(__dirname, '../template/partical');


app.set('view engine', 'hbs');
app.set('views', viewPath);
app.use(express.static(publicDirectoryPath));
// path header footer
hbs.registerPartials(particalPath);

app.get('', (req, res) => {
    res.render('index')
})


app.listen(port, () => {
    console.log('post 3000.');
})