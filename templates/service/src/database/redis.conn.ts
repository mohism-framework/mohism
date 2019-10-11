import { get } from 'config';
import ioredis from 'ioredis';

const { host, port, db }: { host: string, port: number | string, db: number | string } = get('redis');

export default new ioredis({
  port: port as number,
  host,
  db: db as number,
});
