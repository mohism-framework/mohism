
import mongoose, { ConnectionOptions } from 'mongoose';
import { get } from 'config';

mongoose.Promise = global.Promise;

const {
  username, password, host, port, slave, replicaSet, dbname,
} = get('mongo');

const options: ConnectionOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};

// dsn
if (slave.length) {
  // cluster mode
  let dsn = `mongodb://${username ? `${username}:${password}@` : ''}${host}:${port}`;
  slave.forEach((s: { host: string, port: string | number }) => {
    dsn += `,${s.host}:${s.port}`;
  });
  dsn += `/${dbname}?replicaSet=${replicaSet}`;
  mongoose.connect(dsn, options);
} else {
  // single
  const dsn = `mongodb://${username ? `${username}:${password}@` : ''}${host}:${port}/${dbname}`;
  mongoose.connect(dsn, options);
}



export default mongoose;
