const fs = require('fs');
const path = require('path');
const directory = path.join(__dirname, 'files');
const copyDirectory = path.join(__dirname, 'files-copy');

fs.mkdir(copyDirectory,{recursive : true}, (err)=>{
  if(err) throw err;
  console.log('Сopy folder created');
});

fs.readdir(directory, (err,data)=>{
  if(err) throw err;
  data.forEach(file=> fs.copyFile(`${directory}/${file}`, `${copyDirectory}/${file}`, (err)=>{
    if(err) throw err;
  }));
});