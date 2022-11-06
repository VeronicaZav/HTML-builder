const fs = require('fs');
const path = require('path');
const writeStream = fs.createWriteStream(path.join(__dirname, 'text.txt'), 'utf-8');
const process = require('process');

process.stdout.write('Write text or exit\n');
process.stdin.on('data', (chunk)=> {
  if(chunk.toString().trim() === 'exit'){
    console.log('Cood bye');
    process.exit();
  }else{
    writeStream.write(chunk);
  }
});
process.on('SIGINT', ()=> {console.log('Cood bye'); process.exit();});


























// const fs = require('fs');
// const path = require('node:path').join(__dirname, 'text.txt');
// const writeStream = fs.createWriteStream(path, 'utf8');

// process.stdout.write('Write text or exit > \n');

// process.stdin.on('data', (chunk) => {

//   if (chunk.toString().trim() === 'exit') {
//     process.exit();
//   }
//   writeStream.write(chunk);
// });

// process.on('SIGINT', () => {
//   process.exit();
// });

// process.on('exit', () => {
//   console.log('Bye');
// });