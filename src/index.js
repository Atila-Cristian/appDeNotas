require('dotenv').config();

const app = require('./server'); 
request = require('./database')


console.log(process.env.TESTING) // llama a la variable de entorno TESTING del archivo .env

app.listen(app.get('port'), () => {
  console.log('server on port', app.get('port'))
})