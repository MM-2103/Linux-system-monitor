import { Client } from "ssh2";
import { readFileSync } from "fs";

const conn = new Client();
conn.on('ready', () => {
  console.log('Client :: ready');
  conn.shell((err, stream) => {
    if (err) throw err;
    stream.on('close', () => {
      console.log('Stream :: close');
      conn.end();
    }).on('data', (data:any) => {
      console.log('OUTPUT: ' + data);
    });
    stream.end('top\nexit\n');
  });
}).connect({
  host: 'srv01.unique-design.nl',
  port: 22,
  username: 'root',
  privateKey: readFileSync('/home/mm-2103-arch/.ssh/id_rsa')
  });
