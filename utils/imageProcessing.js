const fs = require('fs-extra');
const path = require('path');
const jimp = require('jimp');

const imageProcessing = (files, name, cb) => {
  const { destination } = files[0];
  name = name.split(' ').join('_');

  let names = [];
  let names2 = [];

  files.forEach(async ({ originalname, path: filePath }, index) => {
    // names2 = [
    //   { w128q75: `${name}/w128q75_${name}_${index}${path.extname(originalname)}` },
    //   { w720b45: `${name}/w720b45_${name}_${index}${path.extname(originalname)}` },
    //   { w560q50: `${name}/w560q50_${name}_${index}${path.extname(originalname)}` }
    // ];
    await jimp
      .read(filePath)
      .then(image => {
        image
          .cover(128, 128)
          .quality(75)
          .write(filePathCreator(name, 'w128q75', index, originalname));
        return { prefix: 'w128q75', ext: path.extname(originalname) };
      })  
      .then(({ prefix, ext }) => {
        names.push({
          w128q75: `${name}/${prefix}_${name}_${index}${ext}`
        });
      })
      .catch(err => console.error(err));

    await jimp
      .read(filePath)
      .then(image => {
        image
          .cover(720, 320)
          .blur(45)
          .write(filePathCreator(name, 'w720b45', index, originalname));
        return { prefix: 'w720b45', ext: path.extname(originalname) };
      })
      .then(({ prefix, ext }) => {
        names.push({
          w720b45: `${name}/${prefix}_${name}_${index}${ext}`
        });
      })
      .catch(err => console.error(err));

    await jimp
      .read(filePath)
      .then(image => {
        image
          .cover(560, 320)
          .quality(50)
          .write(filePathCreator(name, 'w560q50', index, originalname));
        return { prefix: 'w560q50', ext: path.extname(originalname) };
      })
      .then(({ prefix, ext }) => {
        names.push({
          w560q50: `${name}/${prefix}_${name}_${index}${ext}`
        });
        clearTemp(destination);
        cb(names);
      })
      .catch(err => console.error(err));
  });
};

const clearTemp = destination => {
  fs.readdir(destination)
    .then(data => {
      data.forEach(el => {
        fs.remove(path.join(destination, el)).catch(err => console.error(err));
      });
    })
    .catch(err => console.error(err));
};

const filePathCreator = (name, prefix, index, originalname) => {
  const ext = path.extname(originalname);
  return path.join(
    'public',
    'uploads',
    'images',
    name,
    `${prefix}_${name}_${index}${ext}`
  );
};

module.exports = {
  imageProcessing
};
