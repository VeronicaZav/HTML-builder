const fs = require('fs');
const path = require('path');

fs.promises.readdir(path.join(__dirname, 'secret-folder'), {withFileTypes: true})
  .then(data=>data.forEach(file =>{
    console.log(file.name);
    fs.stat(path.join(__dirname, 'secret-folder', file.name), (err, stats)=>{
      if(err) {
        throw err;
      } else{
        let nameFile = file.name.split('.')[0],
          extFile = path.extname(path.join(__dirname, file.name)).slice(1),
          sizeFile = stats.size;
        return console.log(`${nameFile}-${extFile}-${sizeFile}`);
      }
    });
  })
  );


