const http = require('http');
const app = require('./app');
const mongoose = require('mongoose');


const server = http.createServer(app);
const hostname = '127.0.0.1';
const port = 3000;


server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});


app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});


app.get('/health', function (req, res) {
  res.send('The API is working properly');
});


mongoose.connect("mongodb+srv://UserProjet6:UserProjet6@clusterprojet6.6x8f4.mongodb.net/Projet6Db?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));