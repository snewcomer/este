import secrets from './secrets';
import mongoose from 'mongoose';

// Find the appropriate database to connect to, default to localhost if not found.
let connect = function() {
  mongoose.connect(secrets.db.dev, function(err, res) {
    if(err) {
      console.log('Error connecting to: ' + secrets.db.dev + '. ' + err);
    }else {
      console.log('Succeeded connected to: ' + secrets.db.dev);
    }
  });
};

mongoose.connection.on('error', console.log);
mongoose.connection.on('disconnected', connect);

export default connect;

