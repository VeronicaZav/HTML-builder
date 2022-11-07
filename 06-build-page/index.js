const fs = require('fs');
const path = require('path');
const styles = path.join(__dirname, 'styles');
const assets = path.join(__dirname, 'assets');
const assetsCopy = path.join(__dirname, 'project-dist', 'assets');

async function init() {
  await removeFolder();
  await createFolder();
  await copyAssets();
  await stylesBuilder();
  await htmlBuilder();
}
init();

async function removeFolder() {
  await fs.promises.rm(path.join(__dirname, 'project-dist'), { recursive: true, force: true });
}

async function createFolder() {
  await fs.promises.mkdir(path.join(__dirname, 'project-dist', 'assets'), { recursive: true }, (err) => {
    if (err) throw new Error(err);
  });
}

async function copyAssets() {
  fs.promises.readdir(assets, { withFileTypes: true })
    .then(data => {
      data.forEach(file => {
        if (file.isFile()) {
          fs.copyFile(path.join(assets, file.name), path.join(assetsCopy, file.name), (err)=>{if(err) throw err;});
        } 
        else {
          fs.promises.readdir(path.join(__dirname, 'assets', file.name), {withFileTypes: true})
            .then(dir => {
              fs.promises.mkdir(path.join(assetsCopy, file.name), { recursive: true });
              dir.forEach(fileDir => {
                fs.copyFile(path.join(assets, file.name, fileDir.name), path.join(assetsCopy, file.name, fileDir.name), (err)=>{if(err) throw err;});
              });
            });
        }
      });
    });
}

async function stylesBuilder() {
  fs.promises.readdir(styles, {withFileTypes: true}).then(data => {
    const writeStyle = fs.createWriteStream(path.join(__dirname, 'project-dist', 'style.css'));
    data.forEach(file => {
      if (path.extname(file.name) == '.css') {
        const read = fs.createReadStream(path.join(styles, file.name));
        read.on('data', (data = data + '\n') => {
          writeStyle.write(data);
        });
      }
    });
  });
}

async function htmlBuilder() {
  let templateRead = await fs.promises.readFile(path.join(__dirname, 'template.html'), 'utf-8');
  const components = await fs.promises.readdir(path.join(__dirname, 'components'));
  for (let file of components) {
    if (path.extname(file) == '.html') {
      const componentName = path.parse(path.join(__dirname, 'components', file)).name;
      let componentRead = await fs.promises.readFile(path.join(path.join(__dirname, 'components'), file));
      templateRead = templateRead.replace(`{{${componentName}}}`, componentRead);
    }
  }

  fs.writeFile(path.join(__dirname, 'project-dist', 'index.html'), templateRead, (err) => {
    if (err) { throw err; }
  });
}