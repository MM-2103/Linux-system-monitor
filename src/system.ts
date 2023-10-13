import * as os from 'node:os';

let sys_totmem = os.totalmem();
let sys_freemem = os.freemem();
let sys_hostname = os.hostname();
console.log(sys_totmem, sys_freemem, sys_hostname);
