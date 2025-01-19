const mongoose = require('mongoose');

const {NOTE_APP_MONGODB_HOST, NOTE_APP_MONGODB_DATABASE} = process.env;
const MONGODB_URI = `mongodb://${NOTE_APP_MONGODB_HOST}/${NOTE_APP_MONGODB_DATABASE}`;

mongoose.connect(MONGODB_URI, {

})

  .then(db => console.log('DB is connected'))
  .catch(err => console.log(err));