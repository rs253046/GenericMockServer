import fs from 'fs';
import path from 'path';

const directoryFiles = (dir) => {
  return fs.readdirSync(dir).reduce((list, fileName) => {
    var filePath = path.join(dir, fileName);
    var isDir = fs.statSync(filePath).isDirectory();
    return list.concat(isDir ? this.getDirectoryFiles(filePath) : [{ filePath, fileName }]);
  }, []);
};

const ensureFileExists = (file) => {
  if (!fs.existsSync(file)) {
    fs.openSync(file, 'w');
    return true;
  }

  return false;
}

const ensureDirectoryExists = (directory) => {
  if (!fs.existsSync(directory)){
    fs.mkdirSync(directory);
  }
}

export {
  directoryFiles,
  ensureFileExists,
  ensureDirectoryExists
}

