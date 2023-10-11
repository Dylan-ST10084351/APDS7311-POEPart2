//https://expressjs.com/en/starter/hello-world.html
const express = require('express')
const app = express()
const urlprefix = '/api'
const mongoose = require('mongoose')
const Post = require('./models/posts')
const fs = require('fs');
const cert = fs.readFileSync('keys/certificate.pem');
const options = {
    server: {sslCA: cert}};
const connstring = 'mongodb+srv://st10084351:gOsm9CI9tKj31uzc@cluster0.ofczatn.mongodb.net/?retryWrites=true&w=majority';

const postRoutes = require("./routes/post");
const userRoutes = require('./routes/user')

mongoose.connect(connstring)
.then(() =>
{
    console.log('Connected :-)')
})
.catch((() =>
{
    console.log('NOT connected :-(')
}),options);

app.use(express.json())
app.use((reg,res,next)=>
{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin,X-Requested-With,Content-Type,Accept,Authorization');
    res.setHeader('Access-Control-Allow-Methods', '*');
    next();
})
// https://expressjs.com/en/4x/api.html#app.get
app.get(urlprefix+'/', (req, res) => {
    res.send('Hello World')
})

app.use(urlprefix+'/posts', postRoutes)
app.use(urlprefix+'/users', userRoutes)

module.exports = app;